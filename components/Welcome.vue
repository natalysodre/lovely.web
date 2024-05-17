<template>
  <v-main class="background">
    <v-container class="d-flex justify-end">
      <v-row>
        <v-col cols="12" md="12">
          <h1 class="fontTitleStyle">
            Bem-vindo ao Centro de Cadastro de Adoção de Animais!
          </h1>
          <p class="fontPStyle">
            Nosso objetivo é conectar animais adoráveis a lares amorosos.
          </p>
          <p class="fontPStyle">
            Juntos, podemos transformar vidas e criar laços que durarão para
            sempre.
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <v-footer class="d-flex justify-center" style="background-color: #2a9d8f">
    <p class="fontFooterStyle">
      Criado e desenvolvido por Nataly Sodré. ©️ {{ new Date().getFullYear() }}
    </p>
  </v-footer>
</template>

<script setup></script>

<style scoped>
.background {
  background-image: url("../assets/welcome.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
  opacity: 0.9;
}

.fontTitleStyle {
  color: #ffffff;
  font-size: 50px;
  text-shadow: 2px 2px 5px #000000;
  text-align: right;
  font-weight: 700;
}

.fontPStyle {
  color: #ffffff;
  font-size: 20px;
  text-shadow: 2px 2px 5px #000000;
  text-align: right;
  font-weight: 400;
}

.fontFooterStyle {
  color: #ffffff;
  font-size: 15px;
  font-weight: 400;
}
</style>
