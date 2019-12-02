<template>
  <card>
    <form>
      <div class="form-row">
        <base-input
          class="col-md-3"
          v-model="getTempo"
          label="Data Compra"
          placeholder="xx/xx/xxxx"
        />
        <base-input
          class="col-md-3"
          v-model="nome_comprador"
          label="Nome Comprador"
          placeholder="Joao ..."
        />
      </div>
      <div class="form-row">
        <base-input
          class="col-md-4"
          v-if="pagamento_vista"
          v-model="valor_pago"
          type="text"
          label="Valor Pago"
          placeholder="Quantidade Paga"
        />
        <base-input class="col-md-4" label="Forma de Pagamento">
          <select
            v-on:click="SelecionarFormaPagamento(selected)"
            v-model="selected"
            id="inputState"
            class="form-control"
          >
            <option v-bind:key="item.op" v-for="item in forma_de_pagamento">{{item.op}}</option>
          </select>
        </base-input>
      </div>
      <div class="form-row">
        <!-- codigo do produto a ser adicionado -->
        <base-input
          class="col-md-5"
          v-model="produto_adicionado"
          label="Digite aqui o numero do produto para ser adicionado"
          v-on:keyup.enter="verificarProdutoNaTabela(produto_adicionado)"
          placeholder="0"
        />
        <!-- Quantidade do produto a ser adicionado -->
        <base-input
          class="col-md-5"
          v-model="quantidade_adicionada"
          label="Digite aqui a quantidade a ser adicionado"
          placeholder="0"
          v-on:keyup.enter="verificarProdutoNaTabela(produto_adicionado)"
        />
      </div>
      <div class="table-responsive">
        <base-table :key="componentKey" :data="tabelaProdutos" :columns="columns">
          <template slot="columns">
            <th class="text-center">Numero Produto</th>
            <th class="text-center">Nome Produto</th>
            <th class="text-center">Valor</th>
            <th class="text-center">Quantidade Comprada</th>
            <th class="text-center">Quantidade Disponivel</th>

            <th class="text-center">Actions</th>
          </template>
          <template slot-scope="{row}">
            <td class="text-center">{{row.id}}</td>
            <td class="text-center">{{row.produto}}</td>
            <td class="text-center">{{row.valor}}</td>
            <td class="text-center">{{row.quantidade_comprada}}</td>
            <td class="text-center">{{row.quantidade_disponivel}}</td>
            <td class="td-actions text-center">
              <base-button
                v-on:click="excluirProduto(row.id,row.valor)"
                type="danger"
                size="sm"
                icon
              >
                <i class="tim-icons icon-simple-remove"></i>
              </base-button>
            </td>
          </template>
        </base-table>
      </div>
      <div>
        Quantidade Total: {{quantidade_total_compra}}
        <base-button type="primary" v-on:click="realizarCompra()">Realizar Compra</base-button>
      </div>
    </form>
  </card>
</template>2
<script src = "/home/douglas/Downloads/vue-black-dashboard-master/src/scripts/Compra.js">
</script>

