<template>
  <div class="demo-container">
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
<!--    <div class="demo-section">-->
<!--      <h2>1. Проблема: Тултип мерцает</h2>-->
<!--      <p>При показе тултип сначала появляется в (0,0), потом прыгает в нужную позицию</p>-->

<!--      <BadTooltip label="Наведи на меня (проблема)">-->
<!--        <template #content>-->
<!--          Я сначала появляюсь сверху слева, потом прыгаю сюда!-->
<!--        </template>-->
<!--      </BadTooltip>-->
<!--    </div>-->
<!-- -->


    <UiTestTooltip>
      <template #trigger>
        <UiButton>Наведи на меня</UiButton>
      </template>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa dolore eligendi fugiat odio quaerat repellat sed tenetur ullam? Blanditiis cum eos eveniet harum, impedit ipsa magni molestias pariatur quis ullam?
    </UiTestTooltip>
<!--    <div class="demo-section">-->
<!--      <h2>2. Решение: visibility: hidden</h2>-->
<!--      <p>Сначала скрываем тултип, считаем позицию, потом показываем</p>-->

<!--      <GoodTooltip label="Наведи на меня (решение)">-->
<!--        <template #content>-->
<!--          Я сразу появляюсь в правильном месте!-->
<!--        </template>-->
<!--      </GoodTooltip>-->
<!--    </div>-->

<!--    <div class="demo-section">-->
<!--      <h2>3. Решение: requestAnimationFrame</h2>-->
<!--      <p>Показываем в следующем кадре анимации</p>-->

<!--      <BetterTooltip label="Наведи на меня (requestAnimationFrame)">-->
<!--        <template #content>-->
<!--          Самый плавный вариант!-->
<!--        </template>-->
<!--      </BetterTooltip>-->
<!--    </div>-->

<!--    <div class="debug-info">-->
<!--      <h3>Отладочная информация:</h3>-->
<!--      <div class="debug-logs">-->
<!--        <div v-for="(log, index) in logs" :key="index" :class="log.type">-->
<!--          {{ log.message }}-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup>
import {ref} from 'vue'
import BadTooltip from "@/ui/UiTestTooltip/BadTooltip.vue";
import GoodTooltip from "@/ui/UiTestTooltip/GoodTooltip.vue";
import BetterTooltip from "@/ui/UiTestTooltip/BetterTooltip.vue";
import UiTooltip from "@/ui/UiTooltip/UiTooltip.vue";
import UiButton from "@/ui/UiButton/UiButton.vue";
import UiTestTooltip from "@/ui/UiTestTooltip/UiTestTooltip.vue";

const logs = ref([])

const logMessage = (message, type = 'info') => {
  logs.value.unshift({
    message: `[${new Date().toLocaleTimeString()}] ${message}`,
    type
  })

  // Ограничиваем лог 10 сообщениями
  if (logs.value.length > 10) {
    logs.value = logs.value.slice(0, 10)
  }
}

const resetAll = () => {
  logs.value = []
  logMessage('Все сброшено', 'reset')
}
</script>

<style>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
  font-family: system-ui, -apple-system, sans-serif;
}

.demo-section {
  margin: 40px 0;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}

.controls {
  margin-bottom: 20px;
}

.debug-info {
  margin-top: 40px;
  padding: 20px;
  background: #1f2937;
  color: white;
  border-radius: 8px;
}

.debug-logs {
  max-height: 200px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 12px;
}

.debug-logs div {
  padding: 4px 8px;
  margin: 2px 0;
  border-radius: 4px;
}

.debug-logs .info {
  background: #3b82f6;
}

.debug-logs .warning {
  background: #f59e0b;
}

.debug-logs .error {
  background: #ef4444;
}

.debug-logs .success {
  background: #10b981;
}

.debug-logs .reset {
  background: #8b5cf6;
}

body {
  @apply h-[3000px];
}
</style>