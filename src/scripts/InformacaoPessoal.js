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
        this.SalvarInfoPessoal(this.vendedor_edit);
      } else {
        this.CadastrarInfoPessoal(this.vendedor_edit);
      }
    },
    CadastrarInfoPessoal(vendedor_edit) {
      var self = this;
      axios
        .post(" http://localhost:5000/infopessoal/cadastrar/vendedor/post/", {
          nome: this.vendedor_edit.nome,
          sexo: this.vendedor_edit.sexo,
          data_nascimento: this.vendedor_edit.data_nascimento,
          fk_id_vendedor: this.vendedor_edit.fk_id_vendedor
        })
        .then(function(response) {
          location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    SalvarInfoPessoal(vendedor_edit) {
      var self = this;
      axios
        .post("http://localhost:5000/infopessoal/salvar/vendedor/post", {
          nome: this.vendedor_edit.nome,
          sexo: this.vendedor_edit.sexo,
          data_nascimento: this.vendedor_edit.data_nascimento,
          fk_id_vendedor: this.vendedor_edit.fk_id_vendedor
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