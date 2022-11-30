<template>
  <div class="h-screen relative overflow-x-hidden">
    <div v-if="loading" class="loading">
      <h1>Loading</h1>
      <div class="loading-circle">
        <span />
      </div>
    </div>
    <canvas ref="webgl" class="webgl" />
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Rooms',
  props: {
    room: {
      type: String,
      default: 'student_room.glb'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      sizes: {
        width: document.body.clientWidth,
        height: window.innerHeight
      },
      material: null,
      ambientLight: null
    }
  },
  watch: {
    room: {
      immediate: false,
      handler () {
        if (this.room) {
          this.scene.remove(this.roomModel)
          this.loadRoom()
          console.log(this.scene)
        }
      }
    }
  },
  mounted () {
    /**
     * Base
     */
    // Canvas
    const canvas = document.querySelector('canvas.webgl')

    // Scene
    this.scene = new THREE.Scene()

    this.scene.background = new THREE.Color('#fff')

    // Material
    this.material = new THREE.MeshStandardMaterial()
    this.material.roughness = 0.4

    /**
     * Resize handler
     */

    window.addEventListener('resize', () => {
      this.sizes.width = document.body.clientWidth
      this.sizes.height = window.innerHeight

      camera.aspect = this.sizes.width / this.sizes.height
      camera.updateProjectionMatrix()

      renderer.setSize(this.sizes.width, this.sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(25, this.sizes.width / this.sizes.height, 0.1, 100)
    camera.position.x = -9.6
    camera.position.y = 6.85
    camera.position.z = 9.4
    if (document.body.clientWidth < 800) {
      camera.position.x = -12.7
      camera.position.y = 9.08
      camera.position.z = 12.46
    }
    this.scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.maxPolarAngle = Math.PI / 2
    controls.maxAzimuthAngle = 0
    controls.minAzimuthAngle = -Math.PI * 0.5
    controls.maxDistance = 20
    controls.enablePan = true
    controls.enableZoom = false

    // controls.addEventListener('change', () => {
    //   console.log(controls.object.position)
    // })

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.setSize(this.sizes.width, this.sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.setClearAlpha(1)

    if (this.room) {
      this.loadRoom()
    }

    /**
     * Light
     */

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(this.ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7)
    dirLight.position.set(-3, 1.6, 2.6)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.width = 4096
    dirLight.shadow.mapSize.height = 4096
    dirLight.shadow.camera.near = 0.1
    dirLight.shadow.camera.far = 8
    dirLight.shadow.camera.left = -3
    dirLight.shadow.camera.right = 3
    dirLight.shadow.camera.top = 3
    dirLight.shadow.camera.bottom = -3
    dirLight.shadow.radius = 2
    dirLight.shadow.bias = -0.005
    this.scene.add(dirLight)

    const dirLightHelper = new THREE.CameraHelper(dirLight.shadow.camera)
    dirLightHelper.visible = false
    this.scene.add(dirLightHelper)

    /**
     * Animate
     */
    // const clock = new THREE.Clock()

    const tick = () => {
      // const elapsedTime = clock.getElapsedTime()

      // Update controls
      controls.update()

      // Render
      renderer.render(this.scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    this.createGui()

    tick()
  },
  methods: {
    createGui () {
      const gui = new GUI()

      gui.add(this.material, 'wireframe')
      gui.add(this.ambientLight, 'intensity').min(0).max(1)
      gui.addColor(this.material, 'color')
      gui.hide()
    },
    colorChildren (obj, name, material) {
      if (obj.name === name) {
        obj.traverse((child) => {
          child.material = material
        })
      }
    },
    colorObj (obj, name, material) {
      if (obj.name === name) {
        obj.material = material
      }
    },
    loadRoom () {
      this.$emit('loading', true)
      const dracoLoader = new DRACOLoader()
      dracoLoader.setDecoderPath('/draco/')
      const loader = new GLTFLoader()
      loader.setDRACOLoader(dracoLoader)
      loader.load('../3d_models/' + this.room, (gltf) => {
        this.roomModel = gltf.scene
        this.roomModel.position.x = 0
        this.roomModel.position.y = -1
        this.roomModel.position.z = 0
        // const wallsMaterial = new THREE.MeshPhongMaterial({ color: '#1766AF' })
        // const darkCommonMaterial = new THREE.MeshPhongMaterial({ color: '#48484D', shininess: 10 })
        // const fitCtuMaterial = new THREE.MeshStandardMaterial({ color: '#0355A1' })
        // const whiteMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' })
        this.roomModel.traverse((obj) => {
          obj.castShadow = true
          obj.receiveShadow = true
          // this.colorChildren(obj, 'walls', wallsMaterial)
          // this.colorChildren(obj, 'table', darkCommonMaterial)
          // this.colorChildren(obj, 'fit-ctu-design', fitCtuMaterial)
          // this.colorObj(obj, 'pic_left_front', whiteMaterial)
          // this.colorObj(obj, 'pic_right_front', whiteMaterial)
          // this.colorObj(obj, 'pic_left_back', darkCommonMaterial)
          // this.colorObj(obj, 'pic_right_back', darkCommonMaterial)
        })
        this.scene.add(this.roomModel)
        this.$emit('loading', false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  color: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading-circle {
  height: 32px;
  width: 32px;
  -webkit-animation: loader-5-1 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  animation: loader-5-1 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-5-1 {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes loader-5-1 {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loading-circle::before {
  content: "";
  display: block;
  position: absolute;
  top: 0; left: 0;
  bottom: 0; right: auto;
  margin: auto;
  width: 8px;
  height: 8px;
  background: #FFF;
  border-radius: 50%;
  -webkit-animation: loader-5-2 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  animation: loader-5-2 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-5-2 {
  0%   { -webkit-transform: translate3d(0, 0, 0) scale(1); }
  50%  { -webkit-transform: translate3d(24px, 0, 0) scale(.5); }
  100% { -webkit-transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes loader-5-2 {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(24px, 0, 0) scale(.5); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
.loading-circle::after {
  content: "";
  display: block;
  position: absolute;
  top: 0; left: auto;
  bottom: 0; right: 0;
  margin: auto;
  width: 8px;
  height: 8px;
  background: #FFF;
  border-radius: 50%;
  -webkit-animation: loader-5-3 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  animation: loader-5-3 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-5-3 {
  0%   { -webkit-transform: translate3d(0, 0, 0) scale(1); }
  50%  { -webkit-transform: translate3d(-24px, 0, 0) scale(.5); }
  100% { -webkit-transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes loader-5-3 {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(-24px, 0, 0) scale(.5); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
.loading-circle span {
  display: block;
  position: absolute;
  top: 0; left: 0;
  bottom: 0; right: 0;
  margin: auto;
  height: 32px;
  width: 32px;
}
.loading-circle span::before {
  content: "";
  display: block;
  position: absolute;
  top: 0; left: 0;
  bottom: auto; right: 0;
  margin: auto;
  width: 8px;
  height: 8px;
  background: #FFF;
  border-radius: 50%;
  -webkit-animation: loader-5-4 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  animation: loader-5-4 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-5-4 {
  0%   { -webkit-transform: translate3d(0, 0, 0) scale(1); }
  50%  { -webkit-transform: translate3d(0, 24px, 0) scale(.5); }
  100% { -webkit-transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes loader-5-4 {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(0, 24px, 0) scale(.5); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}
.loading-circle span::after {
  content: "";
  display: block;
  position: absolute;
  top: auto; left: 0;
  bottom: 0; right: 0;
  margin: auto;
  width: 8px;
  height: 8px;
  background: #FFF;
  border-radius: 50%;
  -webkit-animation: loader-5-5 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
  animation: loader-5-5 2s cubic-bezier(0.770, 0.000, 0.175, 1.000) infinite;
}
@-webkit-keyframes loader-5-5 {
  0%   { -webkit-transform: translate3d(0, 0, 0) scale(1); }
  50%  { -webkit-transform: translate3d(0, -24px, 0) scale(.5); }
  100% { -webkit-transform: translate3d(0, 0, 0) scale(1); }
}
@keyframes loader-5-5 {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  50%  { transform: translate3d(0, -24px, 0) scale(.5); }
  100% { transform: translate3d(0, 0, 0) scale(1); }
}

*, ::after, ::before { -webkit-box-sizing: border-box; box-sizing: border-box; }
html { width: 100%; height: 100%; font-size: 62.5%; }
body { width: 100%; height: 100%; background: #3530F0; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

.webgl {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
