<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/services/supabase";
import LoginForm from "@/components/LoginForm.vue";
import Loading from "@/components/Loading.vue";

const router = useRouter();
const isLoading = ref(false);

const onLoginSubmit = async (data: { email: string; pass: string }) => {
  isLoading.value = true;
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.pass,
    });
    
    if (error) throw error;
    
    router.push("/dashboard"); 
  } catch (error: any) {
    alert(`Erro no login: ${error.message}`);
  } finally {
    isLoading.value = false;
  }
};

const onGoogleSubmit = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
  } catch (error: any) {
    alert(`Erro ao conectar com Google: ${error.message}`);
  }
};
</script>

<template>
  <div v-if="isLoading" class="loading-overlay">
    <Loading />
  </div>
  <LoginForm
    v-else
    :is-loading="isLoading"
    @login="onLoginSubmit"
    @google-login="onGoogleSubmit"
  />
</template>

<style scoped>
.loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f7;
}
</style>
