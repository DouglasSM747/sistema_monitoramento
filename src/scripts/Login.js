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
    Logar(email,senha) {
      var self = this;
      var existe_conta = false;
      axios
        .get(
          "http://localhost:5000/login/get?email=" + email +
            "&senha=" +senha
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