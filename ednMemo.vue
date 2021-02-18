<template>
  <div v-if="$attrs.html == '' || $attrs.html" class="cstmMemo">
    <div
      :class="['cstmQl', $attrs.disabled ? 'disabled' : '', getIrisRdonlyMode ? 'iris-readonly' : '']"
      v-bind="$attrs"
    >
      <v-input
        :disabled="getIrisRdonlyMode"
        :filled="getIrisRdonlyMode"
        :rules="rules"
        v-model="content"
        :label="$attrs.label"
      >
        <quill-editor
          :ename="$attrs.ename"
          :id="$attrs.id"
          ref="myTextEditor"
          :class="$attrs.size"
          v-model="content"
          :options="editorOption"
        />
        <v-icon>{{ getAppendedIcon }}</v-icon>
      </v-input>
    </div>
  </div>
  <div v-else>
    <v-textarea
      :no-resize="getIrisRdonlyMode"
      :class="getMemoCssClass"
      :disabled="getIrisRdonlyMode"
      :filled="getIrisRdonlyMode"
      :required="$attrs.required"
      :maxlength="$attrs.maxlength"
      :rows="$attrs.rows"
      :placeholder="$attrs.placeholder"
      :label="$attrs.label"
      v-model="content"
      :rules="rules"
      :ename="$attrs.ename"
      :id="$attrs.id"
      :append-icon="getAppendedIcon"
      :readonly="$attrs.readonly === ''"
    >
      <template v-slot:[getSlotName] v-if="$attrs.tooltip">
        <edn-tooltip> {{ $attrs.tooltip }}</edn-tooltip>
      </template>
    </v-textarea>
  </div>
</template>

<script>
import(/* webpackChunkName: "hljs" */ 'highlight.js')
import { quillEditor } from 'vue-quill-editor'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { ednRequired } from './mixins/ednRequired'
import { ednVModel } from './mixins/ednVModel'
import { ednMimicMix } from './mixins/ednMimicMix'
import ednTooltip from './ednTooltip'

export default {
  inheritAttrs: false,
  mixins: [ednRequired, ednVModel, ednMimicMix],
  components: {
    quillEditor,
    ednTooltip
  },
  computed: {
    /**
     * Récupère le nom du slot et place le tooltip
     * différemment si on a le cadenas ou pas
     */
    getSlotName() {
      return this.getAppendedIcon ? 'append-outer' : 'append'
    },
    getMemoCssClass() {
      return this.getIrisRdonlyMode ? 'iris-memo' : ''
    },
  },
  data() {
    return {
      editorOption: {
        theme: 'snow',
        placeholder: 'Tapez votre texte ici',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video'],
          ],
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
        },
      },
    }
  },
}
</script>
<style lang="stylus">
div.cstmMemo {
  div.v-input__slot {
    display: grid;

    &:focus-within {
      label.v-label {
        color: var(--v-primary-base) !important;
      }
    }

    label.v-label {
      font-size: 0.8em;
    }
  }
}

div.cstmQl {
  display: block;

  & div.memoLabel {
    font-size: 12px;
    margin-bottom: 0.2em;
    color: var(--v-secondary-base);
  }

  div.quill-editor {
    flex: 1;

    &.normal {
      > div.ql-container {
        height: 10rem;
      }
    }

    &.large {
      > div.ql-container {
        height: 15rem;
      }
    }

    &.fatass {
      > div.ql-container {
        height: 20rem;
      }
    }

    > div.ql-container {
      &:focus-within {
        &:after {
          transform: scaleX(1);
          transition: 250ms;
        }
      }

      &:after {
        content: '';
        width: 100%;
        transition: 250ms;
        transform: scaleX(0);
        bottom: 0;
        height: 2px;
        background-color: var(--v-primary-base);
        z-index: 10;
        display: block;
      }

      position: relative;
    }
  }

  &.disabled * {
    :hover {
      &:focus-within {
        & div.memoLabel {
          color: #ccc !important;
          pointer-events: none;
        }
      }

      color: #ccc !important;
      // fill #ccc !important
      stroke: #ccc !important;
      pointer-events: none;
    }

    :before {
      color: #ccc !important;
    }

    color: #ccc !important;
    // fill #ccc !important
    stroke: #ccc !important;
    pointer-events: none;
  }
}

.v-input textarea {
  word-break: normal;
}

.iris-readonly .ql-container.ql-snow {
    background: #f0f0f0;
}

// style propre à irisMimic

.theme--light.v-text-field--filled:not(.v-input--is-focused):not(.v-input--has-state) > .v-input__control > .v-input__slot:hover
  background: rgba(0, 0, 0, 0.06);

.iris-readonly[html] i.v-icon.notranslate.mdi.mdi-lock.theme--light{
    position: absolute;
    right: 11px;
    top: 30px;
}

.v-input--is-disabled:not(.v-input--is-readonly).iris-memo{
    pointer-events:auto;
}

.v-application--is-ltr .v-text-field.iris-memo .v-input__append-inner
  position: absolute;
  right: 9px;
  top: -9px;
  pointer-events:none

.v-textarea.v-text-field--enclosed.iris-memo textarea{
  margin-top:32px;
}
</style>
