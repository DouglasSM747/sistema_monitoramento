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
      produto_excluir: "",
      Adicionar_modal: false,
      remover_modal: false,
      columns: ["id", "name", "job", "since", "excluir"],
      tableData: [],
      produtoEdit: { id: "", quantidade: "", nome: "", valor: "" },
      atual_pdv: window.localStorage.getItem("ID_PDV"),
      tableDataAux: []
    };
  },
  mounted() {
    this.atual_pdv = window.localStorage.getItem("ID_PDV");
    this.getEstoque(this.atual_pdv);
  },
  methods: {
    getEstoque(pdv) {
      var self = this;
      //puxa todos os itens do estoque do PDV que tem como status == 1
      axios
        .get("http://localhost:5000/estoque/get?idpdv=" + pdv) // get na API para mostrar todas os pdv
        .then(function (response) {
          for (var i = 0; i < response.data.response.length; i++) {
            //pega todos os produtos, mesmo apagados do sistema
            self.tableDataAux.push({
              id: response.data.response[i].id_produto
            });
            if (response.data.response[i].status > 0) {
              self.tableData.push({
                //pega somente os produtos validos
                id_pdv: response.data.response[i].fk2_idPDV,
                quantidade: response.data.response[i].quantidade_estoque,
                id: response.data.response[i].id_produto,
                produto: response.data.response[i].nome_produto,
                valor: response.data.response[i].valor
              });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    abrirModalExclusao(id) {
      this.remover_modal = true;
      this.produto_excluir = id;
    },

    verificarAddEstoque(codigo_produto) {
      var achou = false;
      for (var i = 0; i < this.tableDataAux.length; i++) {
        if (codigo_produto == this.tableDataAux[i].id) {
          achou = true;
          break;
        }
      }
      if (achou) {
        this.atualizarProduto(codigo_produto);
      } else {
        this.AdicionarProduto(codigo_produto);
      }
    },
    atualizarProduto(codigo_produto) {
      // se o produto n tem, adiciona no sistema
      axios
        .post("http://localhost:5000/estoque/updateproduto", {
          // Passa a informacoes do produto
          idproduto: this.produtoEdit.id,
          quantidade: this.produtoEdit.quantidade,
          valor: this.produtoEdit.valor,
          status: 1,
          idpdv: window.localStorage.getItem("ID_PDV")
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      location.reload();
    },
    AdicionarProduto(codigo_produto) {
      // se o produto ja tem, somente atualiza
      axios
        .post("http://localhost:5000/estoque/addproduto", {
          // Passa a informacoes do produto
          idproduto: this.produtoEdit.id,
          quantidade: this.produtoEdit.quantidade,
          valor: this.produtoEdit.valor,
          nome: this.produtoEdit.nome,
          status: 1,
          idpdv: window.localStorage.getItem("ID_PDV")
        })
        .then(function (response) {
          location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //funcao resposanvel por excluir produto de forma logica ou fisica
    excluirProdutoLogicamente(atual_pdv, produto_excluir) {
      var self = this;
      axios
        .post(
          "http://localhost:5000/estoque/deleteL?idpdv=" +
          this.atual_pdv +
          "&idproduto=" +
          this.produto_excluir
        )
        .then(function (response) {
          console.log("excluido");
        })
        .catch(function (error) {
          console.log(error);
        });
      location.reload();
    },
    excluirProdutoPermanente(atual_pdv, produto_excluir) {
      var self = this;
      axios
        .post(
          "http://localhost:5000/estoque/deleteF?idpdv=" +
          this.atual_pdv +
          "&idproduto=" +
          this.produto_excluir
        )
        .then(function (response) {
          console.log("excluido");
        })
        .catch(function (error) {
          console.log(error);
        });
      location.reload();
    }
  }
};