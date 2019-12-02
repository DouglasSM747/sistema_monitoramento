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
<script src = "/home/douglas/Downloads/vue-black-dashboard-master/src/scripts/InformacaoEmpresa.js"> </script>