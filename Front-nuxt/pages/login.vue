<template>
  <div class="justify-center bg-gray-100 h-screen">
    <div class="container mx-auto p-8 flex">
      <div class="max-w-md w-full mx-auto">
        <h1
          class="text-4xl text-center items-center justify-center font-thin p-12"
        >
          Audio Sharing
        </h1>

        <div class="bg-white rounded overflow-hidden shadow-2xl">
          <div class="p-8">
            <form @submit.prevent="LogIn()">
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
                <input
                  v-model="password"
                  type="password"
                  name="password"
                  class="block w-full p-3 rounded bg-gray-200 border border-transparent focus:outline-none"
                />
              </div>

              <span v-if="error_login == 1" class="text-red-500">
                Erreur connexion
              </span>

              <button
                class="w-full p-3 mt-4 bg-black text-white rounded shadow"
              >
                Login
              </button>
            </form>
          </div>

          <div
            class="flex justify-between p-8 text-sm border-t border-gray-300 bg-gray-100"
          >
            <nuxt-link :to="'/register'" class="font-medium text-black">
              Créer mon compte
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
export default {
  auth: false,
  data() {
    return {
      email: '',
      password: '',
      error_login: 0,
      result: {},
    }
  },
  methods: {
    async LogIn() {
      const data = await this.$axios.$post('http://127.0.0.1:3000/user/login', {
        nomdecompte: this.email,
        password: this.password,
      })

      if (data.nomdecompte) {
        const idroomfromuser = data.idRoom
        const datafromroom = await this.$axios
          .$get('http://127.0.0.1:3000/room/' + idroomfromuser)
          .then((result) => {
            console.log('data')
            return result.live
          })

        const data2 = await this.$axios.$post(
          'http://127.0.0.1:3000/user/token',
          {
            nomdecompte: data.nomdecompte,
          }
        )
        if (data2) {
          console.log('data : ' + datafromroom)
          this.$store.commit('addUser', {
            email: this.email,
            token: data2,
            id: data._id,
            room: data.idRoom,
            live: datafromroom,
          })

          this.$router.push({
            path: '/',
          })
        } else {
          this.error_login = 1
        }
      } else {
        this.error_login = 1
      }
    },
  },
}
</script>
