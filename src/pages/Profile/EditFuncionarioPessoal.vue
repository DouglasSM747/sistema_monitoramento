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
<script>
import axios from "axios";
export default {
  data() {
    return {
      sexos: [
        { op: "Masculino" },
        { op: "Feminino" },
        { op: "Outro" }
      ],
      vendedor_edit: {
        fk_id_vendedor: window.localStorage.getItem("ID_VENDEDOR"),
        nome: "",
        sexo: "",
        data_nascimento: ""
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
          "http://localhost:5000/infopessoal/get/?fk_id_vendedor=" +
            window.localStorage.getItem("ID_VENDEDOR")
        ) // get na API para mostrar todas os pdv
        .then(function(response) {
          self.vendedor_edit.nome = response.data.response[0].nome;
          self.vendedor_edit.sexo = response.data.response[0].sexo;
          self.vendedor_edit.data_nascimento =
            response.data.response[0].data_nascimento;
          self.vendedor_edit.fk_id_vendedor =
            response.data.response[0].fk_id_vendedor;
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
        .post(" http://localhost:5000/infopessoal/cadastrar/vendedor/post/", {
          nome: self.vendedor_edit.nome,
          sexo: self.vendedor_edit.sexo,
          data_nascimento: self.vendedor_edit.data_nascimento,
          fk_id_vendedor: self.vendedor_edit.fk_id_vendedor
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
        .post("http://localhost:5000/infopessoal/salvar/vendedor/post", {
          nome: self.vendedor_edit.nome,
          sexo: self.vendedor_edit.sexo,
          data_nascimento: self.vendedor_edit.data_nascimento,
          fk_id_vendedor: self.vendedor_edit.fk_id_vendedor
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
