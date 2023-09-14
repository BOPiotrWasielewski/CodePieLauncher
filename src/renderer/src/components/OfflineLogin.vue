<script setup>
import router from "../router";

const auth = require('@xmcl/user')

function submit(e) {
  e.preventDefault()
  const nicknameInput = e.target.querySelector('input[name="nickname"]')

  if (nicknameInput.value.length === 0) {
    alert('Podaj prawidłowe dane')
  } else {
    let player = auth.offline(nicknameInput.value)
    window.localStorage.setItem('logged_in', 'true')
    window.localStorage.setItem('type', 'offline')
    window.localStorage.setItem('nickname', player.selectedProfile.name)
    window.localStorage.setItem('token', player.accessToken)
    window.localStorage.setItem('uuid', player.selectedProfile.id)
    router.push('panel')
  }
}
</script>

<template>
  <form @submit="submit">
    <label for="nickname">Nickname:</label>
    <input id="nickname" type="text" name="nickname" required />
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
  input[type='text'] {
    border: none;
    border-left: 8px solid $c-green;
    outline: none;
    padding: 12px 8px;
    font-size: 18px;
  }
  input[type='submit'] {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>
