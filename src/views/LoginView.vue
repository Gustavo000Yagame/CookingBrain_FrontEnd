<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const login = () => {
  console.log('Email:', email.value)
  console.log('Senha:', password.value)

  // Aqui você conecta com sua API/Supabase depois
}
</script>

<template>
  <div class="login-container">
    <form class="form" @submit.prevent="login">
      <h1 class="title">Entrar</h1>

      <div class="flex-column">
        <label>E-mail</label>
      </div>

      <div class="inputForm">
        <input
          v-model="email"
          placeholder="Digite seu e-mail"
          class="input"
          type="email"
          required
        />
      </div>

      <div class="flex-column">
        <label>Senha</label>
      </div>

      <div class="inputForm">
        <input
          v-model="password"
          placeholder="Digite sua senha"
          class="input"
          type="password"
          required
        />
      </div>

      <div class="flex-row">
        <div>
          <input type="checkbox" />
          <label>Lembrar de mim</label>
        </div>

        <span class="span">Esqueceu a senha?</span>
      </div>

      <button class="button-submit" type="submit">
        Entrar
      </button>

      <p class="p">
        Não possui uma conta?
        <span class="span">Cadastre-se</span>
      </p>

      <p class="p line">Ou continue com</p>

      <div class="flex-row">
        <button type="button" class="btn">
          Google
        </button>

        <button type="button" class="btn">
          Apple
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
  padding: 20px;
}

.title {
  text-align: center;
  color: #22c55e;
  margin-bottom: 15px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  padding: 30px;
  width: 450px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.flex-column > label {
  color: #151717;
  font-weight: 600;
}

.inputForm {
  border: 1.5px solid #ecedec;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  transition: 0.2s ease-in-out;
}

.inputForm:focus-within {
  border: 1.5px solid #22c55e;
}

.input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
}

.flex-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-row label {
  margin-left: 5px;
  font-size: 14px;
}

.span {
  font-size: 14px;
  color: #22c55e;
  cursor: pointer;
  font-weight: 600;
}

.button-submit {
  margin-top: 15px;
  background: #22c55e;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  height: 50px;
  cursor: pointer;
  transition: 0.2s;
}

.button-submit:hover {
  transform: translateY(-2px);
}

.p {
  text-align: center;
  font-size: 14px;
  color: #444;
}

.line {
  margin-top: 10px;
}

.btn {
  margin-top: 10px;
  width: 48%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  background: white;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
}

.btn:hover {
  border-color: #22c55e;
}
</style>