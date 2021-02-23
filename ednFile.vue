<template>
  <div>
    <v-file-input
      :prepend-inner-icon="getPrependedInnerIcon"
      :prepend-icon="getPrependedIcon"
      :disabled="getIrisRdonlyMode"
      :filled="getIrisRdonlyMode"
      v-on="$listeners"
      :label="$attrs.label"
      :rules="rules"
      :show-size="true"
      :accept="acceptFormat"
      :value="value instanceof Object && value.size > 0 ? value : undefined"
      @change="selectFile($event)"
      @click:clear="image = null"
      ref="fileUpload"
      v-bind="$attrs"
      :append-icon="getAppendedIcon"
      :class="getIrisCssClass"
    >
      <template v-slot:selection="{ text }">
        {{ text.split('(')[0] + text.slice(text.indexOf('(')).replace('B', 'o') }}
      </template>
    </v-file-input>
  </div>
</template>

<script>
import { ednRequired } from './mixins/ednRequired'
import { ednMimicMix } from './mixins/ednMimicMix'

export default {
  inheritAttrs: false,
  mixins: [ednRequired, ednMimicMix],
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
      cachedFile: undefined,
      cachedText: this.cachedFile
        ? this.$refs.fileUpload.$el.children[1].children[0].children[0].children[1].innerText
        : '',
    }
  },
  watch: {
    content() {
      this.$emit('input', this.content)
    },
    value() {
      if (this.value !== this.content) {
        this.content = this.value
      }
      if (this.value instanceof Object) {
        this.convertToBlob(this.value)
      }
    },
  },
  methods: {
    selectFile(file) {
      if (file) {
        this.content = file
        //envoye value to parent
        this.$emit('uploadFile', this.content)

        this.hasChanged = true
        this.$emit('hasChanged', this.hasChanged)
      } else {
        if (this.content === this.cachedFile) {
          this.content = this.cachedFile
        }
      }
    },
    convertToBlob(img) {
      if (img.size) {
        const reader = new FileReader()
        reader.readAsDataURL(img)
        reader.onload = e => {
          this.image = e.target.result
          this.$emit('getImage', this.image)
        }
      }
    },
  },
  computed: {
    /**
     * Si on est en mimic et readonly, on n'affiche pas l'icône paper-clip là ($file est
     * l'icône par défaut de la props )
     */
    getPrependedInnerIcon() {
      if (!this.getIrisRdonlyMode) return ''
      else return 'mdi-paperclip'
    },
    getPrependedIcon() {
      if (!this.getIrisRdonlyMode) return '$file'
      else return ''
    },
  },
  mounted() {
    if (typeof this.content === 'object') {
      this.convertToBlob(this.content)
    }
  },
}
</script>

<style lang="stylus" scoped></style>
