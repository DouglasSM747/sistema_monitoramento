<template>
  <div style="margin-top: 15%" class="container">
    <div class="col-lg-6 ml-auto mr-auto">
      <form>
        <card class="card-login card-white">
          <template slot="header">
            <img src="./img/pdv_logo.png" alt="elgin" class="logoElgin" />
          </template>

          <div class="Formulario">
            <validation-provider rules="required" v-slot="{ errors }">
              <base-input
                v-model="email"
                type="email"
                name="email"
                placeholder="Email"
                addon-left-icon="tim-icons icon-email-85">
              </base-input>
              <span>{{ errors[0] }}</span>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors }">
              <base-input
                name="Senha"
                v-model="password"
                type="password"
                placeholder="Password"
                addon-left-icon="tim-icons icon-lock-circle"
              ></base-input>
            </validation-provider>
          </div>
          <div>
            <base-button v-on:click="Logar(email,password)" type="primary" class="mb-3" size="lg" block>Entrar</base-button>
          </div>
        </card>
      </form>
    </div>
  </div>
</template>



<script src = "/home/douglas/Downloads/vue-black-dashboard-master/src/scripts/Login.js"></script>

<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: auto;
}

.logoElgin {
  display: block;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  height: 60%;
}

.Formulario {
  margin-top: 0px;
}
</style>
