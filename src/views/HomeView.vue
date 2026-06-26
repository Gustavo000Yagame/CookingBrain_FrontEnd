<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import CardTop from '../components/CardTop.vue'
import CardTop2 from '../components/cardTop2.vue'
import CardTop3 from '../components/CardTop3.vue'
import Feedback from '../components/Feedback.vue'
import imgMascote from '../assets/mascote.png'
import { supabase } from '@/services/supabase'

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  console.log(data.session)
})
</script>

<template>
  <main class="page">
    <Navbar />

    <div class="content">
      <img :src="imgMascote" class="mascote-img" alt="Mascote CookingBrain" />

      <div class="feedback-section">
        <CardTop />
        <CardTop2 />
        <CardTop3 />
      </div>
    </div>

    <section class="feedback-row">
      <Feedback
        authorTag="Chef Carlos"
        text="Revolucionou a gestão do meu restaurante. Controle total em um só lugar!"
        date="Jun 24"
        :comments="12"
        :viewers="20"
      />
      <Feedback
        authorTag="Maria Lima"
        text="Nunca foi tão fácil acompanhar pedidos e estoque. Recomendo muito!"
        date="Jun 20"
        :comments="8"
        :viewers="15"
      />
      <Feedback
        authorTag="João Padeiro"
        text="O suporte é excelente e o sistema é muito intuitivo. Vale cada centavo."
        date="Jun 15"
        :comments="5"
        :viewers="10"
      />
    </section>

    <Footer />
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px 16px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.feedback-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  width: 100%;
}

.mascote-img {
  width: 100%;
  max-width: 280px;
  height: auto;
}

.feedback-row {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  padding: 24px 16px 40px;
}

@media (min-width: 768px) {
  .content {
    flex-direction: row;
    padding: 40px;
    align-items: center;
    gap: 40px;
  }

  .feedback-section {
    flex-direction: row;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 0;
  }

  .mascote-img {
    max-width: 420px;
    flex-shrink: 0;
  }

  .feedback-row {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    padding: 40px;
    gap: 24px;
  }
}

@media (min-width: 1024px) {
  .mascote-img {
    max-width: 520px;
  }
}
</style>
