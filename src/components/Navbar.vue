<template>
  <nav
    class="bg-neutral-primary fixed w-full z-20 top-0 border-b border-default"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <router-link to="/" class="flex items-center space-x-3">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5904/5904002.png"
          class="h-7"
        />
        <span class="text-xl font-semibold text-heading"> CookingBrain </span>
      </router-link>

      <div class="flex md:order-2 space-x-3">
        <router-link
          to="/login"
          class="text-black bg-brand hover:bg-brand-strong font-medium rounded-base text-sm px-3 py-2"
        >
          Iniciar Sessão
        </router-link>

        <button
          @click="toggleMenu"
          class="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-base hover:bg-neutral-secondary-soft"
        >
          ☰
        </button>
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
            <router-link to="/" class="block py-2 text-brand md:text-fg-brand">
              Home
            </router-link>
          </li>

          <li>
            <router-link
              to="/about"
              class="block py-2 text-heading hover:text-fg-brand"
            >
              Sobre
            </router-link>
          </li>

          <li>
            <router-link
              to="/services"
              class="block py-2 text-heading hover:text-fg-brand"
            >
              Serviços
            </router-link>
          </li>

          <li>
            <router-link
              to="/contact"
              class="block py-2 text-heading hover:text-fg-brand"
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
export default {
  name: "Navbar",
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggleMenu() {
      this.open = !this.open;
    },
  },
};
</script>
