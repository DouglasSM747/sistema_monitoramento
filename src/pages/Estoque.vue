<template>
  <div>
    <!-- Card 1 - Add Produtos -->
    <card>
      <h4 class="card-title">Adicionar Produto no Estoque</h4>
      <p class="card-text">
        Caso o produto passado para ser adicionado, ja existir no tabela
        apenas sera incrementado sua quantidade.
      </p>
      <!-- botao para abrir adicao de produto -->
      <base-button class="animation-on-hover"  @click.native="print" type="success">Adicionar Produto</base-button>
      <!-- Card de adicacao submeter -->
    </card>
    <!-- <card v-if="abrir_card">
      <form @submit.prevent>
        <base-input label="Email address" type="email" placeholder="Enter email">
          <small
            slot="helperText"
            id="emailHelp"
            class="form-text text-muted"
          >We'll never share your email with anyone else.</small>
        </base-input>
        <base-input label="Password" type="password" placeholder="Password"></base-input>
        <base-checkbox>Option one is this</base-checkbox>
        <base-button native-type="submit" type="primary">Teste</button>
      </form>
    </card> -->
    <base-table :data="tableData" :columns="columns">
      <template slot="columns">
        <th class="text-center">Numero Produto</th>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Valor</th>
        <th class="text-right">Excluir</th>
      </template>
      <template slot-scope="{row}">
        <td class="text-center">{{row.id}}</td>
        <td>{{row.produto}}</td>
        <td>{{row.quantidade}}</td>
        <td>{{row.valor}}</td>
        <td class="td-actions text-right">
          <base-button type="info" size="sm">
            <i class="tim-icons icon-simple-remove"></i>
          </base-button>
        </td>
      </template>
    </base-table>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
import axios from "axios";
import swal from 'sweetalert2';
const Swal = require('sweetalert2');

export default {
  components: {
    BaseTable
  },
  data() {
    return {
      columns: ["id", "name", "job", "since", "excluir"],
      tableData: []
    };
  },
  mounted() {
    var self = this;
    axios
      .get("http://localhost:5000/estoque/get?idpdv=1") // get na API para mostrar todas os pdv
      .then(function(response) {
        for (var i = 0; i < response.data.response.length; i++) {
          self.tableData.push({
            quantidade: response.data.response[i].quantidade_estoque,
            id: response.data.response[i].id_produto,
            produto: response.data.response[i].nome_produto,
            valor: response.data.response[i].valor
          });
        }
      })
      .catch(function(error) {
        /// Erro na API
        console.log(error);
      });
  },
  methods:{
		print () { /// mostra alerta para imprimir
			Swal.fire({
				title: 'Imprimir cupom?',
				type: 'question',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Sim, Imprimir',
				cancelButtonText: 'Cancelar',
			}).then((result) => {
				if (result.value) { // se imprimir ok
				Swal.fire( 
					'Cupom impresso',
				)
				}
			})
    }
  }
};
</script>

