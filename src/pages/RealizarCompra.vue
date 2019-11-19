<template>
  <card>
    <form>
      <div class="form-row">
        <base-input
          class="col-md-3"
          v-model="data_compra"
          label="Data Compra"
          placeholder="xx/xx/xxxx"
        />
        <base-input
          class="col-md-3"
          v-model="nome_comprador"
          label="Nome Comprador"
          placeholder="Joao ..."
        />
        <base-input class="col-md-4" v-model="numero_nota" label="Numero da Nota" placeholder="Numero da Nota" />
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
        <input
          slot="header"
          v-model="produto_adicionado"
          type="text"
          dark="true"
          hide-details="true"
          class="form-control"
          id="inlineFormInputGroup"
          placeholder="Digite aqui o numero do produto para ser adicionado"
          v-on:keyup.enter="adicionarProduto(produto_adicionado)"
        />
      </div>
      <div>
        <base-table :data="tabelaProdutos" :columns="columns">
          <template slot="columns">
            <th class="text-center">Produto</th>
            <th class="text-center">Valor</th>
            <th class="text-center">Quantidade</th>
            <th class="text-center">Actions</th>
          </template>
          <template slot-scope="{row}">
            <td class="text-center">{{row.id}}</td>
            <td class="text-center">{{row.valor}}</td>
            <td class="text-center">{{row.produto}}</td>
            <td class="td-actions text-center">
              <base-button v-on:click="excluirProduto(row.id,row.valor)" type="danger" size="sm" icon>
                <i class="tim-icons icon-simple-remove"></i>
              </base-button>
            </td>
          </template>
        </base-table>
      </div>
      <div>
        Quantidade Total: {{quantidade_total_compra}}
        <base-button type="primary"  v-on:click="realizarCompra()"  >Realizar Compra</base-button>

      </div>
    </form>
  </card>
</template>
<script>
import { BaseTable } from "@/components";
import axios from "axios";
export default {
  components: {
    BaseTable
  },
  data() {
    return {
      quantidade_total_compra: 0,
      produto_adicionado: "",
      pagamento_vista: false,
      selected: "",
      columns: ["Id", "Data Compra", "Numero da Nota", "Vendedor"],
      tableData: [],
      tabelaProdutos:[],
      data_compra: "",
      numero_nota: "",
      nome_comprador: "",
      valor_pago: "",
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
  computed: {},
  methods: {
    excluirProduto(item,valor) {
      var self = this;
      var i = 0;
      for(i = 0; i < self.tabelaProdutos.length;i++){
        if(self.tabelaProdutos[i].id == item){
          self.tabelaProdutos.pop(i);
          break;
        }
      }
      self.quantidade_total_compra -= valor;
    },
    adicionarProduto(item) {
      var self = this;
      for(var i = 0; i < self.tableData.length;i++){
        if(self.tableData[i].id == item){
          self.tabelaProdutos.push(self.tableData[i]);
          self.quantidade_total_compra+=self.tableData[i].valor;
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
    realizarCompra() {
      // se o produto n tem, adiciona no sistema
      axios
        .post("http://localhost:5000/realizar/compra", {
          // Passa a informacoes do produto
          quantidade_total_compra: this.quantidade_total_compra,
          data_compra: this.data_compra,
          numero_nota: this.numero_nota,
          nome_comprador: this.nome_comprador,
          fk_id_pdv_occorrente: this.fk_id_pdv_occorrente,
          forma_pagamento: this.selected,
          id_vendedor_responsavel: this.id_vendedor_responsavel,
          valor_pago: this.valor_pago
        })
        .then(function(response) {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  }
};
</script>

