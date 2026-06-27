<template>
  <footer class="w-full">
    <div class="max-w-[1160px] mx-auto px-6 py-8 md:px-12">
      
      <p class="pt-5 text-center font-bold  text-gray-500">
        Copyright {{ currentYear }} © CookingBrain. Todos os direitos reservados.
      </p>

    </div>
  </footer>
</template>
<script setup>
const currentYear = new Date().getFullYear()
</script>