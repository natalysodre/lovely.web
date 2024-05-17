<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-form ref="petForm">
          <v-card class="custom-card">
            <v-card-title class="custom-title">Detalhes do Pet</v-card-title>
            <v-card-text>
              <v-select
                v-model="form.pet"
                :items="petOptions"
                label="Animal"
              ></v-select>
              {{ form.pet }}
              <v-select
                v-if="form.pet"
                v-model="form.breed"
                :items="breedOptions"
                label="Raça"
              ></v-select>
              <v-text-field v-model="form.name" label="Nome"></v-text-field>
              <v-select
                v-model="form.size"
                :items="sizeOptions"
                label="Porte"
              ></v-select>
              <v-select
                v-model="form.vaccinated"
                :items="['Sim', 'Não']"
                label="Vacinação"
              ></v-select>
              <v-select
                v-model="form.age"
                :items="ageOptions"
                label="Idade aprox."
              ></v-select>
              <v-select
                v-model="form.sex"
                :items="['Fêmea', 'Macho']"
                label="Sexo"
              ></v-select>
            </v-card-text>
          </v-card>
        </v-form>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="custom-card">
          <v-card-title class="custom-title">Cadastro do Adotante</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="form.adopter.adopterName"
              label="Nome"
              :rules="[(v) => !!v || '*Obrigatório']"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.adopter.cpf"
              label="CPF"
              :rules="[(v) => !!v || '*Obrigatório']"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.adopter.address"
              label="Endereço"
              :rules="[(v) => !!v || '*Obrigatório']"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.adopter.phone"
              label="Telefone"
              :rules="[(v) => !!v || '*Obrigatório']"
              required
            ></v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12" class="py-5 d-flex justify-center">
        <v-btn color="#264653" class="mx-1" @click="sendData"
          >Novo cadastro</v-btn
        >
        <v-btn color="#264653" class="mx-1" @click="clear">Limpar</v-btn>
        <v-btn color="#264653" class="mx-1" @click="goBack">Voltar</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <NuxtNotifications position="bottom right" :speed="500" :duration="5000" />
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const { notify } = useNotification();
const router = useRouter();

const props = defineProps({
  form: Object,
  petOptions: Array,
  breedOptions: Array,
  sizeOptions: Array,
  ageOptions: Array,
});

const form = ref({
  pet: null,
  breed: null,
  name: "",
  size: null,
  vaccinated: null,
  age: null,
  sex: null,
  adopter: {
    adopterName: "",
    cpf: "",
    address: "",
    phone: "",
  },
});

const petOptions = ["Cachorro", "Gato"];
const dogBreeds = [
  "Beagle",
  "Border Collie",
  "Boxer",
  "Bulldog",
  "Dachshund",
  "Golden Retriever",
  "Labrador Retriever",
  "Pastor Alemão",
  "Poodle",
  "Shih Tzu",
  "Yorkshire Terrier",
  "Sem raça definida",
];
const catBreeds = [
  "Bengal",
  "Maine Coon",
  "Persa",
  "Ragdoll",
  "Siamês",
  "Sphynx",
  "Sem raça definida",
];

const breedOptions = computed(() => {
  switch (form.value.pet) {
    case "Cachorro":
      return dogBreeds;
    case "Gato":
      return catBreeds;
    default:
      return [];
  }
});

const sizeOptions = ["Pequeno", "Médio", "Grande"];
const ageOptions = ["Filhote", "Adulto", "Idoso"];

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

const clear = () => {
  form.value.pet = undefined;
  form.value.breed = undefined;
  form.value.name = undefined;
  form.value.size = undefined;
  sizeOptions.value = undefined;
  form.value.vaccinated = undefined;
  form.value.age = undefined;
  ageOptions.value = undefined;
  form.value.sex = undefined;
  form.value.adopter.adopterName = undefined;
  form.value.adopter.cpf = undefined;
  form.value.adopter.address = undefined;
  form.value.adopter.phone = undefined;
};

const goBack = () => {
  router.go(-1);
};

const sendData = async () => {
  const params = {
    pet: form.value.pet,
    breed: form.value.breed,
    name: form.value.name,
    size: form.value.size,
    vaccinated: form.value.vaccinated,
    age: form.value.age,
    sex: form.value.sex,
    adopter: {
      adopterName: form.value.adopter.adopterName,
      cpf: form.value.adopter.cpf,
      address: form.value.adopter.address,
      phone: form.value.adopter.phone,
    },
  };

  try {
    const { $axios } = useNuxtApp();
    const response = await $axios.post("/Animais", params);

    if (response.status === 200 || response.status === 201) {
      clear();
      showAlertSucess();
    }
  } catch (error) {
    console.error("Erro ao enviar os dados:", error);
    showAlertError();
  }
};
</script>

<style scoped>
.custom-card {
  color: #264653;
}
.custom-title {
  color: #264653;
}
</style>
