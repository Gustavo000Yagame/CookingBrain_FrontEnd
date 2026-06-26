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

    <!-- Funcionalidades -->
    <section id="funcionalidades" class="features">
      <div class="features-inner">
        <h2 class="section-title">O que o CookingBrain faz por você</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </div>
            <h3>Dashboard em tempo real</h3>
            <p>Acompanhe faturamento, pedidos e desempenho sem precisar abrir relatórios.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </div>
            <h3>Gestão de pedidos</h3>
            <p>Da entrada ao fechamento, acompanhe cada pedido por status em tempo real.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
            </div>
            <h3>Relatórios de vendas</h3>
            <p>Histórico diário, semanal e mensal com gráficos claros para embasar decisões.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3>Cadastro de clientes</h3>
            <p>Mantenha o histórico de quem frequenta seu estabelecimento.</p>
          </div>
        </div>
      </div>
    </section>

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

.hero-image {
  flex-shrink: 0;
}
.hero-image img {
  width: 100%;
  max-width: 420px;
  height: auto;
  display: block;
}

/* Features */
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

/* Responsive */
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
