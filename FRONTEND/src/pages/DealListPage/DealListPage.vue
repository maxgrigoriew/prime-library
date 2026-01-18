<script setup lang="ts">

import {UiButton, UiInput} from "@/ui";
import {dealListFeature} from "@/entities/deals/features/dealListFeature.ts";
import {onMounted} from "vue";
import InfinityTableComposition from '@/ui/UiTable/InfinityTableComposition.vue'

defineOptions({
  name: 'DealListPage'
})

const { dealListData, loadDealList } = dealListFeature()


onMounted( () => {
  loadDealList()
})
</script>

<template>
  <div class="flex gap-12 flex-col">
    <div class="flex items-center justify-between font-medium gap-12">
      <div class="text-2xl">Список сделок</div>
      <UiButton>Создать сделку</UiButton>
    </div>

    <div class="flex gap-12">
      <UiInput class="w-50%" placeholder="Поиск по организации"/>
      <UiInput class="w-50%" placeholder="Поиск по сделке"/>
    </div>

    <div>Список фильтров...</div>
    <InfinityTableComposition>
      <template #header>
        <th class="col-num">Номер сделки</th>
        <th class="col-client">ИНН и название клиента</th>
        <th class="col-date">Дата создания</th>
        <th class="col-date">Плановая дата заключения договора</th>
        <th class="col-date">Фактическая дата заключения договора</th>
        <th class="col-services">Услуги</th>
        <th class="col-stage">Этап сделки</th>
        <th class="col-date">Дата тендера</th>
        <th class="col-name">Наименование сделки</th>
      </template>

      <template #body>
        <tr v-for="row in dealListData.list" :key="row.id">
          <td>{{row.id}}</td>
          <td>{{row.inn}}</td>
          <td>{{row.inn}}</td>
          <td>{{row.inn}}</td>
          <td>{{row.inn}}</td>
          <td>{{row.inn}}</td>
          <td>{{row.inn}}</td>
          <td>{{row.inn}}</td>
          <td>{{row.created}}</td>
        </tr>
      </template>

      <template #footer>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum ipsam minus nemo quisquam voluptatibus? Dolores exercitationem fuga ipsa molestiae nemo odit officiis possimus quidem, quisquam reiciendis tempora tenetur vel voluptatibus.

      </template>
    </InfinityTableComposition>
  </div>
</template>

<style scoped>

</style>