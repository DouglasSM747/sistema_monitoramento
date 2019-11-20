

<template>
  <card>
    <!-- Excluir Produto -->
    <div>
      <modal :show.sync="remover_modal">
        <template slot="header">
          <h3 class="modal-title" id="exampleModalLabel">Deseja Excluir o Produto do Estoque ?</h3>
        </template>
        <template slot="footer">
          <base-button type="secondary" v-on:click="excluirProdutoLogicamente()" >Sim, logicamente</base-button>
          <base-button type="secondary" v-on:click="excluirProdutoPermanente()"> Sim, fisicamente</base-button>
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
              <base-input
                alternative
                v-model="vendedorEdit.idvendedor"
                placeholder="Codigo do Vendedor"
                type="text"
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
            <base-button type="info" size="sm" icon v-on:click="abrirModalExclusao(row.id)">
              <i  class=" text-center tim-icons icon-simple-remove"></i>
            </base-button>
          </td>
        </template>
      </base-table>
    </div>
  </card>
</template>
<script>
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
      Adicionar_modal: false,
      remover_modal: false,
      columns: ["id", "name", "job", "since", "excluir"],
      tableData: [],
      vendedorEdit: { idvendedor: '',email: "", senha: "", tipo: "funcionario"},
      atual_pdv: window.localStorage.getItem("ID_PDV")
    };
  },
  mounted() {
    this.atual_pdv = window.localStorage.getItem("ID_PDV");
    var self = this;
    //puxa todos os funcionarios do ponto de venda atual
    axios
      .get("http://localhost:5000/vendedor/get?idpdv=" + self.atual_pdv) // get na API para mostrar todas os pdv
      .then(function(response) {
        for (var i = 0; i < response.data.response.length; i++) {
            self.tableData.push({
              idVendedor: response.data.response[i].idVendedor,
              email: response.data.response[i].email,
              fk_id_PDV_pertencente: response.data.response[i].fk_id_PDV_pertencente
            });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {

    abrirModalExclusao(id){
    this.remover_modal = true
    },
    cadastrarFuncionario(){
        axios.post("http://localhost:5000/cadastrar/vendedor", {
          // Passa a informacoes do funcionario
          fk_id_PDV_pertencente: this.atual_pdv,
          tipo: 'funcionario',
          email: this.vendedorEdit.email,
          senha: this.vendedorEdit.senha,
          id: this.vendedorEdit.idvendedor
        })
        .then(function(response) {
        location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

