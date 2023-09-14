<script>
import { inject } from 'vue'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['title'],
  setup() {
    const selectedTitle = inject('selectedTitle')

    return {
      selectedTitle
    }
  }
}
</script>

<template>
  <div v-show="title === selectedTitle" class="singleTab">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import './../assets/css/variables';
.singleTab {
  background-color: $c-gray--dark;
  padding: 24px 32px;
  height: 100%;
}
</style>
