<template>
  <div>
    <div class="relative container mx-auto h-screen w-full flex flex-col lg:flex-row items-center justify-center gap-10">
      <div class="z-10 max-w-xl w-full">
        <h1>Vojtěch</h1>
        <h1>Moravec</h1>
        <div class="flex">
          <h3 v-if="currRoom === 'work_room.glb'">
            {{ currSlogan }} at <a class="text-jagu-orange hover:text-jagu-blue" href="https://jagu.cz" target="_blank">Jagu</a>
          </h3>
          <h3 v-else-if="currRoom === 'student_room.glb'">
            {{ currSlogan }} at <a class="text-fit-ctu-blue hover:text-black" href="https://fit.cvut.cz" target="_blank">FIT CTU</a>
          </h3>
          <h3 v-else-if="currRoom === 'ld_seating_room.glb'">
            <a class="text-ld-seating-gray hover:text-black" href="https://ld-seating-3d.web.app/" target="_blank">{{ currSlogan }}</a> for <a class="text-ld-seating-gray hover:text-black" href="https://ldseating.com" target="_blank">LD Seating</a>  at <a class="work-link" href="https://jagu.cz" target="_blank">Jagu</a>
          </h3>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center max-w-full">
        <Rooms class="flex" :loading="roomLoading" :room="currRoom" @loading="roomLoading = $event" />
        <div class="flex">
          <div
            class="z-10 cursor-pointer"
            :class="{'school-hover': currRoom === 'student_room.glb', 'work-hover': currRoom === 'work_room.glb', 'ld-hover': currRoom === 'ld_seating_room.glb'}"
            @click="prev"
          >
            <svg v-show="!roomLoading" class="w-10 h-10 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
          </div>
          <div
            class="z-10 cursor-pointer"
            :class="{'school-hover': currSlogan === 'Student', 'work-hover': currSlogan === 'Frontend developer', 'ld-hover': currRoom === 'ld_seating_room.glb'}"
            @click="next"
          >
            <svg v-show="!roomLoading" class="w-10 h-10 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
          </div>
        </div>
      </div>
    </div>
    <div v-if="false" class="bg-black text-white">
      <div class="container mx-auto py-20 z-50">
        <section class="py-10">
          <h2 class="mb-16">
            Projects
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <template v-for="project in projects" :key="project.name">
              <div class="bg-black p-4 h-[450px] w-[700px] max-w-full rounded-3xl bg-center bg-cover bg-no-repeat relative" :style="{backgroundImage: `url('${project.image}')`}">
                <div class="bg-black text-white rounded-full w-fit py-1 px-2 absolute bottom-4">
                  <p class="mb-0">
                    {{ project.name }}
                  </p>
                </div>
                <a :href="project.link" target="_blank" class="p-2 rounded-full bg-black absolute right-4">
                  <svg class="fill-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" /></svg>
                </a>
              </div>
            </template>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const title = 'Vojtěch Moravec | Frontend developer & designer'
const description = 'I\'m a frontend developer and UI/UX designer. My favourite tools are Vue 3 & Nuxt 3, Tailwind, ' +
    'three.js, Adobe products (XD, Illustrator, Photoshop). I use Strapi as CMS of choice, Firebase for more complex backend.' +
    'I deploy on Vercel, Cloudflare and Railway, but I can use DigitalOcean and AWS as well.'
const ogImage = 'vm-og-image.png'

useSEOHead({
  title,
  description,
  ogImage
})

interface Project {
  name: string,
  image: string,
  link: string
}

import JaguWebImage from '/assets/png/jaguweb.png'

const projects: Project[] = [
  {
    name: 'Jagu Web',
    image: JaguWebImage,
    link: 'https://jagu.cz'
  }
]

const technologies = [
  {
    name: 'JavaScript',
    icon: null
  },
  {
    name: 'TypeScript',
    icon: null
  },
  {
    name: 'Nuxt',
    icon: null
  },
  {
    name: 'Vue',
    icon: null
  },
  {
    name: 'Prisma',
    icon: null
  },
  {
    name: 'Supabase',
    icon: null
  },
  {
    name: 'Strapi',
    icon: null
  },
  {
    name: 'Digital Ocean',
    icon: null
  },
  {
    name: 'Adobe XD',
    icon: null
  },
  {
    name: 'Adobe Illustrator',
    icon: null
  },
  {
    name: 'Adobe Photoshop',
    icon: null
  },
]

const rooms = [
  'work_room.glb',
  'student_room.glb',
  'ld_seating_room.glb'
]
const slogans = [
  'Frontend developer & designer',
  'Student',
  '3D configurator'
]
const cnt = ref(0)
const currRoom = ref('')
const currSlogan = ref('')
const roomLoading = ref(true)

onMounted(() => {
  currRoom.value = rooms[0]
  currSlogan.value = slogans[0]
})

function next () {
  cnt.value = mod((cnt.value + 1), rooms.length)
  currRoom.value = rooms[cnt.value]
  currSlogan.value = slogans[cnt.value]
}

function prev () {
  cnt.value = mod((cnt.value - 1), rooms.length)
  currRoom.value = rooms[cnt.value]
  currSlogan.value = slogans[cnt.value]
}

function mod (n: number, m: number) {
  return ((n % m) + m) % m
}
</script>

<style lang="scss" scoped>

</style>
