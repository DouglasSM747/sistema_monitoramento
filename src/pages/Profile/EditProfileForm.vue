<template>
  <card>
    <h5 slot="header" class="title">Informacoes Da Empresa</h5>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input label="Nome do Ponto de Venda" placeholder="Company" v-model="nomepdv" disabled></base-input>
      </div>
      <div class="col-md-5 px-md-1">
        <base-input label="Nome Dono PDV" placeholder="Nome Dono" v-model="nome_dono_PDV"></base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 pr-md-1">
        <base-input label="Data Fundacao" v-model="data_fundacao" placeholder="Data Fundacao"></base-input>
      </div>
      <div class="col-md-6 pl-md-1">
        <base-input label="Nota Preco" v-model="preco_medio" placeholder="Nota de Preco do PDV"></base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <base-input label="Nota Geral" v-model="nota" placeholder="Nota Geral"></base-input>
      </div>
      <div class="col-md-12">
        <base-input label="Rua" v-model="informacoes_PDVcol" placeholder="Rua Moradia"></base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 pr-md-1">
        <base-input label="CESP" v-model="CESP" placeholder="Cesp"></base-input>
      </div>
      <div class="col-md-4 px-md-1">
        <base-input
          label="Telefone Fixo"
          v-model="telefone_fixo"
          placeholder="Numero do Telefone Fixo"
        ></base-input>
      </div>
      <div class="col-md-4 pl-md-1">
        <base-input label="Localizacao" v-model="localizacao" placeholder="ZIP Code"></base-input>
      </div>
    </div>
    <base-button slot="footer" type="primary" v-on:click="SalvarInfo(atual_pdv)" fill>Salvar</base-button>
  </card>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      atual_pdv: 0,
      nomepdv: "",
      nota: 0,
      localizacao: "",
      nome_dono_PDV: "",
      data_fundacao: "",
      preco_medio: 0,
      CESP: "",
      telefone_fixo: "",
      informacoes_PDVcol: "rua",
      user: {}
    };
  },
  mounted() {
    var self = this;
    //puxa todos os itens do estoque do PDV que tem como status == 1
    axios
      .get("http://localhost:5000/pdv/info?idpdv="+window.localStorage.getItem("ID_PDV")) // get na API para mostrar todas os pdv
      .then(function(response) {
        (self.atual_pdv = response.data.response[0].fk_id_PDV),
          (self.nomepdv = response.data.response[0].nomepdv),
          (self.nota = response.data.response[0].nota),
          (self.localizacao = response.data.response[0].localizacao),
          (self.nome_dono_PDV = response.data.response[0].nome_dono_PDV),
          (self.data_fundacao = response.data.response[0].data_fundacao),
          (self.preco_medio = response.data.response[0].preco_medio),
          (self.CESP = response.data.response[0].CESP),
          (self.telefone_fixo = response.data.response[0].telefone_fixo),
          (self.informacoes_PDVcol =
            response.data.response[0].informacoes_PDVcol);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    SalvarInfo(id) {
      axios
        .post("http://localhost:5000/pdv/saveinfo", {
          atual_pdv: window.localStorage.getItem("ID_PDV"),
          nomepdv: this.nomepdv,
          nota: this.nota,
          localizacao:  this.localizacao,
          nome_dono_PDV: this.nome_dono_PDV,
          data_fundacao: this.data_fundacao,
          preco_medio: this.preco_medio,
          CESP: this.CESP,
          telefone_fixo: this.telefone_fixo,
          informacoes_PDVcol: this.informacoes_PDVcol
        })
        .then(function(response) {
          console.log(response.data);
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
