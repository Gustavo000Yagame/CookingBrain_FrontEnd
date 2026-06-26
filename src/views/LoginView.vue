<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginForm from '@/components/LoginForm.vue'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const isLoading = ref(false)

const onLoginSubmit = async (data: { email: string; pass: string }) => {
  isLoading.value = true
  try {
    await auth.signIn(data.email, data.pass)
    const redirect = (route.query.redirect as string) ?? '/dashboard'
    router.push(redirect)
  } catch (error: any) {
    alert(`Erro no login: ${error.message}`)
  } finally {
    isLoading.value = false
  }
}

const onGoogleSubmit = async () => {
  try {
    await auth.signInWithGoogle()
  } catch (error: any) {
    alert(`Erro ao conectar com Google: ${error.message}`)
  }
}
</script>

<template>
  <LoginForm
    :is-loading="isLoading"
    @login="onLoginSubmit"
    @google-login="onGoogleSubmit"
  />
</template>
