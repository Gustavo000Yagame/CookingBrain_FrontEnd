<script setup lang="ts">
const restaurante = {
  nome: 'CookingBrain Restaurant',
  endereco: 'Rua das Flores, 123 - Centro',
  telefone: '(11) 99999-0000',
  categoria: 'Fast Casual',
  horario: 'Segunda a Sábado · 11h às 23h',
}
</script>

<template>
  <div class="page">
    <h1 class="page-title">Restaurante</h1>

    <section class="card">
      <div class="card-header">
        <div>
          <p class="eyebrow">Configuração do negócio</p>
          <h2>{{ restaurante.nome }}</h2>
        </div>
        <span class="pill">Ativo</span>
      </div>

      <div class="info-grid">
        <div>
          <label>Categoria</label>
          <p>{{ restaurante.categoria }}</p>
        </div>
        <div>
          <label>Endereço</label>
          <p>{{ restaurante.endereco }}</p>
        </div>
        <div>
          <label>Telefone</label>
          <p>{{ restaurante.telefone }}</p>
        </div>
        <div>
          <label>Horário</label>
          <p>{{ restaurante.horario }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 20px; }
.page-title { font-size: 20px; font-weight: 700; color: #0f172a; }
.card { background: #fff; border: 1px solid #e8eaf0; border-radius: 12px; padding: 20px; }
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 4px; }
.pill { padding: 6px 10px; border-radius: 999px; background: #dcfce7; color: #166534; font-size: 12px; font-weight: 600; }
.info-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.info-grid label { display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
.info-grid p { margin: 0; color: #334155; font-size: 14px; }
@media (max-width: 640px) { .info-grid { grid-template-columns: 1fr; } }
</style>
