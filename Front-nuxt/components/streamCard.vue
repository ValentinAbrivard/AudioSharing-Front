<template>
  <div class="p-10 md:w-1/3 md:mb-0 mb-6 flex flex-col">
    <div class="pattern-dots-md gray-light">
      <div
        class="rounded bg-gray-800 p-4 transform translate-x-6 -translate-y-6"
      >
        <div
          class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            ></path>
          </svg>
        </div>
        <div class="flex-grow">
          <h2 class="text-xl title-font font-medium mb-3">{{ title }}</h2>
          <p class="leading-relaxed text-sm text-justify px-">
            {{ description }}
          </p>
          <nuxt-link
            :to="buttonLink"
            class="bg-purple-900 px-2 py-1 rounded my-2 shadow font-medium"
          >
            {{ buttonText }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    buttonText: {
      type: String,
      required: false,
      default: '',
    },
    buttonLink: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>
