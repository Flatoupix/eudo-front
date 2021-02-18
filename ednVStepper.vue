<template>
  <v-navigation-drawer floating permanent>
    <!-- <v-list-item dense> -->
    <v-progress-linear class="ma-4 flexContentDiv" :value="progress" height="20">
      <template v-slot:default="{ value }">
        <div class="tLValue">{{ value }}%</div>
      </template>
    </v-progress-linear>
    <!-- </v-list-item> -->
    <v-timeline dense>
      <v-timeline-item
        @click.native="getFocus(step)"
        v-for="(step, index) in stepsObj"
        :key="index"
        fill-dot
        :color="getState(step) + ' white--text'"
        :class="['align-center cur-pointer', isFocused(step)]"
      >
        <template v-slot:icon
          ><span> {{ index + 1 }}</span></template
        >{{ step.text }}</v-timeline-item
      >
    </v-timeline>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    steps: {
      type: Array,
      default: () => [],
    },
    progress: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      stepsObj: [],
    }
  },
  methods: {
    getState(item) {
      if (item.focused) {
        return 'primary'
      } else {
        if (item.done) {
          return 'primary lighten-1'
        } else {
          return 'grey lighten-2'
        }
      }
    },
    isFocused(item) {
      if (item.focused) {
        return 'focused'
      } else {
        return ''
      }
    },
    isDone(item) {
      if (item.done) {
        return 'primary lighten-1'
      } else {
        return 'grey lighten-2'
      }
    },
    getsteps() {
      this.steps.forEach((step) => {
        let stepObj = {
          text: step,
          focused: false,
          done: false,
        }
        this.stepsObj.push(stepObj)
      })
      this.stepsObj[0].focused = true
    },
    getFocus(item) {
      this.stepsObj.forEach((step) => {
        if (step.text === item.text) {
          step.focused = true
        } else {
          step.focused = false
        }
      })
    },
  },

  created() {
    if (this.steps.length > 1) this.getsteps()
  },
}
</script>

<style lang="stylus">
div.tLValue
  position: absolute;
  background-color: var(--v-primary-base);
  border-radius: 100%;
  height: 35px;
  width: 35px;
  text-align: center;
  line-height: 35px;
  color: white;
  left: -15px;
  font-size: 7pt;

div.v-progress-linear.flexContentDiv
  overflow initial

  &> div.v-progress-linear__content
    justify-content flex-start

div.focused > div.v-timeline-item__body
  font-weight bold
</style>