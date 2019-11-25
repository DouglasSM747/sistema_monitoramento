<template>
  <div class="col-lg-5 col-md-10 ml-auto mr-auto">
    <card>
      <form @submit.prevent>
        <base-input label="Email address" type="email" v-model="email" placeholder="Enter email">
          <small
            slot="helperText"
            id="emailHelp"
            class="form-text text-muted"
          >We'll never share your email with anyone else.</small>
        </base-input>
        <base-input label="Password" type="password" v-model="password" placeholder="Password"></base-input>
        <base-button native-type="submit" type="primary" v-on:click="Logar()">Submit</base-button>
      </form>
    </card>
  </div>
</template>
<script>
import axios from "axios";
import swal from "sweetalert2";
const Swal = require("sweetalert2");
export default {
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
          if (!existe_conta) {
            Swal.fire({
              title: "Conta n consta no Sistema",
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
        window.localStorage.setItem("ID_PDV",dadosUsuario.fk_id_PDV_pertencente);
        window.localStorage.setItem("ID_VENDEDOR",dadosUsuario.idVendedor);
         this.$router.push("/funcionario");
      } else if (dadosUsuario.tipo == "adm") {
        window.localStorage.setItem("ID_PDV",dadosUsuario.idPDV);
        this.$router.push("/dono"); // vai para a pagina de dono do PDV
      } else if (dadosUsuario.tipo == "gerente") {
        window.localStorage.setItem("ID_GERENTE",dadosUsuario.idPDV);
        // this.$router.push("/dono"); // vai para a pagina de dono do PDV
      }
    }
  }
};
</script>
