<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/services/supabase'
import Loading from '@/components/Loading.vue'

const open = ref(false)
const isLoading = ref(false)
const isLoggedIn = ref(false)
const router = useRouter()

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  isLoggedIn.value = !!data.session

  supabase.auth.onAuthStateChange((_event, session) => {
    isLoggedIn.value = !!session
  })
})

const toggleMenu = () => {
  open.value = !open.value
}

const onNavLinkClick = () => {
  open.value = false
}

const goToLogin = () => {
  router.push('/login')
}

const logout = async () => {
  isLoading.value = true
  await supabase.auth.signOut()
  isLoading.value = false
  router.push('/')
}
</script>

<template>
  <nav class="bg-white fixed w-full z-50 top-0 border-b border-gray-200">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-4">
      <router-link to="/" class="flex items-center space-x-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5904/5904002.png"
          class="h-7"
          alt="Logo CookingBrain"
        />
        <span class="text-xl font-semibold text-gray-800">CookingBrain</span>
      </router-link>

      <div class="flex md:order-2 space-x-3 items-center">
        <button
          v-if="!isLoggedIn"
          @click="goToLogin"
          class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
        >
          Iniciar Sessão
        </button>
        <template v-else>
          <router-link
            to="/dashboard"
            class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 transition-colors"
          >
            Dashboard
          </router-link>
          <button
            @click="logout"
            :disabled="isLoading"
            class="text-gray-700 hover:text-red-600 font-medium text-sm px-3 py-2 transition-colors disabled:opacity-50"
          >
            {{ isLoading ? '...' : 'Sair' }}
          </button>
        </template>

        <button
          @click="toggleMenu"
          class="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg hover:bg-gray-100"
          :aria-expanded="open"
          aria-label="Menu de navegação"
        >
          <span v-if="!open">☰</span>
          <span v-else>✕</span>
        </button>
      </div>

      <div
        :class="['w-full md:flex md:w-auto md:order-1', open ? 'block' : 'hidden']"
      >
        <ul class="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 mt-4 md:mt-0 font-medium">
          <li>
            <router-link
              to="/"
              class="block py-2 text-blue-600 md:text-blue-600"
              @click="onNavLinkClick"
              active-class="text-blue-600 font-semibold"
            >
              Home
            </router-link>
          </li>
          <li>
            <router-link
              to="/about"
              class="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              @click="onNavLinkClick"
            >
              Sobre
            </router-link>
          </li>
          <li>
            <router-link
              to="/services"
              class="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              @click="onNavLinkClick"
            >
              Serviços
            </router-link>
          </li>
          <li>
            <router-link
              to="/contact"
              class="block py-2 text-gray-700 hover:text-blue-600 transition-colors"
              @click="onNavLinkClick"
            >
              Contato
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
