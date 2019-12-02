

<template>
  <card>
    <!-- Adicionar Produto -->
    <div>
      <modal
        :show.sync="Adicionar_modal"
        body-classes="p-0"
        modal-classes="modal-dialog-centered modal-sm"
      >
        <card type="secondary" body-classes="px-lg-200 py-lg-500" class="border-100 mb-0">
          <template>
            <div class="text-muted text-center mb-3">Cadastrar Funcionario</div>
            <form role="form">
              <base-input
                alternative
                class="mb-3"
                placeholder="Email"
                addon-left-icon="ni ni-email-83"
                v-model="vendedorEdit.email"
              ></base-input>
              <base-input
                alternative
                v-model="vendedorEdit.senha"
                placeholder="Senha"
                type="password"
                addon-left-icon="ni ni-lock-circle-open"
              ></base-input>
              <div class="text-center">
                <base-button
                  v-on:click="cadastrarFuncionario()"
                  type="primary"
                  class="my-4"
                >Cadastrar</base-button>
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
      
        <h4 class="card-title">Adicionar Funcionario no Ponto de Venda</h4>

        <!-- botao para abrir adicao de produto -->
        <base-button
          class="animation-on-hover"
          @click="Adicionar_modal= true"
          type="success"
        >Cadastrar Funcionario</base-button>
      
      <base-table :data="tableData" :columns="columns">
        <template slot="columns">
          <th class="text-center">Id Vendedor</th>
          <th class="text-center">E-mail</th>
          <th class="text-center">Editar</th>
        </template>
        <template slot-scope="{row}">
          <td class="text-center">{{row.idVendedor}}</td>
          <td class="text-center">{{row.email}}</td>
          <td class="td-actions text-center">
            <base-button type="info" size="sm" icon v-on:click="editarVendedor(row.idVendedor)">
              <i  class=" text-center tim-icons icon-pencil"></i>
            </base-button>
          </td>
        </template>
      </base-table>
    </div>
  </card>
</template>
<script src = "/home/douglas/Downloads/vue-black-dashboard-master/src/scripts/ListFun.js"> </script>