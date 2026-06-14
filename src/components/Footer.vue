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
          <h2 class="font-semibold mb-5">Company</h2>

          <ul class="text-sm space-y-2">
            <li><a href="#" color="black">Home</a></li>
            <li><a href="#" color="black">Serviços</a></li>
            <li><a href="#" color="black">Sobre</a></li>
            <li><a href="#" color="black">política</a></li>
          </ul>
        </div>

        <div>
          <h2 class="font-semibold mb-5">Get in touch</h2>

          <div class="text-sm space-y-2">
            <p>+1-234-567-890</p>
            <p>contact@example.com</p>
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
