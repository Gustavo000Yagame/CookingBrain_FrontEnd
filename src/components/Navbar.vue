<template>
  <nav class="bg-white fixed w-full z-50 top-0 border-b border-default">
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pl-0 pr-4 py-4"
    >
      <router-link to="/" class="flex items-center space-x-3 pl-0">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5904/5904002.png"
          class="h-7"
        />
        <span class="text-xl font-semibold text-heading"> CookingBrain </span>
      </router-link>

      <div class="flex md:order-2 space-x-3 items-center">
        <button
          @click="goToLogin"
          :disabled="isLoading"
          class="text-black bg-brand hover:bg-brand-strong font-medium rounded-base text-sm px-3 py-2 disabled:opacity-50"
        >
          Iniciar Sessão
        </button>
        <button
          @click="toggleMenu"
          class="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-base hover:bg-neutral-secondary-soft"
        >
          ☰
        </button>
      </div>

      <div v-if="isLoading" class="loading-overlay">
        <Loading />
      </div>

      <div
        :class="[
          'w-full md:flex md:w-auto md:order-1',
          open ? 'block' : 'hidden',
        ]"
      >
        <ul
          class="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0 mt-4 md:mt-0 font-medium"
        >
          <li>
            <router-link
              to="/"
              class="block py-2 text-brand md:text-fg-brand"
              @click="onNavLinkClick"
            >
              Home
            </router-link>
          </li>

          <li>
            <router-link
              to="/about"
              class="block py-2 text-heading hover:text-fg-brand"
              @click="onNavLinkClick"
            >
              Sobre
            </router-link>
          </li>

          <li>
            <router-link
              to="/services"
              class="block py-2 text-heading hover:text-fg-brand"
              @click="onNavLinkClick"
            >
              Serviços
            </router-link>
          </li>

          <li>
            <router-link
              to="/contact"
              class="block py-2 text-heading hover:text-fg-brand"
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

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Loading from "@/components/Loading.vue";

export default {
  name: "Navbar",
  components: {
    Loading,
  },
  setup() {
    const open = ref(false);
    const isLoading = ref(false);
    const router = useRouter();

    const toggleMenu = () => {
      open.value = !open.value;
    };

    const onNavLinkClick = () => {
      // fecha menu mobile após navegar
      open.value = false;
    };

    const goToLogin = async () => {
      if (isLoading.value) return;
      isLoading.value = true;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      isLoading.value = false;
      router.push("/login");
    };

    return {
      open,
      isLoading,
      toggleMenu,
      goToLogin,
      onNavLinkClick,
    };
  },
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
}
</style>
