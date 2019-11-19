<template>
<card>
  <base-table :data="tableData" :columns="columns">
    <template slot="columns">
      <th class="text-center"> Data Compra</th>
      <th class="text-center">Numero Nota</th>
      <th class="text-center">Vendedor</th>
      <th class="text-right">Action</th>
    </template>
    <template slot-scope="{row}">
      <td class="text-center">{{row.data_compra}}</td>
      <td class="text-center">{{row.numero_nota}}</td>
      <td class="text-center">{{row.vendedor}}</td>
      <td class="td-actions text-right">
        <base-button type="info" size="sm" icon v-on:click="IrParaPontodeVenda(row.numero_nota)">
          <i class="tim-icons icon-settings"></i>
        </base-button>
      </td>
    </template>
  </base-table>
</card>
</template>
<script>
import { BaseTable } from "@/components";
import axios from "axios";
export default {
  components: {
    BaseTable
  },
  data() {
    return {
      columns: ["Id", "Data Compra", "Numero da Nota", "Vendedor"],
      tableData: []
    };
  },
  mounted() {
    var self = this;
    axios
      .get("http://localhost:5000/compra/get?idpdv=" + window.localStorage.getItem("ID_PDV")) // get na API para mostrar todas as filiais
      .then(function(response) {
         for (var i = 0; i < response.data.response.length; i++) {
          // monta a lista de filiais
          self.tableData.push({
            numero_nota: response.data.response[i].numero_nota,
            data_compra: response.data.response[i].data_compra,
            vendedor: response.data.response[i].id_vendedor_responsavel
          });
        }
      })
      .catch(function(error) {
        /// Erro na API
        console.log(error);
      });
  },
  methods: {
    IrParaPontodeVenda(id) {
      for (var i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id == id) {
          break;
        }
      }
      window.localStorage.setItem("id_compra", id);
      this.$router.push("/produtos"); // vai para a proxima pagina
    }
  }
};
</script>

