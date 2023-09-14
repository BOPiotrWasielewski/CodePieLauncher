<script>
import Slider from 'vue3-slider'
export default {
  components: {
    Slider
  },
  async setup() {
    const si = require('systeminformation')

    const ramInfo = await si.mem()
    const ramTotal = Math.round(ramInfo.total / 1024 / 1024 / 1024)
    const ramFree = Math.round(ramInfo.free / 1024 / 1024 / 1024)
    const allocatedRam = window.localStorage.getItem('allocatedRam')

    return {
      ramTotal,
      ramFree,
      allocatedRam
    }
  },
  data() {
    return {
      value: this.allocatedRam
    }
  },
  methods: {
    update(value) {
      window.localStorage.setItem('allocatedRam', value)
    }
  }
}
</script>

<template>
  <div class="memoryManager">
    <label>Pamięć RAM</label>
    <div class="memoryManager__slider">
      <Slider
        v-model="value"
        :max="ramTotal"
        :min="2"
        trackColor="#424242"
        color="#5C9C2A"
        handleScale="3"
        alwaysShowHandle="true"
        @change="update"
      />
    </div>
    <div class="memoryManager__info">
      <label>Maksymalnie: <span>{{ ramTotal }} GB</span></label>
      <label>Dostępne: <span>{{ ramFree }} GB</span></label>
      <label>Wybrano: <span>{{ value }} GB</span></label>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/css/variables';
.memoryManager {
  &__slider {
    padding: 16px;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    label {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    span {
      display: block;
      width: max-content;
      background-color: $c-gray;
      padding: 8px;
      border-radius: 8px;
    }
  }
}
</style>
