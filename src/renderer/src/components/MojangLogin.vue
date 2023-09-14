<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
  data() {
    return {
      v$: useValidate(),
      email: '',
      password: ''
    }
  },
  methods: {
    submitForm() {
      this.v$.$validate()
      if (!this.v$.$error) {
        window.electron.ipcRenderer.send('mojang-account', this.email, this.password)
      } else alert('Uzupełnij prawidłowo dane')
    }
  },
  validations() {
    return {
      email: { required },
      password: { required }
    }
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <label for="email">Email:</label>
    <input id="email" v-model="email" type="email" name="email" required />
    <label for="password">Hasło:</label>
    <input id="password" v-model="password" type="password" name="password" required />
    <input type="submit" value="Zaloguj" class="button" />
  </form>
</template>

<style scoped lang="scss">
@import './../assets/css/variables';
@import './../assets/css/buttons';
form {
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  label {
    margin-bottom: 12px;
    font-size: 20px;
  }
  input[type='email'],
  input[type='password'] {
    border: none;
    border-left: 8px solid $c-green;
    outline: none;
    padding: 12px 8px;
    font-size: 18px;
    margin-bottom: 24px;
  }
  input[type='submit'] {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>
