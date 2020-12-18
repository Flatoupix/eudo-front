<template>
  <v-file-input
    v-on="$listeners"
    :label="$attrs.label"
    :rules="rules"
    :show-size="true"
    :accept="acceptFormat"
    :value="value instanceof Object && value.size > 0 ? value : undefined"
    @change="selectFile($event)"
    @click:clear="image = null"
    v-bind="$attrs"
  >
    <template v-slot:selection="{ text }">
      {{ text.split('(')[0] + text.slice(text.indexOf('(')).replace('B', 'o') }}
    </template>
  </v-file-input>
</template>

<script>
import { ednRequired } from './mixins/ednRequired'

export default {
  inheritAttrs: false,
  mixins: [ednRequired],
  props: {
    value: null,

    errorMsg: {
      type: String,
      default: () => '',
    },
    validateRes: {
      type: String,
      default: () => 'Valider',
    },
    acceptFormat: {
      type: String,
      default: '',
    },
    labelUploadImage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      image: {},
      content: this.value,
      hasChanged: false,
    }
  },
  watch: {
    content() {
      this.$emit('input', this.content)
    },
    value() {
      if (this.value != this.content) {
        this.content = this.value
      }
      if (this.value instanceof Object) {
        this.convertToBlob(this.value)
      }
    },
  },
  methods: {
    selectFile(file) {
      this.content = file
      if (this.content) {
        //envoye value to parent
        this.$emit('uploadFile', this.content)

        this.hasChanged = true
        this.$emit('hasChanged', this.hasChanged)
      }
    },
    convertToBlob(img) {
      if (img.size) {
        const reader = new FileReader()
        reader.readAsDataURL(img)
        reader.onload = (e) => {
          this.image = e.target.result
          this.$emit('getImage', this.image)
        }
      }
    },
  },
  mounted() {
    if (typeof this.content === 'object') {
      this.convertToBlob(this.content)
    }
  },
}
</script>

<style lang='stylus' scoped></style>
