<template>
  <card>
    <h5 slot="header" class="title">Informacoes Do Vendedor</h5>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input
          label="Nome Do Funcionario"
          placeholder="Nome Do Funcionario"
          v-model="vendedor_edit.nome"
        ></base-input>
      </div>
      <div class="col-md-5 px-md-1">
        <base-input
          label="Data de Nascimento"
          placeholder="Data de Nascimento"
          v-model="vendedor_edit.data_nascimento"
        ></base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 pr-md-1">
        <base-input class="col-md-4" label="Sexo">
          <select
            v-model="vendedor_edit.sexo"
            id="inputState"
            class="form-control"
          >
            <option v-bind:key="item.op" v-for="item in sexos">{{item.op}}</option>
          </select>
        </base-input>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5 pr-md-1"></div>
    </div>
    <base-button slot="footer" type="primary" v-on:click="Verificar()" fill>Salvar</base-button>
  </card>
</template>
<script src = "/home/douglas/Downloads/vue-black-dashboard-master/src/scripts/InformacaoPessoal.js"> </script>

