<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import imgMascote from '../assets/mascote.png'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="home">
    <Navbar />

    <main class="hero">
      <div class="hero-text">
        <p class="hero-eyebrow">Sistema de Gestão para Restaurantes</p>
        <h1 class="hero-headline">
          Controle total do<br />
          seu negócio
        </h1>
        <p class="hero-body">
          Pedidos, estoque, faturamento e desempenho em um painel simples e direto.
          Desenvolvido para quem trabalha com comida de verdade.
        </p>
        <div class="hero-actions">
          <button class="btn-primary" @click="router.push('/login')">
            Acessar o sistema
          </button>
        </div>
      </div>
      <div class="hero-image">
        <img :src="imgMascote" alt="CookingBrain" />
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.hero {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 48px;
  max-width: 1160px;
  margin: 0 auto;
  padding: 80px 32px 64px;
  width: 100%;
}

.hero-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero-eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #3b82f6;
}

.hero-headline {
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 800;
  color: #0f172a;
  line-height: 1.1;
  letter-spacing: -1px;
}

.hero-body {
  font-size: 16px;
  color: #64748b;
  line-height: 1.7;
  max-width: 460px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.btn-primary {
  background: #2563eb;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-primary:hover { background: #1d4ed8; }

.hero-image img {
  max-width: 600px;
  width: 100%;
  height: auto;
}

@media (max-width: 900px) {
  .hero { flex-direction: column; padding: 48px 24px 40px; gap: 32px; }
  .hero-image img { max-width: 260px; }
}

@media (max-width: 560px) {
  .hero-image { display: none; }
}
</style>
