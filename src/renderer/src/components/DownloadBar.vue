<script>
export default {
  data() {
    return {
      title: '',
      current: 1,
      total: 1
    }
  },
  mounted() {
    window.electron.ipcRenderer.on('progress-update', (event, _title, _current, _total) => {
      this.title = _title
      this.current = _current
      this.total = _total
    })
  }
}
</script>

<template>
  <div
    v-if="title"
    class="downloadBar"
    :style="{ '--bar-width': parseInt((current / total) * 100) + '%' }"
  >
    <span>{{ title }} ({{ current }} / {{ total }})</span>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/variables';
.downloadBar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 32px;
  background-color: $c-gray--dark;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    max-width: var(--bar-width);
    height: 100%;
    background-color: $c-green;
    transition: max-width 0.5s ease;
  }

  span {
    position: absolute;
    top: 50%;
    width: 100%;
    text-align: center;
    transform: translateY(-50%);
  }
}
</style>
