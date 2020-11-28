<template>
  <nav class="bg-blue-900 w-full py-1 duration-1000 transition ease-in-out">
    <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div class="sm:border-b border-gray-700 md:border-0">
        <div class="flex items-center justify-between h-16 px-4 sm:px-0">
          <div class="flex items-center">
            <div class="flex-shrink-0 font-medium text-white text-2xl">
              <nuxt-link to="/"> AudioSharing </nuxt-link>
            </div>
            <div class="hidden md:block flex items-center justify-between">
              <div class="ml-10 flex items-baseline">
                <nuxt-link
                  to="/"
                  class="mx-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700"
                >
                  Home
                </nuxt-link>
                <nuxt-link
                  to="/stream"
                  class="mx-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-white hover:bg-gray-700"
                >
                  Tous les streams
                </nuxt-link>
                <div class="flex items-center">
                  <div
                    class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-700 cursor-not-allowed"
                  >
                    Stream deluxe
                  </div>
                  <div class="soon_button py-1 px-2 text-xs">Bientot</div>
                </div>
                <div
                  class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-red-700 cursor-pointer"
                  @click="logout"
                >
                  Déconnexion
                </div>
                <div
                  v-if="this.user.live == false"
                  class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-green-700 cursor-pointer"
                  @click="streamlive"
                >
                  Lancer Stream
                </div>
                <div
                  v-if="this.user.live == true"
                  class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-red-700 cursor-pointer"
                  @click="streamlive"
                >
                  Arrêter son Stream
                </div>
              </div>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <button
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              @click="open = !open"
            >
              <svg
                class="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  :class="{ hidden: open, 'inline-flex': !open }"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  :class="{ hidden: !open, 'inline-flex': open }"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{ block: open, hidden: !open }"
      class="border-b border-gray-700 md:hidden"
    >
      <div class="px-2 py-3 sm:px-3">
        <nuxt-link
          to="/"
          class="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900"
        >
          Home
        </nuxt-link>
        <nuxt-link
          to="/stream"
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
        >
          Tous les streams
        </nuxt-link>
        <nuxt-link
          to="/blocked"
          class="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
        >
          Stream deluxe
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      open: false,
      button: false,
      error: 0,
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
  date() {
    const date1 = new Date()
    return date1.toLocaleString(this.$i18n.locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  },
  watch: {
    $route(to, from) {
      /* if (this.user.online === false) {
        this.$router.push({
          path: '/login',
        })
      } */
    },
  },
  mounted() {
    /* setTimeout(() => {
      if (this.user.online === false) {
        this.$router.push({
          path: '/login',
        })
      }
    }, 50) */
  },
  methods: {
    logout() {
      this.$store.commit('deleteUser')
      this.$router.push({
        path: '/login',
      })
    },
    streamlive() {
      this.$axios
        .$post('http://127.0.0.1:3000/room/' + this.user.room + '/live')
        .then((response) => {
          if (response.live === true) {
            this.live = true
          } else {
            this.live = false
          }
          this.$store.commit('changepayload', {
            email: this.user.email,
            id: this.user.id,
            token: this.user.token,
            room: this.user.room,
            live: this.live,
          })
          console.log(this.live)
          console.log(response)
        })
        .catch(() => {
          this.error = 1
        })
    },
  },
}
</script>

<style scoped>
svg {
  margin-right: 5px;
}

.nuxt-link-active-exact {
  background: #3e7ff7;
  color: black;
}

.soon_button {
  background: #718096;
  border-radius: 4px;
  color: white;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 10px;
  line-height: 16px;
}
</style>
