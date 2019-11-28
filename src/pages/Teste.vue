<template>
  <div class="col-md-4 ml-auto mr-auto">
    <form @submit.prevent="login">
      <card class="card-login card-plain">

        <div slot="header">
          <div class="logo-container">
            <img src="img/logo2.png" alt="">
          </div>
        </div>

        <div>
          <fg-input v-model="model.email"
                    v-validate="'required|email'"
                    name="email"
                    :error="getError('email')"
                    class="no-border form-control-lg"
                    placeholder="Email"
                    addon-left-icon="now-ui-icons ui-1_email-85">
          </fg-input>

          <fg-input v-model="model.password"
                    v-validate="'required|min:5'"
                    type="password"
                    name="password"
                    :error="getError('password')"
                    class="no-border form-control-lg"
                    placeholder="Senha"
                    addon-left-icon="now-ui-icons ui-1_lock-circle-open">
          </fg-input>

          <div>
            <n-radio id="rad" v-model="model.tipoConta" label="1">Aluno</n-radio>
            <n-radio id="rad" v-model="model.tipoConta" label="2">Professor</n-radio>
          </div>

        </div>

        <div slot="footer">
          <n-button native-type="submit" type="primary" round block>
            Entrar
          </n-button>
          <div class="pull-left">
            <h6>
              <router-link class="link footer-link" to="/register">
                Criar Conta
              </router-link>
            </h6>
          </div>

        </div>
      </card>
    </form>
  </div>
</template>
<script>

const axios = require('axios');
import url from 'src/data.js';
import swal from 'sweetalert2';
import {Radio} from 'src/components';
import { Script } from 'vm';

export default {
  components: {
    [Radio.name]: Radio,
  },
  name: 'login',
  data() {
    return {
      model: {
        email: '',
        password: '',
        tipoConta: '1',
      }
    };
  },
  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    Habilitado(id,x){
      this.$store.dispatch('DadosUsuarios', {
        nome: x,
        email: this.model.email,
        id: id,
      });
      this.$router.push("/dashboard");
    },
    NaoHabilitado(){
      swal.fire({
        type: 'error',
        title: 'Professor não encontrado',
        text: 'Dados incorretos ou não pussue conta',
        showConfirmButton: true,
      })
    },
    alunoHabilitado(id,x){
      this.$store.dispatch('DadosUsuarios', {
        nome: x,
        email: this.model.email,
        id: id,
      });
      this.$router.push("/dashboard_aluno");
    },
    alunoNaoHabilitado(){
      swal.fire({
        type: 'error',
        title: 'Aluno não encontrado',
        text: 'Dados incorretos ou não pussue conta',
        showConfirmButton: true,
      })
    },
    async login() {
      let isValidForm = await this.$validator.validateAll();
      if (isValidForm) {
         var self = this;
         if(this.model.tipoConta == '2'){
           axios.post(url+'/verificaProfessor', {
            
            email: this.model.email,
            password: this.model.password,
  
          })
          .then(function (response) {
            if(response.data.length > 0){
              self.Habilitado(response.data[0].professor_id, response.data[0].professor_nome);
            }else{
              self.NaoHabilitado();  
            }
          })
          .catch(function (error) {
            console.log(error);
          });
         }else {
           axios.post(url+'/verificaAluno', {
            
            email: this.model.email,
            password: this.model.password,
  
          })
          .then(function (response) {
            if(response.data.length > 0){
              self.alunoHabilitado(response.data[0].aluno_id, response.data[0].aluno_nome);
            }else{
              self.alunoNaoHabilitado();  
            }
          })
          .catch(function (error) {
            console.log(error);
          });
         }
      }
    }
  }
};
</Script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
#rad{
  display: inline;
}
</style>
