<template>
  <footer class="w-full">
    <div class="max-w-[1160px] mx-auto px-6 py-8 md:px-12">

      <div
        class="flex flex-col md:flex-row justify-between gap-10 border-b border-gray-300 pb-10"
      >
        <div class="max-w-sm">
          <img
            alt="Logo"
            class="h-11"
            src="https://cdn-icons-png.flaticon.com/512/10415/10415308.png"
          />
          <p class="mt-4 text-sm text-gray-600 leading-relaxed">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>

          <div class="flex items-center gap-2 mt-4">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
              alt="Google Play"
              class="h-10 w-auto"
            />
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
              alt="App Store"
              class="h-10 w-auto"
            />
          </div>
        </div>
        <div class="flex gap-12 md:gap-24">
          <div>
            <h2 class="font-bold text-gray-800 mb-5">
              Company
            </h2>

            <ul class="text-sm space-y-2 text-gray-600">
              <li>
                <a href="#" class="hover:text-black transition-colors">
                  Home
                </a>
              </li>

              <li>
                <a href="#" class="hover:text-black transition-colors">
                  Serviços
                </a>
              </li>

              <li>
                <a href="#" class="hover:text-black transition-colors">
                  Sobre
                </a>
              </li>

              <li>
                <a href="#" class="hover:text-black transition-colors">
                  Política
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="font-bold text-gray-800 mb-5">
              Contatos
            </h2>

            <div class="text-sm space-y-2 text-gray-600">
              <p>+55 (48) 99689-6276</p>
              <p>cookbg@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p class="pt-5 text-center text-sm text-gray-500">
        Copyright {{ currentYear }} © CookingBrain. Todos os direitos reservados.
      </p>

    </div>
  </footer>
</template>
<script setup>
const currentYear = new Date().getFullYear()
</script>