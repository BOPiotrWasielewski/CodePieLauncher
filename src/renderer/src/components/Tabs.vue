<script>
import { ref, provide } from 'vue'

export default {
  setup(props, { slots }) {
    const tabTitles = ref(slots.default().map((tab) => tab.props.title))
    const selectedTitle = ref(tabTitles.value[0])

    provide('selectedTitle', selectedTitle)

    return {
      tabTitles,
      selectedTitle
    }
  }
}
</script>

<template>
  <div class="tabs">
    <ul class="tabs__header">
      <li
        v-for="title in tabTitles"
        :key="title"
        :class="title === selectedTitle ? 'active' : ''"
        @click="selectedTitle = title"
      >
        {{ title }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<style scoped lang="scss">
@import './../assets/css/variables';
.tabs {
  &__header {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    border-bottom: 2px solid $c-green;

    li {
      width: 100%;
      text-align: center;
      padding: 12px 24px;
      background-color: $c-gray--dark;
      cursor: pointer;
      font-size: 24px;
      transition: background-color 0.3s ease;
      &.active {
        background-color: $c-green;
      }
    }
  }
}
</style>
