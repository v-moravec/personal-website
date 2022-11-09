<template>
  <div class="relative overflow-hidden">
    <div class="container mx-auto">
      <div class="flex flex-col md:flex-row items-center justify-center h-screen">
        <div class="w-[600px] max-w-full">
          <h2>
            Jagu Nuxt Template
          </h2>
          <p>
            Remove <span class="text-highlight">&lt;JaguWelcome /></span> component in
            <span class="text-highlight">pages/index.vue</span> and start developing.
          </p>
        </div>
        <div class="p-10">
          <img class="w-64" src="~assets/svg/jagu-logo.svg" alt="jagu-logo">
        </div>
      </div>
    </div>
    <div class="absolute z-[-1] top-0 right-0 -scale-100 translate-x-1/3 -translate-y-1/3">
      <img class="w-full" src="~assets/png/blob-gradient-wide.png" alt="blob">
    </div>
    <div class="absolute z-[-1] bottom-0 left-0 -translate-x-1/3 translate-y-1/3">
      <img class="w-full" src="~assets/png/blob-gradient-wide.png" alt="blob">
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.text-highlight {
  @apply bg-jagu-orange px-2 text-white font-medium;
}
</style>
