<template>
  <card>
    <form>
      <div class="form-row">
        <base-input
          class="col-md-3"
          v-model="getTempo"
          label="Data Compra"
          placeholder="xx/xx/xxxx"
        />
        <base-input
          class="col-md-3"
          v-model="nome_comprador"
          label="Nome Comprador"
          placeholder="Joao ..."
        />
        <base-input
          class="col-md-4"
          v-model="numero_nota"
          label="Numero da Nota"
          placeholder="Numero da Nota"
        />
      </div>
      <div class="form-row">
        <base-input
          class="col-md-4"
          v-if="pagamento_vista"
          v-model="valor_pago"
          type="text"
          label="Valor Pago"
          placeholder="Quantidade Paga"
        />
        <base-input class="col-md-4" label="Forma de Pagamento">
          <select
            v-on:click="SelecionarFormaPagamento(selected)"
            v-model="selected"
            id="inputState"
            class="form-control"
          >
            <option v-bind:key="item.op" v-for="item in forma_de_pagamento">{{item.op}}</option>
          </select>
        </base-input>
      </div>
      <div class="form-row">
        <!-- codigo do produto a ser adicionado -->
        <base-input
          class="col-md-5"
          v-model="produto_adicionado"
          label="Digite aqui o numero do produto para ser adicionado"
          v-on:keyup.enter="verificarProdutoNaTabela(produto_adicionado)"
          placeholder="0"
        />
        <!-- Quantidade do produto a ser adicionado -->
        <base-input
          class="col-md-5"
          v-model="quantidade_adicionada"
          label="Digite aqui a quantidade a ser adicionado"
          placeholder="0"
          v-on:keyup.enter="verificarProdutoNaTabela(produto_adicionado)"
        />
      </div>
      <div>
        <base-table :data="tabelaProdutos" :columns="columns">
          <template slot="columns">
            <th class="text-center">Numero Produto</th>
            <th class="text-center">Nome Produto</th>
            <th class="text-center">Valor</th>
            <th class="text-center">Quantidade Comprada</th>
            <th class="text-center">Quantidade Disponivel</th>
            <th class="text-center">Actions</th>
          </template>
          <template slot-scope="{row}">
            <td class="text-center">{{row.id}}</td>
            <td class="text-center">{{row.produto}}</td>
            <td class="text-center">{{row.valor}}</td>
            <td class="text-center">{{row.quantidade_comprada}}</td>
            <td class="text-center">{{row.quantidade_disponivel}}</td>
            <td class="td-actions text-center">
              <base-button
                v-on:click="excluirProduto(row.id,row.valor)"
                type="danger"
                size="sm"
                icon
              >
                <i class="tim-icons icon-simple-remove"></i>
              </base-button>
            </td>
          </template>
        </base-table>
      </div>
      <div>
        Quantidade Total: {{quantidade_total_compra}}
        <base-button type="primary" v-on:click="realizarCompra()">Realizar Compra</base-button>
      </div>
    </form>
  </card>
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
      quantidade_total_compra: 0,
      produto_adicionado: "",
      quantidade_adicionada: "",
      pagamento_vista: false,
      selected: "",
      columns: ["Id", "Data Compra", "Numero da Nota", "Vendedor"],
      tableData: [],
      tabelaProdutos: [],
      data_compra: "",
      numero_nota: "",
      nome_comprador: "",
      valor_pago: 0,
      fk_id_pdv_occorrente: window.localStorage.getItem("ID_PDV"),
      id_vendedor_responsavel: window.localStorage.getItem("ID_VENDEDOR"),
      compra: [
        {
          id_compra: 0,
          id_produto: 0
        }
      ],
      forma_de_pagamento: [
        { op: "Cartao Debito" },
        { op: "Cartao Credito" },
        { op: "Dinheiro" }
      ]
    };
  },
  mounted() {
    var self = this;
    //puxa todos os itens do estoque do PDV que tem como status == 1
    axios
      .get(
        "http://localhost:5000/estoque/get?idpdv=" + self.fk_id_pdv_occorrente
      ) // get na API para mostrar todas os pdv
      .then(function(response) {
        for (var i = 0; i < response.data.response.length; i++) {
          if (response.data.response[i].status == 1) {
            self.tableData.push({
              id_pdv: response.data.response[i].fk2_idPDV,
              quantidade_disponivel:
                response.data.response[i].quantidade_estoque,
              id: response.data.response[i].id_produto,
              produto: response.data.response[i].nome_produto,
              valor: response.data.response[i].valor,
              quantidade_comprada: 0
            });
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  computed: {
    getTempo: function() {
      return new Date().toLocaleString();
    }
  },
  methods: {
    excluirProduto(item, valor) {
      var i = 0;
      for (i = 0; i < this.tabelaProdutos.length; i++) {
        if (this.tabelaProdutos[i].id == item) {
          this.quantidade_total_compra -=
            valor * parseInt(this.tabelaProdutos[i].quantidade_comprada);

          this.tabelaProdutos.pop(i);
          break;
        }
      }
    },

    SelecionarFormaPagamento(opcao) {
      if (opcao == "Dinheiro") {
        this.pagamento_vista = true;
      } else {
        this.pagamento_vista = false;
      }
    },
    verificarProdutoNaTabela(codigo_produto) {
      var self = this;
      var achou2 = false;
      var i = 0;
      var info_produto;

      //verifica se tem no estoque
      for (i = 0; i < self.tableData.length; i++) {
        if (self.tableData[i].id == codigo_produto) {
          info_produto = self.tableData[i];
          this.VerificarProdutoTabelaDeProdutos(codigo_produto, info_produto);
          break;
        }
      }
    },

    VerificarProdutoTabelaDeProdutos(codigo_produto, produto) {
      var i = 0;
      var achou = false;
      //se achou verifica se existe ou n na tabela de produtos
      for (i = 0; i < this.tabelaProdutos.length; i++) {
        if (codigo_produto == this.tabelaProdutos[i].id) {
          achou = true;
          break;
        }
      }
      //se existe na tabela atualiza
      if (achou) {
        this.attProduto(i);
      } else {
        //se n existe na tabela add
        this.addProduto(produto);
      }
    },

    attProduto(indice) {
      if (
        this.quantidade_adicionada > 0 &&
        this.quantidade_adicionada <=
          this.tabelaProdutos[indice].quantidade_disponivel
      ) {
        this.tabelaProdutos[indice].quantidade_disponivel -= parseInt(
          this.quantidade_adicionada
        );
        this.tabelaProdutos[indice].quantidade_comprada += parseInt(
          this.quantidade_adicionada
        );
        this.quantidade_total_compra += parseInt(
          this.tabelaProdutos[indice].valor * this.quantidade_adicionada
        );
      }
    },

    addProduto(produto) {
      //se n tem a quantidade no sistema
      if(produto.quantidade_disponivel >= this.quantidade_adicionada){
        produto.quantidade_disponivel -= parseInt(this.quantidade_adicionada);
        produto.quantidade_comprada = parseInt(this.quantidade_adicionada);
        this.tabelaProdutos.push(produto);
        this.quantidade_total_compra += parseInt(produto.valor * this.quantidade_adicionada);
      }
    },
    realizarCompra() {
      if (this.tabelaProdutos.length > 0) {
        if (
          this.selected == "Dinheiro" &&
          this.valor_pago < this.quantidade_total_compra
        ) {
          Swal.fire({
            title: "Valor Pago Menor Que o Da Compra",
            confirmButtonText: "Ok"
          });
        } else {
          var self = this;
          if(this.selected != 'Dinheiro'){
            this.valor_pago = this.quantidade_total_compra;
          }
          if (
            this.selected == "Dinheiro" &&
            this.valor_pago > this.quantidade_total_compra
          ) {
            Swal.fire({
              title: "Troco",
              text: this.valor_pago - this.quantidade_total_compra,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok!"
            }).then(result => {
              if (result.value) {
                // caso necessite de troco
                axios
                  .post("http://localhost:5000/realizar/compra", {
                    // Passa a informacoes do produto
                    quantidade_total_compra: this.quantidade_total_compra,
                    data_compra: this.getTempo,
                    numero_nota: this.numero_nota,
                    nome_comprador: this.nome_comprador,
                    fk_id_pdv_occorrente: this.fk_id_pdv_occorrente,
                    forma_pagamento: this.selected,
                    id_vendedor_responsavel: this.id_vendedor_responsavel,
                    valor_pago: this.valor_pago
                  })
                  .then(function(response) {
                    self.addProdutoCompra();
                  })
                  .catch(function(error) {
                    console.log(error);
                  });
              }
            });
          } else {
            // // caso não necessite de troco
            axios
              .post("http://localhost:5000/realizar/compra", {
                // Passa a informacoes do produto
                quantidade_total_compra: this.quantidade_total_compra,
                data_compra: this.getTempo,
                numero_nota: this.numero_nota,
                nome_comprador: this.nome_comprador,
                fk_id_pdv_occorrente: this.fk_id_pdv_occorrente,
                forma_pagamento: this.selected,
                id_vendedor_responsavel: this.id_vendedor_responsavel,
                valor_pago: this.valor_pago
              })
              .then(function(response) {
                self.addProdutoCompra();
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        }
      }
    },
    addProdutoCompra() {
      var self = this;
      for (var i = 0; i < self.tabelaProdutos.length; i++) {
        axios
          .post("http://localhost:5000/realizar/compra/produto", {
            // Passa a informacoes do produto
            numero_nota: self.numero_nota,
            id_produto: self.tabelaProdutos[i].id,
            quantidade_comprada: self.tabelaProdutos[i].quantidade_comprada
          })
          .then(function(response) {
            location.reload();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>

