<template>
  <main class="page">
    <Navbar />
    <div class="content">
      <img :src="imgMascote" class="mascote-img" />
      <div class="feedback-section">
        <Feedback />
        <Caderno />
      </div>
    </div>
    <Footer />
  </main>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import imgMascote from "../assets/mascote.png";
import Feedback from "../components/Feedback.vue";
import Caderno from "../components/Caderno.vue";

export default {
  name: "HomeView",
  components: {
    Navbar,
    Footer,
    Feedback,
    Caderno,
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

.feedback-section {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  margin-top: 200px;
}

.mascote-img {
  width: 100%;
  max-width: 800px;
  height: auto;
  margin-left: 50px;
  margin-top: 100px;
}
</style>
