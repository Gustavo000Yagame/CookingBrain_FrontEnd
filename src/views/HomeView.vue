<template>
  <main class="page">
    <Navbar />
    <div class="content">
      <img :src="imgMascote" class="mascote-img" />
      <Feedback />  
    </div>
    <Footer />
  </main>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import imgMascote from "../assets/mascote.png";
import Feedback from "../components/Feedback.vue";

export default {
  name: "HomeView",
  components: {
    Navbar,
    Footer,
    Feedback,
  },
  data() {
    return {
      imgMascote,
    };
  },
};
</script>
<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 40px;
  padding: 40px;
}

.mascote-img {
  width: 100%;
  max-width: 800px;
  height: auto;
  margin-left: 50px;
}
</style>
