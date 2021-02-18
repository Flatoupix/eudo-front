<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-icon class="evts-auto" v-on="on" style="cursor: pointer">mdi-help-circle-outline</v-icon>
    </template>
    <slot></slot>
  </v-tooltip>
</template>

<script>

export default {
  name: 'ednTooltip',
  inheritAttrs: false,
};
</script>
<style lang="stylus"></style>
