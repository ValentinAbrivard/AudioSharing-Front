<template>
  <div class="justify-center bg-gray-100 h-screen">
    <div class="container mx-auto p-8 flex">
      <div class="max-w-md w-full mx-auto">
        <h1
          class="text-4xl text-center items-center justify-center font-thin p-12"
        >
          AudioSharing
        </h1>

        <div class="bg-white rounded overflow-hidden shadow-2xl">
          <div class="p-8">
            <form @submit.prevent="SignUp()">
              <div class="mb-5">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-600 text-left"
                  >Email</label
                >
                <input
                  v-model="email"
                  type="text"
                  name="email"
                  class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>

              <div class="mb-5">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-600 text-left"
                  >Mot de passe</label
                >
                <password
                  v-model="password"
                  name="password"
                  :toggle="true"
                  placeholder="Mot de passe"
                  default-class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>

              <div class="mb-5">
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-600 text-left"
                  >Confirmer Mot de passe</label
                >
                <password
                  v-model="password2"
                  name="password"
                  :toggle="true"
                  placeholder="Mot de passe"
                  default-class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>

              <p v-if="error_signup == 1" class="text-red-500 text-center">
                Error
              </p>
              <p v-if="success == 1" class="text-green-500 text-center">
                Vous êtes bien inscrit
              </p>

              <button
                class="w-full p-3 mt-4 bg-black text-white rounded shadow"
              >
                Inscription
              </button>
            </form>
          </div>

          <div
            class="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100"
          >
            <nuxt-link :to="'/login'" class="font-medium text-black">
              Connexion
            </nuxt-link>

            <nuxt-link :to="'/forgot'" class="text-gray-600">
              Mot de passe oublié
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Password from 'vue-password-strength-meter'

export default {
  auth: false,
  components: {
    Password,
  },
  data() {
    return {
      email: '',
      password: '',
      password2: '',
      error_signup: 0,
      success: 0,
    }
  },
  methods: {
    SignUp() {
      this.error_signup = 0
      console.log(
        'DEBUT DE LA REQUETE DE CREATION DE COMPTE -----------------------------------------'
      )
      if (this.password2 === this.password) {
        this.$axios
          .$post('http://127.0.0.1:3000/user', {
            nomdecompte: this.email,
            password: this.password,
          })
          .then((response) => {
            this.success = 1
          })
          .catch(() => {
            this.error_signup = 1
          })
      } else {
        this.error_signup = 1
        alert('les 2 passwords sont différents')
      }
    },
  },
}
</script>
