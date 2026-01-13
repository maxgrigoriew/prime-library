<template>
  <Story title="UiDataTable" :layout="{ type: 'grid', width: 'min-content' }">
    <Variant title="Basic DataTable">
      <div class="w-full">
        <UiDataTable 
          :value="basicData" 
          :columns="basicColumns"
          striped-rows
        />
      </div>
    </Variant>

    <Variant title="Sortable DataTable">
      <div class="w-full">
        <UiDataTable 
          :value="sortableData" 
          :columns="sortableColumns"
          striped-rows
        />
      </div>
    </Variant>

    <Variant title="DataTable with Selection">
      <div class="w-full">
        <UiDataTable 
          :value="basicData" 
          :columns="basicColumns"
          selection-mode="single"
          striped-rows
          @row-select="onRowSelect"
          @row-unselect="onRowUnselect"
        />
      </div>
    </Variant>
  </Story>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UiDataTable from '@/ui/UiDataTable/UiDataTable.vue'

const basicData = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
  { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' },
  { id: 4, name: 'Patricia Lebsack', username: 'Karianne', email: 'Julianne.OConner@kory.org' },
  { id: 5, name: 'Chelsey Dietrich', username: 'Kamren', email: 'Lucio_Hettinger@annie.ca' }
]

const basicColumns = [
  { field: 'id', header: 'ID' },
  { field: 'name', header: 'Name' },
  { field: 'username', header: 'Username' },
  { field: 'email', header: 'Email' }
]

const sortableData = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv' },
  { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net' },
  { id: 4, name: 'Patricia Lebsack', username: 'Karianne', email: 'Julianne.OConner@kory.org' },
  { id: 5, name: 'Chelsey Dietrich', username: 'Kamren', email: 'Lucio_Hettinger@annie.ca' }
]

const sortableColumns = [
  { field: 'id', header: 'ID', sortable: true },
  { field: 'name', header: 'Name', sortable: true },
  { field: 'username', header: 'Username', sortable: true },
  { field: 'email', header: 'Email', sortable: true }
]

const onRowSelect = (data: any) => {
  console.log('Row selected:', data)
}

const onRowUnselect = (data: any) => {
  console.log('Row unselected:', data)
}
</script>