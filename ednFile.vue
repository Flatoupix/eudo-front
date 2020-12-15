<template>
  <v-file-input
    v-on="$listeners"
    :label="$attrs.label"
    :rules="rules"
    :show-size="true"
    :accept="acceptFormat"
    :value="value !== null || value !== undefined ? value : null"
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
import { ednVModel } from './mixins/ednVModel'

export default {
  inheritAttrs: false,
  mixins: [ednRequired, ednVModel],
  props: {
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
    }
  },
  methods: {
    selectFile(file) {
      this.content = file
      if (this.content) {
        //envoye value to parent
        this.$emit('uploadFile', this.content)
        this.convertToBlob(this.content)
      }
    },
    convertToBlob(img) {
      const reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onload = (e) => {
        this.image = e.target.result
        this.$emit('getImage', this.image)
      }
    },
  },
}
</script>

<style lang='stylus' scoped></style>
