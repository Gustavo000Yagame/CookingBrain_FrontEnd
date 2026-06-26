<style scoped>
.task {
  position: relative;
  color: #2e2e2f;
  cursor: default;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
  margin-bottom: 1rem;
  border: 3px dashed transparent;
  max-width: 350px;
}

.task:hover {
  box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
  border-color: rgba(162, 179, 207, 0.2) !important;
}

.task p {
  font-size: 15px;
  margin: 1.2rem 0;
}

.tag {
  border-radius: 100px;
  padding: 4px 13px;
  font-size: 12px;
  color: #ffffff;
  background-color: #1389eb;
}

.tags {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.options {
  background: transparent;
  border: 0;
  color: #c4cad3;
  font-size: 17px;
  cursor: pointer;
}

.options svg {
  fill: #9fa4aa;
  width: 20px;
}

.stats {
  position: relative;
  width: 100%;
  color: #9fa4aa;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stats div {
  height: 20px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.stats svg {
  margin-right: 5px;
  height: 100%;
  stroke: #9fa4aa;
}

.viewer {
  display: flex;
  align-items: center;
}

.viewer span {
  height: 30px;
  width: 30px;
  background-color: rgb(28, 117, 219);
  margin-right: -10px;
  border-radius: 50%;
  border: 1px solid #fff;
  display: grid;
  align-items: center;
  text-align: center;
  font-weight: bold;
  color: #fff;
  padding: 2px;
}

.viewer span svg {
  stroke: #fff;
}
</style>

<template>
  <div class="task">
    <div class="tags">
      <span class="tag">{{ props.authorTag }}</span>
      <button class="options" aria-label="Opções">
        <svg viewBox="0 0 41.915 41.916" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M11.214,20.956c0,3.091-2.509,5.589-5.607,5.589C2.51,26.544,0,24.046,0,20.956c0-3.082,2.511-5.585,5.607-5.585C8.705,15.371,11.214,17.874,11.214,20.956z"/>
            <path d="M26.564,20.956c0,3.091-2.509,5.589-5.606,5.589c-3.097,0-5.607-2.498-5.607-5.589c0-3.082,2.511-5.585,5.607-5.585C24.056,15.371,26.564,17.874,26.564,20.956z"/>
            <path d="M41.915,20.956c0,3.091-2.509,5.589-5.607,5.589c-3.097,0-5.606-2.498-5.606-5.589c0-3.082,2.511-5.585,5.606-5.585C39.406,15.371,41.915,17.874,41.915,20.956z"/>
          </g>
        </svg>
      </button>
    </div>
    <p>{{ props.text }}</p>
    <div class="stats">
      <div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-width="2" d="M12 8V12L15 15"/>
            <circle stroke-width="2" r="9" cy="12" cx="12"/>
          </svg>
          {{ props.date }}
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M16 10H16.01M12 10H12.01M8 10H8.01M3 10C3 4.64706 5.11765 3 12 3C18.8824 3 21 4.64706 21 10C21 15.3529 18.8824 17 12 17C11.6592 17 11.3301 16.996 11.0124 16.9876L7 21V16.4939C4.0328 15.6692 3 13.7383 3 10Z"/>
          </svg>
          {{ props.comments }}
        </div>
      </div>
      <div class="viewer">
        <span v-for="i in 3" :key="i">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke-width="2" stroke="#ffffff" d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"/>
            <path stroke-linecap="round" stroke-width="2" stroke="#ffffff" d="M3 21C3.95728 17.9237 6.41998 17 12 17C17.58 17 20.0427 17.9237 21 21"/>
          </svg>
        </span>
        <span>+{{ props.viewers }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  authorTag?: string
  text?: string
  date?: string
  comments?: number
  viewers?: number
}>(), {
  authorTag: 'Cliente',
  text: 'Excelente sistema! Facilitou muito a gestão do nosso negócio.',
  date: 'Jun 26',
  comments: 18,
  viewers: 20
})
</script>
