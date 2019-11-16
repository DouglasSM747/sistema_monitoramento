<template>
  <div>
    <!-- Card 1 - Add Produtos -->
    <card>
      <h4 class="card-title">Adicionar Produto no Estoque</h4>
      <p class="card-text">
        Caso o produto passado para ser adicionado, ja existir no tabela
        apenas sera incrementado sua quantidade.
      </p>
      <!-- botao para abrir adicao de produto -->
      <base-button
        class="animation-on-hover"
        @click.native="AdicionarProduto(1)"
        type="success"
      >Adicionar Produto</base-button>
    </card>
    <base-table :data="tableData" :columns="columns">
      <template slot="columns">
        <th class="text-center">Numero Produto</th>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Valor</th>
        <th class="text-right">Excluir</th>
      </template>
      <template slot-scope="{row}">
        <td class="text-center">{{row.id}}</td>
        <td>{{row.produto}}</td>
        <td>{{row.quantidade}}</td>
        <td>{{row.valor}}</td>
        <td class="td-actions text-right">
          <base-button type="info" size="sm" icon v-on:click="excluirProduto(row.id)">
            <i class="tim-icons icon-simple-remove"></i>
          </base-button>
        </td>
      </template>
    </base-table>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
import axios from "axios";
import swal from "sweetalert2";
const Swal = require("sweetalert2");

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      columns: ["id", "name", "job", "since", "excluir"],
      tableData: [],
      produtoEdit: { id: 0, quantidade: 0, nome: "", valor: 0 }
    };
  },
  mounted() {
    var self = this;
    //puxa todos os itens do estoque do PDV que tem como status == 1
    axios
      .get("http://localhost:5000/estoque/get?idpdv=1") // get na API para mostrar todas os pdv
      .then(function(response) {
        for (var i = 0; i < response.data.response.length; i++) {
          if (response.data.response[i].status == 1) {
            self.tableData.push({
              id_pdv: response.data.response[i].fk2_idPDV,
              quantidade: response.data.response[i].quantidade_estoque,
              id: response.data.response[i].id_produto,
              produto: response.data.response[i].nome_produto,
              valor: response.data.response[i].valor
            });
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    AdicionarProduto(idPDV) {
      Swal.mixin({
        confirmButtonText: "Adicionar",
        showCancelButton: true,
        cancelButtonText: "Cancelar"
      })
        .queue([
          {
            title: "Adicionar Produto",
            html:
              '<input id="swal-input25" class="swal2-input" placeholder="Codigo do produto">' +
              '<input id="swal-input26" class="swal2-input" placeholder="Quantidade">' +
              '<input id="swal-input27" class="swal2-input" placeholder="Valor">' +
              '<input id="swal-input28" class="swal2-input" placeholder="Nome">',
            focusConfirm: false,
            preConfirm: () => {
              return [
                (this.produtoEdit.id = document.getElementById(
                  "swal-input25"
                ).value),
                (this.produtoEdit.quantidade = document.getElementById(
                  "swal-input26"
                ).value),
                (this.produtoEdit.valor = document.getElementById(
                  "swal-input27"
                ).value),
                (this.produtoEdit.nome = document.getElementById(
                  "swal-input28"
                ).value)
              ];
            }
          }
        ])
        .then(result => {
          if (result.value) {
            var existe = false;
            for (var i = 0; i < this.tableData.length; i++) {
              //se nao existir na tabela
              if (
                this.tableData[i].id_pdv == 1 &&
                this.produtoEdit.id == this.tableData[i].id
              ) {
                existe = true;
              }
            }
            if (existe) {
              // se o produto ja tem, somente atualiza
              axios
                .post("http://localhost:5000/estoque/updateproduto", {
                  // Passa a informacoes do produto
                  idproduto: this.produtoEdit.id,
                  quantidade: this.produtoEdit.quantidade,
                  valor: this.produtoEdit.valor,
                  nome: this.produtoEdit.nome,
                  status: 1,
                  idpdv: 1
                })
                .then(function(response) {
                  console.log(response.data);
                })
                .catch(function(error) {
                  console.log(error);
                });
              Swal.fire({
                title: "Concluído",
                confirmButtonText: "OK!"
              });
            } else {
              // se o produto n tem, adiciona no sistema
              axios
                .post("http://localhost:5000/estoque/addproduto", {
                  // Passa a informacoes do produto
                  idproduto: this.produtoEdit.id,
                  quantidade: this.produtoEdit.quantidade,
                  valor: this.produtoEdit.valor,
                  nome: this.produtoEdit.nome,
                  status: 1,
                  idpdv: 1
                })
                .then(function(response) {
                  console.log(response.data);
                })
                .catch(function(error) {
                  console.log(error);
                });
              Swal.fire({
                title: "Concluído",
                confirmButtonText: "OK!"
              });
            }
          }
        });
    },

    //funcao resposanvel por excluir produto de forma logica ou fisica
    excluirProduto(id) {
      Swal.fire({
        title: "Excluir Item do Estoque?",
        type: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, temporario",
        confirmButtonText: "Sim, temporario",
        cancelButtonText: "Sim, excluir permanente",
        showCloseButton: true
      }).then(result => {
        //excluir de forma temporaria
        console.log(result.value);
        if (result.value) {
          axios
            .post(
              "http://localhost:5000/estoque/deleteL?idpdv=1&idproduto=" + id
            )
            .then(function(response) {
              Swal.fire({
                title: "Excluido Temporariamente",
                confirmButtonText: "OK!"
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        } else {
          //excluir de forma permanente
          axios
            .post(
              "http://localhost:5000/estoque/deleteF?idpdv=1&idproduto=" + id
            )
            .then(function(response) {
              Swal.fire({
                title: "Excluido Permanente",
                confirmButtonText: "OK!"
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        }
      });
    }
  }
};
</script>

