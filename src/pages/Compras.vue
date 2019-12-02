<template>
  <card>
    <base-table :data="tableDataCompras" :columns="columns">
      <template slot="columns">
        <th class="text-center">Numero Nota</th>
        <th class="text-center">Vendedor</th>
        <th class="text-center">Comprador</th>
        <th class="text-center">Data Compra</th>
        <th class="text-right">Action</th>
      </template>
      <template slot-scope="{row}">
        <td class="text-center">{{row.numero_nota}}</td>
        <td class="text-center">{{row.vendedor}}</td>
        <td class="text-center">{{row.nome_comprador}}</td>
        <td class="text-center">{{row.data_compra}}</td>
        <td class="td-actions text-right">
          <base-button
            type="info"
            size="sm"
            icon
            v-on:click="listadeProdutosComprados(row.numero_nota)"
          >
            <i class="tim-icons icon-zoom-split"></i>
          </base-button>
        </td>
      </template>
    </base-table>
  </card>
</template>
<script src="/home/douglas/Downloads/vue-black-dashboard-master/src/scripts/Compra.js"></script>

