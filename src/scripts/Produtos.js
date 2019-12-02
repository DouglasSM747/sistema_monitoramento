import axios from "axios";
import { BaseTable } from "@/components";
export default {
  components: {
    BaseTable
  },
  data() {
    return {
      valor_total: 0,
      columns: ["Id", "Numero Produto", "Valor"],
      tableData: []
    };
  },
  mounted() {
    var self = this;
    axios
      .get(
        "http://localhost:5000/produtos/get?idcompra= " +
          window.localStorage.getItem("id_compra") +
          "&idpdv=" +
          window.localStorage.getItem("ID_PDV")
      ) // get na API para mostrar todas os pdv
      .then(function(response) {
        for (var i = 0; i < response.data.response.length; i++) {
          // monta a lista de pdv
          (self.valor_total +=
            response.data.response[i].valor *
            response.data.response[i].quantidade_comprada),
            self.tableData.push({
              id: response.data.response[i].id_produto,
              num_produto: response.data.response[i].nome_produto,
              quantidade: response.data.response[i].quantidade_comprada,
              valor: response.data.response[i].valor
            });
        }
      })
      .catch(function(error) {
        /// Erro na API
        console.log(error);
      });
  }
};