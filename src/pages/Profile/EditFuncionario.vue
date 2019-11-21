<template>
  <card>
    <h5 slot="header" class="title">Informacoes Do Vendedor</h5>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input label="Codigo Do Vendedor" placeholder="Codigo Do Vendedor" v-model="id_vendedor" disabled></base-input>
      </div>
      <div class="col-md-5 px-md-1">
        <base-input label="Salario Mensal" placeholder="Salario Mensal" v-model="salario_mensal"></base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input label="Agencia Pagamento" v-model="agencia_pagamento" placeholder="Agencia Pagamento"></base-input>
      </div>
      <div class="col-md-5 pl-md-1">
        <base-input label="Cargo" v-model="Cargo" placeholder="Cargo"></base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5">
        <base-input label="Status" v-model="status" placeholder="Status"></base-input>
      </div>
      <div class="col-md-5">   
        <base-input label="Data de Pagamento" v-model="dia_pagamento" placeholder="Data Pagamento"></base-input>
      </div>
      <div class="col-md-5">   
        <base-input label="Data Inicio PDV" v-model="data_inicio_empresa" placeholder="Data de Ingresso no Ponto de Venda"></base-input>
      </div>

    </div>
    <div class="row">
      <div class="col-md-5 pr-md-1">
      </div>
    </div>
    <base-button slot="footer" type="primary" v-on:click="SalvarInfo()" fill>Salvar</base-button>
  </card>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id_vendedor: window.localStorage.getItem("idvendedor"),
      salario_mensal: "",
      agencia_pagamento: "",
      conta_pagamento: "",
      Cargo: "",
      status: 0,
      dia_pagamento: "",
      data_inicio_empresa: ""
    };
  },
  mounted() {
    var self = this;
    //puxa todos os itens do estoque do PDV que tem como status == 1
    axios
      .get("http://localhost:5000/infoempresa/vendedor/get?id_vendedor="+window.localStorage.getItem("idvendedor")) // get na API para mostrar todas os pdv
      .then(function(response) {
        (self.id_vendedor = response.data.response[0].id_vendedor),
        (self.salario_mensal = response.data.response[0].salario_mensal),
        (self.agencia_pagamento = response.data.response[0].agencia_pagamento),
        (self.conta_pagamento = response.data.response[0].conta_pagamento),
        (self.Cargo = response.data.response[0].Cargo),
        (self.data_inicio_empresa = response.data.response[0].data_inicio_empresa),
        (self.status = response.data.response[0].status),
        (self.dia_pagamento = response.data.response[0].dia_pagamento);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    SalvarInfo() {
      var self = this;
      axios
        .post("http://localhost:5000/infoempresa/vendedor/post", {
        id_vendedor: self.id_vendedor,
        salario_mensal: self.salario_mensal,
        agencia_pagamento: self.agencia_pagamento,
        conta_pagamento: self.conta_pagamento,
        Cargo: self.Cargo,
        data_inicio_empresa: self.data_inicio_empresa,
        status: self.status,
        dia_pagamento: self.dia_pagamento
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
