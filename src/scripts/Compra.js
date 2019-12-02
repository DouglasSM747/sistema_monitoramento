import { BaseTable } from "@/components";
import axios from "axios";
import swal from "sweetalert2";
const Swal = require("sweetalert2");
export default {
  components: {
    BaseTable
  },
  data() {
    return {
      columns: ["Id", "Data Compra", "Numero da Nota", "Vendedor"],
      tableDataCompras: [],
      componentKey: 0,
      quantidade_total_compra: 0,
      produto_adicionado: "",
      quantidade_adicionada: "",
      pagamento_vista: false,
      selected: "",
      columns: ["Id", "Data Compra", "Numero da Nota", "Vendedor"],
      tableData: [],
      tabelaProdutos: [],
      data_compra: "",
      numero_nota: "",
      nome_comprador: "",
      valor_pago: 0,
      fk_id_pdv_occorrente: window.localStorage.getItem("ID_PDV"),
      id_vendedor_responsavel: window.localStorage.getItem("ID_VENDEDOR"),
      compra: [
        {
          id_compra: 0,
          id_produto: 0
        }
      ],
      forma_de_pagamento: [
        { op: "Cartao Debito" },
        { op: "Cartao Credito" },
        { op: "Dinheiro" }
      ]
    };
  },
  mounted() {
    this.getCompra(window.localStorage.getItem("ID_PDV"));
    this.getEstoque();
  },
  computed: {
    getTempo: function () {
      return new Date().toLocaleString();
    }
  },
  methods: {
    getCompra(pdv) {
      var self = this;
      axios
        .get("http://localhost:5000/compra/get?idpdv=" + pdv) // get na API para mostrar todas as filiais
        .then(function (response) {
          for (var i = 0; i < response.data.response.length; i++) {
            // monta a lista de filiais
            self.tableDataCompras.push({
              numero_nota: response.data.response[i].numero_nota,
              data_compra: response.data.response[i].data_compra,
              vendedor: response.data.response[i].id_vendedor_responsavel,
              nome_comprador: response.data.response[i].nome_comprador
            });
          }
        })
        .catch(function (error) {
          /// Erro na API
          console.log(error);
        });
    },

    listadeProdutosComprados(idcompra) {
      for (var i = 0; i < this.tableDataCompras.length; i++) {
        if (this.tableDataCompras[i].id == idcompra) {
          break;
        }
      }
      window.localStorage.setItem("id_compra", idcompra);
      this.$router.push("/produtos"); // vai para a proxima pagina
    },
    getEstoque() {
      this.tableData.length = 0;
      var self = this;
      //puxa todos os itens do estoque do PDV que tem como status == 1
      axios
        .get(
          "http://localhost:5000/estoque/get?idpdv=" + self.fk_id_pdv_occorrente
        ) // get na API para mostrar todas os pdv
        .then(function (response) {
          for (var i = 0; i < response.data.response.length; i++) {
            if (
              response.data.response[i].status == 1 &&
              response.data.response[i].quantidade_estoque > 0
            ) {
              self.tableData.push({
                id_pdv: response.data.response[i].fk2_idPDV,
                quantidade_disponivel:
                  response.data.response[i].quantidade_estoque,
                id: response.data.response[i].id_produto,
                produto: response.data.response[i].nome_produto,
                valor: response.data.response[i].valor,
                quantidade_comprada: 0
              });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    excluirProduto(item, valor) {
      var i = 0;
      var index = this.tabelaProdutos.findIndex(produto => produto.id == item);
      this.quantidade_total_compra -=
        valor * parseInt(this.tabelaProdutos[i].quantidade_comprada);
      this.tabelaProdutos.splice(index, 1);
      this.getEstoque();
      this.$forceUpdate();
    },

    SelecionarFormaPagamento(opcao) {
      if (opcao == "Dinheiro") {
        this.pagamento_vista = true;
      } else {
        this.pagamento_vista = false;
      }
    },
    verificarProdutoNaTabela(codigo_produto) {
      var self = this;
      var achou2 = false; //achou o produto
      var i = 0;
      var info_produto;

      //verifica se tem no estoque
      for (i = 0; i < self.tableData.length; i++) {
        if (self.tableData[i].id == codigo_produto) {
          info_produto = self.tableData[i];
          achou2 = true;
          break;
        }
      }
      //se achou o produto
      if (achou2) {
        this.VerificarProdutoTabelaDeProdutos(codigo_produto, info_produto);
      }
      //se nao achou o produto, da feedback
      else {
        Swal.fire({
          title: "Este codigo não existe no sistema",
          confirmButtonText: "Ok"
        });
      }
    },

    VerificarProdutoTabelaDeProdutos(codigo_produto, produto) {
      //se tem a quantidade sugerida pelo cliente
      if (this.quantidade_adicionada > 0) {
        var i = 0;
        var achou = false;
        //se achou verifica se existe ou n na tabela de produtos
        for (i = 0; i < this.tabelaProdutos.length; i++) {
          if (codigo_produto == this.tabelaProdutos[i].id) {
            achou = true;
            break;
          }
        }
        //se existe na tabela atualiza
        if (achou) {
          this.autualizarProduto(i);
        } else {
          //se n existe na tabela add
          this.addProduto(produto);
        }
      }
    },

    autualizarProduto(indice) {
      if (
        this.quantidade_adicionada > 0 &&
        this.quantidade_adicionada <=
        this.tabelaProdutos[indice].quantidade_disponivel
      ) {
        this.tabelaProdutos[indice].quantidade_disponivel -= parseInt(
          this.quantidade_adicionada
        );
        this.tabelaProdutos[indice].quantidade_comprada += parseInt(
          this.quantidade_adicionada
        );
        this.quantidade_total_compra += parseInt(
          this.tabelaProdutos[indice].valor * this.quantidade_adicionada
        );
      } else {
        Swal.fire({
          title: "Quantidade indisponivel em estoque",
          confirmButtonText: "Ok"
        });
      }
    },

    addProduto(produto) {
      //se n tem a quantidade no sistema
      if (produto.quantidade_disponivel >= this.quantidade_adicionada) {
        produto.quantidade_disponivel -= parseInt(this.quantidade_adicionada);
        produto.quantidade_comprada = parseInt(this.quantidade_adicionada);
        this.tabelaProdutos.push(produto);
        this.quantidade_total_compra += parseInt(
          produto.valor * this.quantidade_adicionada
        );
      } else {
        Swal.fire({
          title: "Quantidade indisponivel em estoque",
          text: "Quantidade disponivel: " + produto.quantidade_disponivel,
          confirmButtonText: "Ok"
        });
      }
    },
    realizarCompra() {
      if (this.tabelaProdutos.length > 0) {
        if (
          this.selected == "Dinheiro" &&
          this.valor_pago < this.quantidade_total_compra
        ) {
          Swal.fire({
            title: "Valor Pago Menor Que o Da Compra",
            confirmButtonText: "Ok"
          });
        } else {
          var self = this;
          if (this.selected != "Dinheiro") {
            this.valor_pago = this.quantidade_total_compra;
          }
          if (
            this.selected == "Dinheiro" &&
            this.valor_pago > this.quantidade_total_compra
          ) {
            Swal.fire({
              title: "Troco",
              text: this.valor_pago - this.quantidade_total_compra,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok!"
            }).then(result => {
              if (result.value) {
                // caso necessite de troco
                axios
                  .post("http://localhost:5000/realizar/compra", {
                    // Passa a informacoes do produto
                    quantidade_total_compra: this.quantidade_total_compra,
                    data_compra: this.getTempo,
                    numero_nota: this.numero_nota,
                    nome_comprador: this.nome_comprador,
                    fk_id_pdv_occorrente: this.fk_id_pdv_occorrente,
                    forma_pagamento: this.selected,
                    id_vendedor_responsavel: this.id_vendedor_responsavel,
                    valor_pago: this.valor_pago
                  })
                  .then(function (response) {
                    self.addProdutoCompra(response.data.response.insertId);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            });
          } else {
            // // caso não necessite de troco
            axios
              .post("http://localhost:5000/realizar/compra", {
                // Passa a informacoes do produto
                quantidade_total_compra: this.quantidade_total_compra,
                data_compra: this.getTempo,
                numero_nota: this.numero_nota,
                nome_comprador: this.nome_comprador,
                fk_id_pdv_occorrente: this.fk_id_pdv_occorrente,
                forma_pagamento: this.selected,
                id_vendedor_responsavel: this.id_vendedor_responsavel,
                valor_pago: this.valor_pago
              })
              .then(function (response) {
                self.addProdutoCompra(response.data.response.insertId);
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
      } else {
        Swal.fire({
          title: "É necessario a adição de produtos a compra",
          confirmButtonText: "Ok"
        });
      }
    },
    addProdutoCompra(idcompra) {
      var self = this;
      for (var i = 0; i < self.tabelaProdutos.length; i++) {
        axios
          .post("http://localhost:5000/realizar/compra/produto", {
            // Passa a informacoes do produto
            numero_nota: idcompra,
            id_produto: self.tabelaProdutos[i].id,
            quantidade_comprada: self.tabelaProdutos[i].quantidade_comprada,
            idpdv: window.localStorage.getItem("ID_PDV")
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      self.salvarHistoricoCompra(idcompra);
    },
    salvarHistoricoCompra(idcompra) {
      var self = this;
      for (var i = 0; i < self.tabelaProdutos.length; i++) {
        axios
          .post("http://localhost:5000/salvarhistorico/post/", {
            // Passa a informacoes do produto
            id_compra: idcompra,
            id_pdv: window.localStorage.getItem("ID_PDV"),
            id_produto: self.tabelaProdutos[i].id,
            nome_produto: self.tabelaProdutos[i].produto,
            quantidade_comprada: self.tabelaProdutos[i].quantidade_comprada,
            valor: self.tabelaProdutos[i].valor
          })
          .then(function (response) {
            Swal.fire({
              title: "Compra realizada",
              text: "Compra executada com sucesso, numero da nota: " + idcompra,
              confirmButtonText: "Ok"
            }).then(result => {
              if (result.value) {
                location.reload();
              }
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
};