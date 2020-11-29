<template>
  <div>
    <div class="w-full h-screen bg-blue-600 flex items-center justify-center">
      <div class="max-w-3xl w-full flex justify-between items-center">
        <div>
          <img src="~assets/avataaars.svg" />
          <div class="text-white font-medium text-2xl mx-6">
            <div>
              Bonjour <span v-if="user">{{ user.email }}</span>
            </div>
            <div>room Id : {{ user.room }}</div>
          </div>
        </div>
        <div class="bg-white rounded overflow-hidden shadow-2xl w-1/2">
          <div class="p-6">
            <h2 class="text-center w-full text-xl">Editer mon compte</h2>
            <form @submit.prevent="Updateinformation()">
              <div class="mb-5">
                <label
                  for="nom"
                  class="block mb-2 text-sm font-medium text-gray-600 text-left"
                  >Pseudo</label
                >
                <input
                  v-model="nom"
                  type="text"
                  name="nom"
                  class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>
              <div class="mb-5">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-600 text-left"
                  >Description</label
                >
                <input
                  v-model="description"
                  type="text"
                  name="description"
                  class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>
              <div class="mb-5">
                <label
                  for="photo"
                  class="block mb-2 text-sm font-medium text-gray-600 text-left"
                  >Photo</label
                >
                <input
                  v-model="photo"
                  type="text"
                  name="photo"
                  class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>
              <div class="mb-5">
                <label
                  for="nomroom"
                  class="block mb-2 text-sm font-medium text-gray-600 text-left"
                  >nomroom</label
                >
                <input
                  v-model="nomroom"
                  type="text"
                  name="nomroom"
                  class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>

              <div class="mb-5">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-600 text-left"
                  >Modifier Mot de passe</label
                >
                <password
                  v-model="password2"
                  name="password"
                  :toggle="true"
                  placeholder="Mot de passe"
                  default-class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>

              <p v-if="error == 1" class="text-red-500 text-center">Error</p>

              <p v-if="success == 1" class="text-green-500 text-center">
                Vous avez biien modifié vos informations
              </p>
              <button
                class="w-full p-3 mt-4 bg-blue-900 text-white rounded shadow"
                @click="Updateinformation"
              >
                Modif
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Password from 'vue-password-strength-meter'
import { mapGetters } from 'vuex'
export default {
  middleware: 'authenticated',
  layout: 'dashboard',
  components: {
    Password,
  },
  data() {
    return {
      nom: '',
      description: '',
      photo: '',
      nomroom: '',
      error_updateinformation: 0,
      error: 0,
      success: 0,
      password2: '',
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  methods: {
    Updateinformation() {
      this.error_updateinformation = 0
      if (this.nom !== '') {
        console.log('nom')
        console.log(this.nom)
        this.$axios
          .$post('http://127.0.0.1:3000/user/' + this.user.id, {
            nomdecompte: this.nom,
          })
          .then((response) => {
            this.success = 1
            this.$store.commit('changepayload', {
              email: this.nom,
              id: this.user.id,
              token: this.user.token,
              room: this.user.room,
            })
          })
          .catch(() => {
            this.error = 1
          })
      }
      if (this.description !== '') {
        console.log('desc')
        console.log(this.description)
        this.$axios
          .$post('http://127.0.0.1:3000/user/' + this.user.id, {
            description: this.description,
          })
          .then((response) => {
            this.success = 1
          })
          .catch(() => {
            this.error = 1
          })
      }
      if (this.photo !== '') {
        console.log('photo')
        console.log(this.photo)
        this.$axios
          .$post('http://127.0.0.1:3000/user/' + this.user.id, {
            photo: this.photo,
          })
          .then((response) => {
            this.success = 1
          })
          .catch(() => {
            this.error = 1
          })
      }
      if (this.nomroom !== '') {
        console.log('nomRoom')
        console.log(this.nomroom)
        this.$axios
          .$post('http://127.0.0.1:3000/room/' + this.user.room, {
            nomderoom: this.nomroom,
          })
          .then((response) => {
            this.success = 1
          })
          .catch(() => {
            this.error = 1
          })
      }
    },
  },
}
</script>

<style>
.h-128 {
  height: 28rem;
}
</style>
