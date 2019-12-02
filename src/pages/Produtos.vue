<template>
  <card>
    <div>
      <base-table :data="tableData" :columns="columns">
        <template slot="columns">
          <th class="text-center">Numero Produto</th>
          <th class="text-center">Nome</th>
          <th class="text-center">Quantidade</th>
          <th class="text-center">Valor</th>
        </template>
        <template slot-scope="{row}">
          <td class="text-center">{{row.id}}</td>
          <td class="text-center">{{row.num_produto}}</td>
          <td class="text-center">{{row.quantidade}}</td>
          <td class="text-center">{{row.valor}}</td>
        </template>
      </base-table>
    </div>
    <div class="text-right col-lg-12 ml-auto mr-auto">
      <h4>Valor total da compra: {{valor_total}}</h4>
    </div>
  </card>
</template>
<script src = "/home/douglas/Downloads/vue-black-dashboard-master/src/scripts/Produtos.js"> </script>

