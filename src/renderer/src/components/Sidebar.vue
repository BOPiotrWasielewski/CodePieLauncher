<script>
import router from '../router'

export default {
  setup() {
    const type = window.localStorage.getItem('type')
    const nickname = window.localStorage.getItem('nickname')
    const token = window.localStorage.getItem('token')
    const uuid = window.localStorage.getItem('uuid')
    const avatarUrl =
      type === 'online'
        ? `https://mc-heads.net/avatar/${nickname}/100/nohelm.png`
        : 'https://mc-heads.net/avatar/Steve/100/nohelm.png'

    return {
      type,
      nickname,
      token,
      uuid,
      avatarUrl
    }
  },
  methods: {
    logout() {
      window.localStorage.removeItem('logged_in')
      window.localStorage.removeItem('type')
      window.localStorage.removeItem('nickname')
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('uuid')
      router.push('/')
    },
    settings() {
      router.push('/settings')
    }
  }
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__user">
      <img :src="avatarUrl" width="100" height="100" />
      <span>{{ nickname }}</span>
    </div>
    <div class="sidebar__buttons">
      <button class="button button--logout" @click="logout">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="none"
            stroke="#5C9C2A"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12h-9.5m7.5 3l3-3l-3-3m-5-2V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-1"
          />
        </svg>
        Wyloguj
      </button>
      <button class="button button--settings" @click="settings">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="#5C9C2A"
            d="M13.875 22h-3.75q-.375 0-.65-.25t-.325-.625l-.3-2.325q-.325-.125-.613-.3t-.562-.375l-2.175.9q-.35.125-.7.025t-.55-.425L2.4 15.4q-.2-.325-.125-.7t.375-.6l1.875-1.425Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L2.65 9.9q-.3-.225-.375-.6t.125-.7l1.85-3.225q.175-.35.537-.438t.713.038l2.175.9q.275-.2.575-.375t.6-.3l.3-2.325q.05-.375.325-.625t.65-.25h3.75q.375 0 .65.25t.325.625l.3 2.325q.325.125.613.3t.562.375l2.175-.9q.35-.125.7-.025t.55.425L21.6 8.6q.2.325.125.7t-.375.6l-1.875 1.425q.025.175.025.338v.674q0 .163-.05.338l1.875 1.425q.3.225.375.6t-.125.7l-1.85 3.2q-.2.325-.563.438t-.712-.013l-2.125-.9q-.275.2-.575.375t-.6.3l-.3 2.325q-.05.375-.325.625t-.65.25Zm-1.825-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Z"
          />
        </svg>
        Ustawienia
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import './../assets/css/variables';
@import './../assets/css/buttons';
.sidebar {
  width: 100%;
  height: calc(100vh - 50px);
  background-color: $c-gray--dark;
  position: relative;

  &__user {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 58px;

    img {
      border: 2px solid $c-green;
      border-radius: 50%;
    }

    span{
      margin-top: 16px;
    }
  }

  &__buttons {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    bottom: 32px;

    button {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      font-size: 16px;
      padding: 8px;

      svg path {
        transition: fill 0.3s ease, stroke 0.3s ease;
      }
    }

    .button {
      &--settings {
        &:hover {
          svg path {
            fill: $c-gray--dark;
          }
        }
      }
      &--logout {
        &:hover {
          svg path {
            fill: $c-green;
            stroke: $c-gray--dark;
          }
        }
      }
    }
  }
}
</style>
