<template>
  <div ref="agentsRef" class="!h-full" />
</template>

<script setup>
import p5 from 'p5'

const agentsRef = ref(null)

// eslint-disable-next-line
class Agent {
  constructor () {
    const SPEED_RANGE = 1
    const ACCELERATION_RANGE = 0
    this.position = s.createVector(s.random(0, s.width), s.random(0, s.height))
    this.velocity = s.createVector(s.random(-SPEED_RANGE, SPEED_RANGE), s.random(-SPEED_RANGE, SPEED_RANGE))
    this.acceleration = s.createVector(s.random(-ACCELERATION_RANGE, ACCELERATION_RANGE), s.random(-ACCELERATION_RANGE, ACCELERATION_RANGE))
    this.color = colors[Math.floor(Math.random() * colors.length)]

    this.radius = 60
  }

  draw () {
    s.stroke(0, 0, 0)
    s.noStroke()
    s.fill(this.color)
    s.circle(this.position.x, this.position.y, 20)
    // s.noFill()
    // s.stroke(200, 200, 200)
    // s.circle(this.position.x, this.position.y, this.radius * 2)
  }

  update () {
    const nearbyAgents = agents.filter((otherAgent) => {
      return otherAgent.position.dist(this.position) < this.radius
    })

    // Cohesion
    const avgPos = nearbyAgents.reduce((avgPos, otherAgent) => {
      avgPos.add(otherAgent.position)
      return avgPos
    }, s.createVector(0, 0))

    avgPos.div(nearbyAgents.length)
    const cohDir = avgPos.sub(this.position)
    // cohDir.normalize()

    // Separation
    const tmpPosition = s.createVector(0, 0)
    const sepDir = nearbyAgents.reduce((dir, otherAgent) => {
      tmpPosition.set(this.position.x, this.position.y)
      tmpPosition.sub(otherAgent.position).normalize()
      dir.add(tmpPosition)
      return dir
    }, s.createVector(0, 0))
    sepDir.mult(4)

    // Alingment
    const alignDir = nearbyAgents.reduce((dir, otherAgent) => {
      dir.add(otherAgent.velocity)
      return dir
    }, s.createVector(0, 0))
    alignDir.div(nearbyAgents.length)
    alignDir.normalize()
    const velocityCopy = this.velocity.copy()
    velocityCopy.normalize()
    alignDir.sub(velocityCopy)

    // Accumulate forces
    this.acceleration.add(cohDir)
    this.acceleration.add(sepDir)
    this.acceleration.add(alignDir)

    // s.stroke(255, 0, 0)
    // s.circle(avgPos.x, avgPos.y, 3)

    // Important
    this.acceleration.limit(0.1)
    this.velocity.add(this.acceleration)
    this.velocity.limit(2)
    this.position.add(this.velocity)

    // Correct position
    if (this.position.x > s.width) {
      this.position.x = 0
    }

    if (this.position.x < 0) {
      this.position.x = s.width
    }

    if (this.position.y > s.height) {
      this.position.y = 0
    }

    if (this.position.y < 0) {
      this.position.y = s.height
    }
  }
}

const agents = []
const colors = [[34, 87, 122], [56, 163, 165], [87, 204, 153], [128, 237, 153], [199, 249, 204]]

let s

onMounted(() => {
  const sketch = (s) => {
    s.setup = () => {
      const canvas = s.createCanvas(window.innerWidth, '2000')
      canvas.parent(agentsRef.value)
      s.background(0)
      s.noFill()
    }

    s.draw = () => {
      s.background(0)
      agents.forEach(agent => {
        agent.update()
        agent.draw()
      })
    }
  }

  // eslint-disable-next-line new-cap,no-unused-vars
  s = new p5(sketch)

  for (let i = 0; i < 500; i++) {
    agents.push(new Agent())
  }
})
</script>

<style scoped>

</style>
