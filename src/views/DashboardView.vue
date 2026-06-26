<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const auth = useAuthStore()
const router = useRouter()

const userEmail = computed(() => auth.user?.email ?? 'Usuário')
const userInitial = computed(() => userEmail.value.charAt(0).toUpperCase())

const handleLogout = async () => {
  await auth.signOut()
  router.push('/')
}
</script>

<template>
  <main class="min-h-screen flex flex-col bg-gray-50">
    <Navbar />

    <div class="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
      <!-- Header do Dashboard -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p class="text-gray-500 text-sm mt-1">Bem-vindo de volta, {{ userEmail }}</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
            {{ userInitial }}
          </div>
          <button
            @click="handleLogout"
            class="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      <!-- Cards de estatísticas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <p class="text-sm text-gray-500">Pedidos hoje</p>
          <p class="text-3xl font-bold text-gray-800 mt-1">—</p>
          <p class="text-xs text-gray-400 mt-2">Em breve</p>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <p class="text-sm text-gray-500">Receita do mês</p>
          <p class="text-3xl font-bold text-gray-800 mt-1">—</p>
          <p class="text-xs text-gray-400 mt-2">Em breve</p>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <p class="text-sm text-gray-500">Clientes ativos</p>
          <p class="text-3xl font-bold text-gray-800 mt-1">—</p>
          <p class="text-xs text-gray-400 mt-2">Em breve</p>
        </div>
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <p class="text-sm text-gray-500">Estoque crítico</p>
          <p class="text-3xl font-bold text-gray-800 mt-1">—</p>
          <p class="text-xs text-gray-400 mt-2">Em breve</p>
        </div>
      </div>

      <!-- Placeholder de conteúdo -->
      <div class="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
        <div class="text-5xl mb-4">🍳</div>
        <h2 class="text-xl font-semibold text-gray-700 mb-2">Seu ERP está pronto!</h2>
        <p class="text-gray-400 text-sm max-w-md mx-auto">
          O dashboard completo com pedidos, estoque, relatórios e muito mais está sendo construído. 
          Fique atento às atualizações!
        </p>
      </div>
    </div>

    <Footer />
  </main>
</template>
