<template>
  <q-page padding>
    <div>
    <h4><b>Página de Gerenciamento de Turmas</b></h4>
    <h6>Adicione, edite e exclua turmas.</h6>
    </div>
    <q-table
      title="Turmas"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top-right>
          <q-btn color="primary" label="Adicionar Turma" :to="{ name: 'formTurma' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm"> 
          <q-btn icon="edit" color="info" size="sm" @click="handleEditTurma(props.row.id)"/>
          <q-btn icon="delete" color="negative" size="sm" @click="handleDeleteTurma(props.row.id)"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { listTurmasService } from "../services/lists.js"


export default defineComponent({
  name: 'TurmasPage',
  setup() {
    const rows = ref([])
    const router = useRouter()
    const { list, remove } = listTurmasService()
    const columns = [
      { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left' },
      { name: 'nome', field: 'nome', label: 'Nome', sortable: true, align: 'left' },
      { name: 'maxAlunos', field: 'maxAlunos', label: 'Máximo de Alunos', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: "right" },
    ]
    const $q = useQuasar()

    onMounted(() => {
      getTurmas()
    })

    const getTurmas = async () => {
      try {
        const data = await list()
        rows.value = data
      } catch (error) {
        console.error(error)
      }
    }
    //TO DO: CONSERTAR  EXCLUSÃO
    const handleDeleteTurma = async (id) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: 'Deseja deletar esta turma?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id) 
          $q.notify({ message: 'Turma apagada com sucesso!', icon: 'check', color: 'positive' })
          await getTurmas()
        })
      } catch (error) { // eslint-disable-line
        $q.notify({ message: 'Erro ao apagar turma', icon: 'close', color: 'negative' })
      }
    }

    const handleEditTurma = async (id) => {
      router.push({ name: 'formTurma', params: { id } })
    }

    return { 
      rows,
      columns, 
      handleDeleteTurma,
      handleEditTurma 
    }
  }
})
</script>

<style scoped>
div {
  text-align: center;
}
</style>