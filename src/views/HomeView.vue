<template>
  <main class="page">
    <Navbar />

    <div class="content">
      <img :src="imgMascote" class="mascote-img" alt="Mascote" />

      <div class="feedback-section">
        <CardTop />
        <CardTop2 />
        <CardTop3 />
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
import CardTop from "../components/CardTop.vue";
import CardTop2 from "../components/cardTop2.vue";
import CardTop3 from "../components/CardTop3.vue";

export default {
  name: "HomeView",
  components: {
    Navbar,
    Footer,
    Feedback,
    CardTop,
    Caderno,
    CardTop2,
    CardTop3,
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
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 24px;
  padding: 24px 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.feedback-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: stretch;
  margin-top: 0;
}

.mascote-img {
  width: 100%;
  max-width: 420px;
  height: auto;
  margin-left: 0;
  margin-top: 0;
}

@media (min-width: 768px) {
  .content {
    padding: 40px;
    align-items: center;
    gap: 40px;
  }

  .feedback-section {
    margin-top: 200px;
    flex-direction: row;
    gap: 30px;
  }

  .mascote-img {
    max-width: 800px;
    margin-left: 50px;
    margin-top: 100px;
  }
}

@media (min-width: 1024px) {
  .content {
    padding-left: 40px;
    padding-right: 40px;
  }
}
</style>
