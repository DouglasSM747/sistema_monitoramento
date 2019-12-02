import { BaseTable } from "@/components";
import axios from "axios";

import swal from "sweetalert2";

import { Modal } from "/home/douglas/Downloads/vue-black-dashboard-master/src/components";

const Swal = require("sweetalert2");

export default {
  components: {
    BaseTable,
    Modal
  },
  data() {
    return {
      Adicionar_modal: false,
      remover_modal: false,
      columns: ["id", "name", "job", "since", "excluir"],
      tableData: [],
      vendedorEdit: { idvendedor: '',email: "", senha: "", tipo: "funcionario"},
      atual_pdv: window.localStorage.getItem("ID_PDV")
    };
  },
  mounted() {
    this.atual_pdv = window.localStorage.getItem("ID_PDV");
    var self = this;
    //puxa todos os funcionarios do ponto de venda atual
    axios
      .get("http://localhost:5000/vendedor/get?idpdv=" + self.atual_pdv) // get na API para mostrar todas os pdv
      .then(function(response) {
        for (var i = 0; i < response.data.response.length; i++) {
            self.tableData.push({
              idVendedor: response.data.response[i].idVendedor,
              email: response.data.response[i].email,
              fk_id_PDV_pertencente: response.data.response[i].fk_id_PDV_pertencente
            });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    cadastrarFuncionario(){
        var existe = false;
        for(var i = 0; i < this.tableData.length;i++){
          if(this.vendedorEdit.idvendedor == this.tableData[i].idVendedor){
            existe = true;
            break;
          }
        }
        if(existe){
            Swal.fire({
              title: "Codigo já existe no Sistema",
              confirmButtonText: "Ok"
            });
        }else{
          axios.post("http://localhost:5000/cadastrar/vendedor", {
            // Passa a informacoes do funcionario
            fk_id_PDV_pertencente: this.atual_pdv,
            tipo: 'funcionario',
            email: this.vendedorEdit.email,
            senha: this.vendedorEdit.senha,
          })
          .then(function(response) {
          location.reload();
          })
          .catch(function(error) {
            console.log(error);
          });
        }

    },
    editarVendedor(id_vendedor){
      window.localStorage.setItem("idvendedor",id_vendedor);
      this.$router.push("/editfun"); // vai para a pagina de dono do PDV
    }
  }
};