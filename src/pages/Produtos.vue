<template>
<card>
  <div>
    <card>Valor total desta compra: {{valor_total}}</card>

    <base-table :data="tableData" :columns="columns">
      <template slot="columns">
        <th class="text-center">Numero Produto</th>
        <th class="text-center">Nome</th>
        <th class="text-center">Valor</th>
      </template>
      <template slot-scope="{row}">
        <td class="text-center">{{row.id}}</td>
        <td class="text-center">{{row.num_produto}}</td>
        <td class="text-center">{{row.valor}}</td>
      </template>
    </base-table>
  </div>
</card>
</template>
<script>
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
          window.localStorage.getItem("id_compra")
      ) // get na API para mostrar todas os pdv
      .then(function(response) {
        for (var i = 0; i < response.data.response.length; i++) {
          // monta a lista de pdv
          (self.valor_total += response.data.response[i].valor),
            self.tableData.push({
              id: response.data.response[i].id_produto,
              num_produto: response.data.response[i].nome_produto,
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
</script>

