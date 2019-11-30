<template>
  <card>
    <h5 slot="header" class="title">Informacoes Do Vendedor</h5>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input
          label="Codigo Do Vendedor"
          placeholder="Codigo Do Vendedor"
          v-model="vendedor_edit.id_vendedor"
          disabled
        ></base-input>
      </div>
      <div class="col-md-5 px-md-1">
        <base-input
          label="Salario Mensal"
          placeholder="Salario Mensal"
          v-model="vendedor_edit.salario_mensal"
        ></base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input
          label="Agencia Pagamento"
          v-model="vendedor_edit.agencia_pagamento"
          placeholder="Agencia Pagamento"
        ></base-input>
      </div>
      <div class="col-md-5 pr-md-1">
        <base-input
          label="Conta Pagamento"
          v-model="vendedor_edit.conta_pagamento"
          placeholder="Agencia Pagamento"
        ></base-input>
      </div>
      <div class="col-md-5">
        <base-input label="Status" v-model="vendedor_edit.status" placeholder="Status"></base-input>
      </div>
      <div class="col-md-5 pl-md-1">
        <base-input label="Cargo" v-model="vendedor_edit.Cargo" placeholder="Cargo"></base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5">
        <base-input
          label="Dia de Pagamento"
          v-model="vendedor_edit.dia_pagamento"
          placeholder="Data Pagamento"
        ></base-input>
      </div>
      <div class="col-md-5">
        <base-input
          label="Data Inicio PDV"
          v-model="vendedor_edit.data_inicio_empresa"
          placeholder="Data de Ingresso no Ponto de Venda"
        ></base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 pr-md-1"></div>
    </div>
    <base-button slot="footer" type="primary" v-on:click="Verificar()" fill>Salvar</base-button>
  </card>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      vendedor_edit: {
        id_vendedor: window.localStorage.getItem("idvendedor"),
        salario_mensal: 0,
        agencia_pagamento: "",
        conta_pagamento: "",
        Cargo: "",
        status: 0,
        dia_pagamento: "",
        data_inicio_empresa: 0,
      },
      existe_info: true
    };
  },
  mounted() {
    var self = this;
    (this.vendedor_edit.id_vendedor = window.localStorage.getItem(
      "idvendedor"
    )),
      //puxa todos os itens do estoque do PDV que tem como status == 1
      axios
        .get(
          "http://localhost:5000/infoempresa/vendedor/get?id_vendedor=" +
            window.localStorage.getItem("idvendedor")
        ) // get na API para mostrar todas os pdv
        .then(function(response) {
          (self.vendedor_edit.id_vendedor =
            response.data.response[0].id_vendedor),
            (self.vendedor_edit.salario_mensal =
              response.data.response[0].salario_mensal);
          (self.vendedor_edit.agencia_pagamento =
            response.data.response[0].agencia_pagamento),
            (self.vendedor_edit.conta_pagamento =
              response.data.response[0].conta_pagamento),
            (self.vendedor_edit.Cargo = response.data.response[0].Cargo),
            (self.vendedor_edit.data_inicio_empresa =
              response.data.response[0].data_inicio_empresa),
            (self.vendedor_edit.status = response.data.response[0].status),
            (self.vendedor_edit.dia_pagamento =
              response.data.response[0].dia_pagamento);
        })
        .catch(function(error) {
          self.existe_info = false;
        });
  },
  methods: {
    Verificar() {
      if (this.existe_info == true) {
        this.SalvarInfo();
      } else {
        this.CadastrarInfo();
      }
    },
    CadastrarInfo() {
      var self = this;
      axios
        .post("http://localhost:5000/infoempresa/salvar/vendedor/post/", {
          id_vendedor: self.vendedor_edit.id_vendedor,
          salario_mensal: self.vendedor_edit.salario_mensal,
          agencia_pagamento: self.vendedor_edit.agencia_pagamento,
          conta_pagamento: self.vendedor_edit.conta_pagamento,
          Cargo: self.vendedor_edit.Cargo,
          data_inicio_empresa: self.vendedor_edit.data_inicio_empresa,
          status: self.vendedor_edit.status,
          dia_pagamento: self.vendedor_edit.dia_pagamento
        })
        .then(function(response) {
          location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    SalvarInfo() {
      var self = this;
      axios
        .post("hhttp://localhost:5000/infoempresa/vendedor/post", {
          id_vendedor: self.vendedor_edit.id_vendedor,
          salario_mensal: self.vendedor_edit.salario_mensal,
          agencia_pagamento: self.vendedor_edit.agencia_pagamento,
          conta_pagamento: self.vendedor_edit.conta_pagamento,
          Cargo: self.vendedor_edit.Cargo,
          data_inicio_empresa: self.vendedor_edit.data_inicio_empresa,
          status: self.vendedor_edit.status,
          dia_pagamento: self.vendedor_edit.dia_pagamento
        })
        .then(function(response) {
          location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
</style>
