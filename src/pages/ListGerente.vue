

<template>
  <card>
    <!-- Excluir Produto -->
    <div>
      <modal :show.sync="remover_modal">
        <template slot="header">
          <h3 class="text-center modal-title">Deseja Excluir o Ponto de Venda?</h3>
        </template>
        <template slot="footer">
          <base-button type="secondary" v-on:click="deletarPDV()" >Sim, permanentemente</base-button>
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
            <div class="text-muted text-center mb-3">Cadastrar Ponto de Venda</div>
            <form role="form">
              <base-input
                alternative
                class="mb-3"
                placeholder="Email"
                addon-left-icon="ni ni-email-83"
                v-model="DonoEdit.email"
              ></base-input>
              <base-input
                alternative
                v-model="DonoEdit.senha"
                placeholder="Senha"
                type="password"
                addon-left-icon="ni ni-lock-circle-open"
              ></base-input>
              <base-input
                alternative
                v-model="DonoEdit.idPDV"
                placeholder="Codigo do PDV Que Vai Atuar"
                type="text"
                addon-left-icon="ni ni-lock-circle-open"
              ></base-input>
              <div class="text-center">
                <base-button
                  v-on:click="cadastrarDono()"
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
      <!-- Card 1 - Add Donos -->
      
        <h4 class="card-title">Adicionar Ponto de Venda</h4>

        <!-- botao para abrir adicao de produto -->
        <base-button
          class="animation-on-hover"
          @click="Adicionar_modal= true"
          type="success"
        >Cadastrar Ponto de Venda</base-button>
      
      <base-table :data="tableData" :columns="columns">
        <template slot="columns">
          <th class="text-center">Id Ponto de Venda</th>
          <th class="text-center">Id Empresa/Gerente</th>
          <th class="text-center">E-mail Dono do ponto</th>
          <th class="text-center">Deletar</th>
        </template>
        <template slot-scope="{row}">
          <td class="text-center">{{row.idPDV}}</td>
          <td class="text-center">{{row.fk_gerentePDV}}</td>
          <td class="text-center">{{row.email}}</td>
          <td class="td-actions text-center">
            <base-button type="info" size="sm" icon v-on:click="abrirModal(row.idPDV,row.fk_gerentePDV)">
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

import { Modal } from "/home/douglas/Documentos/sistema_monitoramento/src/components";

const Swal = require("sweetalert2");

export default {
  components: {
    BaseTable,
    Modal
  },
  data() {
    return {
      idPDV_remove: 0,
      fk_gerentePDV_remove: 0,
      Adicionar_modal: false,
      remover_modal: false,
      columns: ["id", "name", "job", "since", "excluir"],
      tableData: [],
      DonoEdit: { idPDV: '',email: "", senha: "", tipo: "dono"},
    };
  },
  mounted() {
    var self = this;
    //puxa todos os funcionarios do ponto de venda atual
    axios
      .get("http://localhost:5000/donos/get?idpdv=" + window.localStorage.getItem("ID_GERENTE")) // get na API para mostrar todas os pdv
      .then(function(response) {
        for (var i = 0; i < response.data.response.length; i++) {
            self.tableData.push({
              SAT: response.data.response[i].SAT,
              email: response.data.response[i].email,
              fk_gerentePDV: response.data.response[i].fk_gerentePDV,
              idPDV: response.data.response[i].idPDV
            });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    cadastrarDono(){
        var existe = false;
        for(var i = 0; i < this.tableData.length;i++){
          if(this.DonoEdit.idPDV == this.tableData[i].idPDV){
            existe = true;
            break;
          }
        }
        if(existe){
            Swal.fire({
              title: "Codigo já existe no Sistema",
              confirmButtonText: "Ok"
            });
        }else{
          axios.post("http://localhost:5000/cadastrar/dono", {
            // Passa a informacoes do funcionario
            idPDV: this.DonoEdit.idPDV,
            tipo: 'dono',
            email: this.DonoEdit.email,
            senha: this.DonoEdit.senha,
            fk_gerentePDV: window.localStorage.getItem("ID_GERENTE")
          })
          .then(function(response) {
          location.reload();
          })
          .catch(function(error) {
            console.log(error);
          });
        }

    },
    deletarPDV(){
      console.log("OI");
      axios.post("http://localhost:5000/deletar/dono", {
        // Passa a informacoes do funcionario
        idPDV: this.idPDV_remove,
        fk_gerentePDV: window.localStorage.getItem("ID_GERENTE")
      })
      .then(function(response) {
      location.reload();
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    abrirModal(idpdv){
      this.remover_modal = true;
      this.idPDV_remove = idpdv;
    }
  }
};
</script>

