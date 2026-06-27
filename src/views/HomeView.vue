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
          <a class="btn-ghost" href="#funcionalidades">Saiba mais</a>
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

.btn-ghost {
  background: none;
  color: #475569;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  transition: border-color 0.15s, color 0.15s;
}
.btn-ghost:hover { border-color: #94a3b8; color: #1e293b; }


.features {
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  padding: 64px 32px;
}

.features-inner {
  max-width: 1160px;
  margin: 0 auto;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 36px;
  letter-spacing: -0.3px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.feature-card {
  background: #fff;
  border: 1px solid #e8eaf0;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
}

.feature-card h3 {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.feature-card p {
  font-size: 13px;
  color: #64748b;
  line-height: 1.6;
}

.hero-image img {
  max-width: 550px; 
  width: 100%;
  height: auto;
}

@media (max-width: 900px) {
  .hero { flex-direction: column; padding: 48px 24px 40px; gap: 32px; }
  .hero-image img { max-width: 260px; }
  .feature-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .feature-grid { grid-template-columns: 1fr; }
  .hero-image { display: none; }
}
</style>
