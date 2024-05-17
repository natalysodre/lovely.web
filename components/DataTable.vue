<template>
  <v-card title="Animais Cadastrados" flat>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Busca"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>
    <v-data-table
      :headers="headers"
      :items="animals"
      :sort-by="[{ value: 'pet', order: 'asc' }]"
      :search="search"
    >
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5"> Editar Item </span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.pet"
                      label="Animal"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.breed"
                      label="Raça"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nome"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.size"
                      label="Porte"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.vaccinated"
                      label="Vacinação"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.age"
                      label="Idade"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.sex"
                      label="Sexo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.adopter.adopterName"
                      label="Adotante"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.adopter.cpf"
                      label="CPF"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.adopter.address"
                      label="Endereço"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" sm="6">
                    <v-text-field
                      v-model="editedItem.adopter.phone"
                      label="Telefone"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#264653" variant="text" @click="close">
                Cancelar
              </v-btn>
              <v-btn color="#264653" variant="text" @click="save">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card color="#2A9D8F">
            <v-card-title class="text-h6" style="text-align: center"
              >Você tem certeza que quer deletar esse item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#264653" variant="text" @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn color="#264653" variant="text" @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-card>
  <v-row class="py-8">
    <v-col>
      <v-row class="d-flex justify-center">
        <v-btn color="#264653" class="mx-1" @click="getAnimals">Buscar</v-btn>
        <v-btn color="#264653" class="mx-1" @click="goBack">Voltar</v-btn>
      </v-row>
    </v-col>
  </v-row>
  <NuxtNotifications position="bottom right" :speed="500" :duration="5000" />
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useNuxtApp } from "#app";

const { notify } = useNotification();
const dialog = ref(false);
const dialogDelete = ref(false);

const router = useRouter();

const animals = ref([]);

const headers = ref([
  { text: "Animal", value: "pet", title: "Animal" },
  { text: "Raça", value: "breed", title: "Raça" },
  { text: "Nome", value: "name", title: "Nome" },
  { text: "Porte", value: "size", title: "Porte" },
  { text: "Vacinação", value: "vaccinated", title: "Vacinação" },
  { text: "Idade", value: "age", title: "Idade" },
  { text: "Sexo", value: "sex", title: "Sexo" },
  { text: "Adotante", value: "adopter.adopterName", title: "Adotante" },
  { text: "CPF", value: "adopter.cpf", title: "CPF" },
  { text: "Endereço", value: "adopter.address", title: "Endereço" },
  { text: "Telefone", value: "adopter.phone", title: "Telefone" },
  { text: "Ações", value: "actions", title: "Ações", sortable: false },
]);

const editedIndex = ref(-1);
const editedItem = ref({
  pet: "",
  breed: "",
  name: "",
  size: "",
  vaccinated: "",
  age: "",
  sex: "",
  adopter: {
    adopterName: "",
    cpf: "",
    address: "",
    phone: "",
  },
});

const defaultItem = {
  pet: "",
  breed: "",
  name: "",
  size: "",
  vaccinated: "",
  age: "",
  sex: "",
  adopter: {
    adopterName: "",
    cpf: "",
    address: "",
    phone: "",
  },
};

const showAlertSucess = () => {
  notify({
    title: "Sucesso!",
    text: "Ação realizada com sucesso.",
    type: "success",
  });
};

const showAlertError = () => {
  notify({
    title: "Erro!",
    text: "Não foi possível realizar a ação.",
    type: "error",
  });
};

const editItem = (item) => {
  editedIndex.value = animals.value.indexOf(item);
  editedItem.value = { ...item };
  dialog.value = true;
};

const deleteItem = (item) => {
  editedIndex.value = animals.value.indexOf(item);
  editedItem.value = { ...item };
  dialogDelete.value = true;
};

const deleteItemConfirm = async () => {
  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.delete(`/Animais/${editedItem.value.id}`);

    if (response.status === 200 || response.status === 204) {
      animals.value.splice(editedIndex.value, 1);
      closeDelete();
      showAlertSucess();
    }
  } catch (error) {
    console.error("Erro ao deletar o item:", error);
    showAlertError();
  }
};

const close = () => {
  dialog.value = false;
  editedItem.value = { ...defaultItem };
  editedIndex.value = -1;
};

const closeDelete = () => {
  dialogDelete.value = false;
  editedItem.value = { ...defaultItem };
  editedIndex.value = -1;
};

const save = async () => {
  const params = {
    pet: editedItem.value.pet,
    breed: editedItem.value.breed,
    name: editedItem.value.name,
    size: editedItem.value.size,
    vaccinated: editedItem.value.vaccinated,
    age: editedItem.value.age,
    sex: editedItem.value.sex,
    adopter: {
      adopterName: editedItem.value.adopter.adopterName,
      cpf: editedItem.value.adopter.cpf,
      address: editedItem.value.adopter.address,
      phone: editedItem.value.adopter.phone,
    },
  };

  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.patch(
      `/Animais/${editedItem.value.id}`,
      params,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 204) {
      if (editedIndex.value > -1) {
        Object.assign(animals.value[editedIndex.value], editedItem.value);
      }
      close();
    } else {
      console.error(
        "Falha ao atualizar o cadastro:",
        response.status,
        response.data
      );
    }
  } catch (error) {
    console.error("Erro ao enviar os dados:", error);
  }
};

const search = ref("");

const getAnimals = async () => {
  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.get("/animais");
    animals.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
};

const goBack = () => {
  router.go(-1);
};
</script>
