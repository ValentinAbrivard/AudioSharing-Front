<template>
  <div class="h-screen bg-gray-900 w-full">
    <div
      class="flex items-center justify-center h-screen font-medium text-4xl text-white"
    >
      <div class="mx-2">Room {{ $route.params.stream }}</div>
      <iframe
        v-if="user"
        id="theFrame"
        :src="
          'http://localhost:3002/chat.html?username=' +
          user.email +
          '&room=' +
          $route.params.stream
        "
        style="width: 100%"
        class="h-full"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'authenticated',
  layout: 'dashboard',
  computed: {
    ...mapGetters({
      user: 'getUser',
    }),
  },
}
</script>
