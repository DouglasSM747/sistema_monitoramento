

<template>
  <card>
    <!-- Excluir Produto -->
    <div>
      <modal :show.sync="remover_modal">
        <template slot="header">
          <h3 class="modal-title" id="exampleModalLabel">Deseja Excluir o Produto do Estoque ?</h3>
        </template>
        <template slot="footer">
          <base-button
            type="secondary"
            v-on:click="excluirProdutoLogicamente(atual_pdv,produto_excluir)"
          >Sim, logicamente</base-button>
          <base-button
            type="secondary"
            v-on:click="excluirProdutoPermanente(atual_pdv,produto_excluir)"
          >Sim, fisicamente</base-button>
          <base-button type="secondary" @click="remover_modal = false">Cancelar</base-button>
        </template>
      </modal>
    </div>
    <!-- Adicionar Produto -->
    <div>
      <modal
        :show.sync="Adicionar_modal"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-sm"
      >
        <card type="secondary" body-classes="px-lg-5 py-lg-5" class="border-0 mb-0">
          <template>
            <div class="text-muted text-center mb-3">Adicionar Produto Em Estoque</div>
            <blockquote class="blockquote">
              <p class="mb-0 small" style="color: white">
                Caso deseje apenas atualizar
                o produto, somente é necessario preencher os campos (codigo do produto, valor e quantidade)
                caso contrario todos devem ser preenchidos.
              </p>
            </blockquote>
            <form role="form">
              <base-input
                alternative
                class="mb-3"
                placeholder="Codigo do Produto"
                addon-left-icon="ni ni-email-83"
                v-model="produtoEdit.id"
              ></base-input>
              <base-input
                alternative
                v-model="produtoEdit.quantidade"
                placeholder="Quantidade"
                addon-left-icon="ni ni-lock-circle-open"
              ></base-input>
              <base-input
                alternative
                v-model="produtoEdit.nome"
                placeholder="Nome do Produto"
                addon-left-icon="ni ni-lock-circle-open"
              ></base-input>
              <base-input
                alternative
                v-model="produtoEdit.valor"
                placeholder="Valor do Produto"
                addon-left-icon="ni ni-lock-circle-open"
              ></base-input>
              <div class="text-center">
                <base-button
                  v-on:click="verificarAddEstoque(produtoEdit.id)"
                  type="primary"
                  class="my-4"
                >Adicionar</base-button>
                <base-button
                  v-on:click="Adicionar_modal = false"
                  type="secundary"
                  class="my-4"
                >Cancelar</base-button>
              </div>
            </form>
          </template>
        </card>
      </modal>
    </div>

    <div>
      <!-- Card 1 - Add Produtos -->
      <card>
        <h4 class="card-title">Adicionar Produto no Estoque</h4>
        <p class="card-text">
          Caso o produto passado para ser adicionado, ja existir no tabela
          apenas sera incrementado sua quantidade.
        </p>
        <!-- botao para abrir adicao de produto -->
        <base-button
          class="animation-on-hover"
          @click="Adicionar_modal= true"
          type="success"
        >Adicionar Produto</base-button>
      </card>
      <base-table :data="tableData" :columns="columns">
        <template slot="columns">
          <th class="text-center">Numero Produto</th>
          <th class="text-center">Produto</th>
          <th class="text-center">Quantidade</th>
          <th class="text-center">Valor</th>
          <th class="text-center">Excluir</th>
        </template>
        <template slot-scope="{row}">
          <td class="text-center">{{row.id}}</td>
          <td class="text-center">{{row.produto}}</td>
          <td class="text-center">{{row.quantidade}}</td>
          <td class="text-center">{{row.valor}}</td>
          <td class="td-actions text-center">
            <base-button type="info" size="sm" icon v-on:click="abrirModalExclusao(row.id)">
              <i class="tim-icons icon-simple-remove"></i>
            </base-button>
          </td>
        </template>
      </base-table>
    </div>
  </card>
</template>
<script src = "/home/douglas/Downloads/vue-black-dashboard-master/src/scripts/Estoque.js"> </script>