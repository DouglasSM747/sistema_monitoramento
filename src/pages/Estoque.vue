

<template>
  <card>
    <!-- Excluir Produto -->
    <div>
      <modal :show.sync="remover_modal">
        <template slot="header">
          <h3 class="modal-title" id="exampleModalLabel">Deseja Excluir o Produto do Estoque ?</h3>
        </template>
        <template slot="footer">
          <base-button type="secondary" v-on:click="excluirProdutoLogicamente()" >Sim, logicamente</base-button>
          <base-button type="secondary" v-on:click="excluirProdutoPermanente()"> Sim, fisicamente</base-button>
          <base-button type="secondary" @click="remover_modal = false">Cancelar</base-button>

        </template>
      </modal>
    </div>
    <!-- Adicionar Produto -->
    <div>
      <modal
        :show.sync="Adicionar_modal"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-sm"
      >
        <card type="secondary" body-classes="px-lg-5 py-lg-5" class="border-0 mb-0">
          <template>
            <div class="text-muted text-center mb-3">Adicionar Produto Em Estoque</div>
          <blockquote class="blockquote">
  <p class="mb-0 small" style="color: white">Caso deseje apenas atualizar 
    o produto, somente é necessario preencher os campos (codigo do produto, valor e quantidade)
    caso contrario todos devem ser preenchidos.
  </p>
</blockquote>
            <form role="form">
              <base-input
                alternative
                class="mb-3"
                placeholder="Codigo do Produto"
                addon-left-icon="ni ni-email-83"
                v-model="produtoEdit.id"
              ></base-input>
              <base-input
                alternative
                v-model="produtoEdit.quantidade"
                placeholder="Quantidade"
                addon-left-icon="ni ni-lock-circle-open"
              ></base-input>
              <base-input
                alternative
                v-model="produtoEdit.nome"
                placeholder="Nome do Produto"
                addon-left-icon="ni ni-lock-circle-open"
              ></base-input>
              <base-input
                alternative
                v-model="produtoEdit.valor"
                placeholder="Valor do Produto"
                addon-left-icon="ni ni-lock-circle-open"
              ></base-input>
              <div class="text-center">
                <base-button
                  v-on:click="verificarAddEstoque(produtoEdit.id)"
                  type="primary"
                  class="my-4"
                >Adicionar</base-button>
                <base-button
                  v-on:click="Adicionar_modal = false"
                  type="secundary"
                  class="my-4"
                >Cancelar</base-button>
              </div>
            </form>
          </template>
        </card>
      </modal>
    </div>

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
          @click="Adicionar_modal= true"
          type="success"
        >Adicionar Produto</base-button>
      </card>
      <base-table :data="tableData" :columns="columns">
        <template slot="columns">
          <th class="text-center">Numero Produto</th>
          <th class="text-center">Produto</th>
          <th class="text-center">Quantidade</th>
          <th class="text-center">Valor</th>
          <th class="text-center">Excluir</th>
        </template>
        <template slot-scope="{row}">
          <td class="text-center">{{row.id}}</td>
          <td class="text-center">{{row.produto}}</td>
          <td class="text-center">{{row.quantidade}}</td>
          <td class="text-center">{{row.valor}}</td>
          <td class="td-actions text-center">
            <base-button type="info" size="sm" icon v-on:click="abrirModalExclusao(row.id)">
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </td>
        </template>
      </base-table>
    </div>
  </card>
</template>
<script>
import { BaseTable } from "@/components";
import axios from "axios";
import swal from "sweetalert2";
import { Modal } from "/home/douglas/Documentos/sistema_monitoramento/src/components";
const Swal = require("sweetalert2");

export default {
  components: {
    BaseTable,
    Modal
  },
  data() {
    return {
      produto_excluir: "",
      Adicionar_modal: false,
      remover_modal: false,
      columns: ["id", "name", "job", "since", "excluir"],
      tableData: [],
      produtoEdit: { id: "", quantidade: "", nome: "", valor: "" },
      atual_pdv: window.localStorage.getItem("ID_PDV"),
      tableDataAux: []
    };
  },
  mounted() {
    this.atual_pdv = window.localStorage.getItem("ID_PDV");
    var self = this;
    //puxa todos os itens do estoque do PDV que tem como status == 1
    axios
      .get("http://localhost:5000/estoque/get?idpdv=" + self.atual_pdv) // get na API para mostrar todas os pdv
      .then(function(response) {
        for (var i = 0; i < response.data.response.length; i++) {
          //pega todos os produtos, mesmo apagados do sistema
            self.tableDataAux.push({
              id: response.data.response[i].id_produto,
            });
          if (response.data.response[i].status > 0) {         
            self.tableData.push({
              //pega somente os produtos validos
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

    abrirModalExclusao(id){
    this.remover_modal = true
    this.produto_excluir = id
    },

    verificarAddEstoque(codigo_produto) {
      var achou = false;
      for (var i = 0; i < this.tableDataAux.length; i++) {
        if (codigo_produto == this.tableDataAux[i].id) {
          achou = true;
          break;
        }
      }
      if (achou) {
        this.atualizarProduto(codigo_produto);
      } else {
        this.AdicionarProduto(codigo_produto);
      }
    },
    atualizarProduto(codigo_produto) {
      // se o produto n tem, adiciona no sistema
      axios
        .post("http://localhost:5000/estoque/updateproduto", {
          // Passa a informacoes do produto
          idproduto: this.produtoEdit.id,
          quantidade: this.produtoEdit.quantidade,
          valor: this.produtoEdit.valor,
          status: 1,
          idpdv: window.localStorage.getItem("ID_PDV")
        })
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
      location.reload();
    },
    AdicionarProduto(codigo_produto) {
      // se o produto ja tem, somente atualiza
      axios
        .post("http://localhost:5000/estoque/addproduto", {
          // Passa a informacoes do produto
          idproduto: this.produtoEdit.id,
          quantidade: this.produtoEdit.quantidade,
          valor: this.produtoEdit.valor,
          nome: this.produtoEdit.nome,
          status: 1,
          idpdv: window.localStorage.getItem("ID_PDV")
        })
        .then(function(response) {
          location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //funcao resposanvel por excluir produto de forma logica ou fisica
    excluirProdutoLogicamente() {
      var self = this
      axios
        .post(
          "http://localhost:5000/estoque/deleteL?idpdv=" +
            this.atual_pdv +
            "&idproduto=" +
            self.produto_excluir
        )
        .then(function(response) {
          console.log("excluido");
        })
        .catch(function(error) {
          console.log(error);
        });
        location.reload();
    },
    excluirProdutoPermanente(id) {
      var self = this
      axios
        .post(
          "http://localhost:5000/estoque/deleteF?idpdv=" +
            this.atual_pdv +
            "&idproduto=" +
            self.produto_excluir
        )
        .then(function(response) {
          console.log("excluido");
        })
        .catch(function(error) {
          console.log(error);
        });
        location.reload();
    }
  }
};
</script>

