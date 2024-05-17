<template>
  <v-app-bar app color="#2a9d8f" height="100" scroll-behavior="elevate hide">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>
      <v-row align="center">
        <v-col cols="auto">
          <img src="../assets/logo.png" alt="Logo" height="80" />
        </v-col>
        <v-col class="d-flex align-center">
          <h2 style="font-style: italic">{{ logotitle }}</h2>
        </v-col>
      </v-row>
    </v-toolbar-title>

    <v-toolbar-title class="hidden-sm-and-down font-toolbar">
      {{ frase }}
    </v-toolbar-title>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" :left="drawer" :right="!drawer">
    <v-list>
      <v-list-item link v-for="(item, index) in items" :key="index">
        <v-list-item-title>
          <v-icon color="#E9C46A" style="margin-right: 8px">{{
            item.icon
          }}</v-icon>
          <router-link :to="item.route" class="router-link">
            {{ item.title }}
          </router-link>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const logotitle = ref("Lovely!");
const frase = ref("Sistema de Cadastro de Adoção de Animais");
const drawer = ref(false);
const items = [
  { title: "Início", icon: "mdi-home", route: "/" },
  { title: "Formulário", icon: "mdi-pencil", route: "/cadastrodeanimais" },
  { title: "Tabela de Dados", icon: "mdi-table", route: "/animaiscadastrados" },
];
</script>

<style scoped>
.router-link {
  text-decoration: none;
  color: inherit;
}

.item-selected {
  background-color: rgba(0, 0, 0, 0.1);
}

.font-toolbar {
  font-weight: 400;
}
</style>
