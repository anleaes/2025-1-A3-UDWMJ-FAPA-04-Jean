<template>
  <q-page padding>
    <div>
    <h4><b>Página de Gerenciamento de Salas</b></h4>
    <h6>Adicione, edite e exclua salas.</h6>
    </div>
    <q-table
      title="Salas"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top-right>
          <q-btn color="primary" label="Adicionar Sala" :to="{ name: 'formSala' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm"> 
          <q-btn icon="edit" color="info" size="sm" @click="handleEditSala(props.row.id)"/>
          <q-btn icon="delete" color="negative" size="sm" @click="handleDeleteSala(props.row.id)"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { listSalasService } from "../services/lists.js"


export default defineComponent({
  name: 'SalasPage',
  setup() {
    const rows = ref([])
    const router = useRouter()
    const { list, remove } = listSalasService()
    const columns = [
      { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left' },
      { name: 'numero', field: 'numero', label: 'Número', sortable: true, align: 'left' },
      { name: 'localizacao', field: 'localizacao', label: 'Localização', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: "right" },
    ]
    const $q = useQuasar()

    onMounted(() => {
      getSalas()
    })

    const getSalas = async () => {
      try {
        const data = await list()
        rows.value = data
      } catch (error) {
        console.error(error)
      }
    }
    //TO DO: CONSERTAR  EXCLUSÃO
    const handleDeleteSala = async (id) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: 'Deseja deletar esta sala?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id) 
          $q.notify({ message: 'Sala apagada com sucesso!', icon: 'check', color: 'positive' })
          await getSalas()
        })
      } catch (error) { // eslint-disable-line
        $q.notify({ message: 'Erro ao apagar sala', icon: 'close', color: 'negative' })
      }
    }

    const handleEditSala = async (id) => {
      router.push({ name: 'formSala', params: { id } })
    }

    return { 
      rows,
      columns, 
      handleDeleteSala,
      handleEditSala 
    }
  }
})
</script>

<style scoped>
div {
  text-align: center;
}
</style>