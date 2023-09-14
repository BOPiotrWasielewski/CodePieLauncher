<script setup>
import router from '../router'

function submit(e) {
  e.preventDefault()
  window.electron.ipcRenderer.send('ms-account')
}
window.electron.ipcRenderer.on('ms-account-reply', (event, user) => {
  if (user.logged_in) {
    window.localStorage.setItem('logged_in', 'true')
    window.localStorage.setItem('type', 'online')
    window.localStorage.setItem('nickname', user.nickname)
    window.localStorage.setItem('token', user.token)
    window.localStorage.setItem('uuid', user.uuid)
    router.push('panel')
  } else {
    alert('Nie udało się zalogować, spróbuj ponownie za chwile')
  }
})
</script>

<template>
  <form @submit="submit">
    <input type="submit" value="Zaloguj z Microsoft" class="button" />
  </form>
</template>

<style scoped lang="scss">
@import './../assets/css/variables';
@import './../assets/css/buttons';
form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  input[type='submit'] {
    width: 100%;
    height: 300px;
  }
}
</style>
