<template>
  <div>
    <div class="relative h-screen w-full">
      <div class="absolute bottom-2 left-2 z-10">
        <h1 class="md:text-8xl 2xl:text-9xl">
          Vojtěch
        </h1>
        <h1 class="md:text-8xl 2xl:text-9xl">
          Moravec
        </h1>
        <div class="flex">
          <h3 v-if="currRoom === 'work_room.glb'">
            {{ currSlogan }} at <a class="isolate text-[#ffa93d] hover:text-[#5b7ae1]" href="https://new.jagu.dev" target="_blank">Jagu</a>
          </h3>
          <h3 v-else-if="currRoom === 'student_room.glb'">
            {{ currSlogan }} at <a class="school-link" href="https://fit.cvut.cz" target="_blank">FIT CTU</a>
          </h3>
          <h3 v-else-if="currRoom === 'ld_seating_room.glb'">
            <a class="text-gray-500" href="https://ld-seating-3d.web.app/" target="_blank">{{ currSlogan }}</a> for <a class="ld-link" href="https://ldseating.com" target="_blank">LD Seating</a>  at <a class="work-link" href="https://new.jagu.dev" target="_blank">Jagu</a>
          </h3>
        </div>
      </div>
      <div
        class="absolute left-4 lg:left-40 top-8 lg:top-1/2 -translate-y-1/2 z-10 cursor-pointer"
        :class="{'school-hover': currRoom === 'student_room.glb', 'work-hover': currRoom === 'work_room.glb', 'ld-hover': currRoom === 'ld_seating_room.glb'}"
        @click="prev"
      >
        <svg v-show="!roomLoading" class="w-10 h-10 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
      </div>
      <div
        class="absolute right-4 lg:right-40 top-8 lg:top-1/2 -translate-y-1/2 z-10 cursor-pointer"
        :class="{'school-hover': currSlogan === 'Student', 'work-hover': currSlogan === 'Frontend developer', 'ld-hover': currRoom === 'ld_seating_room.glb'}"
        @click="next"
      >
        <svg v-show="!roomLoading" class="w-10 h-10 fill-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>
      </div>
      <Rooms :loading="roomLoading" :room="currRoom" @loading="roomLoading = $event" />
    </div>
    <div v-if="false" class="container mx-auto py-20">
      <section class="py-10">
        <h2>Projects</h2>
        <div class="bg-black p-4 h-[450px] w-[700px] rounded-3xl bg-contain bg-cover bg-no-repeat bg-[url('~/assets/png/jaguweb.png')] relative">
          <div class="bg-black text-white rounded-full w-fit py-1 px-2 absolute bottom-4">
            <p class="mb-0">
              Jagu Web
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const technologies = ref([
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
])
</script>

<script>

import Rooms from '@/components/Rooms'
export default {
  name: 'HomeView',
  components: { Rooms },
  data () {
    return {
      rooms: [
        'work_room.glb',
        'student_room.glb',
        'ld_seating_room.glb'
      ],
      slogans: [
        'Frontend developer & designer',
        'Student',
        '3D configurator'
      ],
      cnt: 0,
      currRoom: null,
      currSlogan: null,
      roomLoading: true
    }
  },
  mounted () {
    this.currRoom = this.rooms[0]
    this.currSlogan = this.slogans[0]
  },
  methods: {
    next () {
      this.cnt = this.mod((this.cnt + 1), this.rooms.length)
      this.currRoom = this.rooms[this.cnt]
      this.currSlogan = this.slogans[this.cnt]
    },
    prev () {
      this.cnt = this.mod((this.cnt - 1), this.rooms.length)
      this.currRoom = this.rooms[this.cnt]
      this.currSlogan = this.slogans[this.cnt]
    },
    mod (n, m) {
      return ((n % m) + m) % m
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
