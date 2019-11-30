<template>
  <div style="margin-top: 15%" class="container">
    <div class="col-lg-6 ml-auto mr-auto">
      <form>
        <card class="card-login card-white">
          <template slot="header">
            <img src="./img/pdv_logo.png" alt="elgin" class="logoElgin" />
          </template>

          <div class="Formulario">
            <validation-provider rules="required" v-slot="{ errors }">
              <base-input
                v-model="email"
                type="email"
                name="email"
                placeholder="Email"
                addon-left-icon="tim-icons icon-email-85">
              </base-input>
              <span>{{ errors[0] }}</span>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors }">
              <base-input
                name="Senha"
                v-model="password"
                type="password"
                placeholder="Password"
                addon-left-icon="tim-icons icon-lock-circle"
              ></base-input>
            </validation-provider>
          </div>
          <div>
            <base-button v-on:click="Logar()" type="primary" class="mb-3" size="lg" block>Entrar</base-button>
          </div>
        </card>
      </form>
    </div>
  </div>
</template>



<script>
import axios from "axios";
import swal from "sweetalert2";
const Swal = require("sweetalert2");

import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "Campo Obrigatorio"
});

export default {
  components: {
    ValidationProvider
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted() {},
  methods: {
    Logar() {
      var self = this;
      var existe_conta = false;
      axios
        .get(
          "http://localhost:5000/login/get?email=" +
            self.email +
            "&senha=" +
            self.password
        ) // busca o tipo de usuario que esta se conectando
        .then(function(response) {
          for (var i = 0; i < response.data.response.length; i++) {
            if (response.data.response[i][0]) {
              self.AcessarTipoConta(response.data.response[i][0]);
              existe_conta = true;
            }
          }
          //retorna mensagem se não existe no sistema
          if (!existe_conta) {
            Swal.fire({
              title: "Conta Não Consta No Sistema",
              confirmButtonText: "Ok"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    AcessarTipoConta(dadosUsuario) {
      if (dadosUsuario.tipo == "funcionario") {
        window.localStorage.setItem(
          "ID_PDV",
          dadosUsuario.fk_id_PDV_pertencente
        );
        window.localStorage.setItem("ID_VENDEDOR", dadosUsuario.idVendedor);
        this.$router.push("/funcionario");
      } else if (dadosUsuario.tipo == "dono") {
        window.localStorage.setItem("ID_PDV", dadosUsuario.idPDV);
        this.$router.push("/dono"); // vai para a pagina de dono do PDV
      } else if (dadosUsuario.tipo == "gerente") {
        window.localStorage.setItem("ID_GERENTE", dadosUsuario.idGerente_PDV);
        this.$router.push("/gerente"); // vai para a pagina de dono do PDV
      }
    }
  }
};
</script>

<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: auto;
}

.logoElgin {
  display: block;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  height: 60%;
}

.Formulario {
  margin-top: 0px;
}
</style>
