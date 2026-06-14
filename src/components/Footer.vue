<template>
  <footer class="px-6 pt-8 md:px-16 lg:px-36 w-full text-gray-300">
    <div
      class="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-10"
    >
      <div class="md:max-w-96">
        <img
          alt="Logo"
          class="h-11"
          src="https://cdn-icons-png.flaticon.com/512/10415/10415308.png"
        />
        <p class="mt-6 text-sm">
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </p>
        <div class="flex items-center gap-2 mt-4">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
            alt="Google Play"
            class="h-10 w-auto border border-white rounded"
          />
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
            alt="App Store"
            class="h-10 w-auto border border-white rounded"
          />
        </div>
      </div>
      <div class="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
        <div>
          <h2 class="font-bold text-gray-800 mb-5">Company</h2>
          <ul class="text-sm space-y-2 text-gray-600"> 
            <li><a href="#" class="transition-all hover:text-black hover:font-bold">Home</a></li> 
            <li><a href="#" class="transition-all hover:text-black hover:font-bold">Serviços</a></li> 
            <li><a href="#" class="transition-all hover:text-black hover:font-bold">Sobre</a></li> 
            <li><a href="#" class="transition-all hover:text-black hover:font-bold">política</a></li> 
          </ul>
        </div>

        <div>
          <h2 class="font-bold text-gray-800 mb-5">Contatos</h2>

          <div class="text-sm space-y-2">
            <p class="hover:text-black hover:font-bold">+55-48-99689-6276</p>
            <p class="hover:text-black hover:font-bold">cookbg@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
    <p class="pt-4 text-center text-sm pb-5">
      Copyright {{ currentYear }} ©
      <a href="https://prebuiltui.com" target="_blank"> PrebuiltUI </a>. All
      Rights Reserved.
    </p>
  </footer>
</template>
<script setup>
const currentYear = new Date().getFullYear();
</script>
