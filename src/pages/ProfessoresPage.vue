<template>
  <q-page padding>
    <div>
    <h4><b>Página de Gerenciamento de Professores</b></h4>
    <h6>Adicione, edite e exclua Professores.</h6>
    </div>
    <q-table
      title="Professores"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:top-right>
          <q-btn color="primary" label="Adicionar Professor" :to="{ name: 'formProfessor' }" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm"> 
          <q-btn icon="edit" color="info" size="sm" @click="handleEditProfessor(props.row.id)"/>
          <q-btn icon="delete" color="negative" size="sm" @click="handleDeleteProfessor(props.row.id)"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { listProfessoresService } from "../services/lists.js"


export default defineComponent({
  name: 'ProfessoresPage',
  setup() {
    const rows = ref([])
    const router = useRouter()
    const { list, remove } = listProfessoresService()
    const columns = [
      { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'left' },
      { name: 'nome', field: 'nome', label: 'Nome', sortable: true, align: 'left' },
      { name: 'sobrenome', field: 'sobrenome', label: 'Sobrenome', sortable: true, align: 'left' },
      { name: 'genero', field: 'genero', label: 'Gênero', sortable: true, align: 'left' },
      { name: 'anoNascimento', field: 'anoNascimento', label: 'Ano de Nascimento', sortable: true, align: 'left' },
      { name: 'especializacao', field: 'especializacao', label: 'Especialização', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: "right" },
    ]
    const $q = useQuasar()

    onMounted(() => {
      getProfessores()
    })

    const getProfessores = async () => {
      try {
        const data = await list()
        rows.value = data
      } catch (error) {
        console.error(error)
      }
    }
    //TO DO: CONSERTAR  EXCLUSÃO
    const handleDeleteProfessor = async (id) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: 'Deseja deletar este professor?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id) 
          $q.notify({ message: 'Professor apagado com sucesso!', icon: 'check', color: 'positive' })
          await getProfessores()
        })
      } catch (error) { // eslint-disable-line
        $q.notify({ message: 'Erro ao apagar professor', icon: 'close', color: 'negative' })
      }
    }

    const handleEditProfessor = async (id) => {
      router.push({ name: 'formProfessor', params: { id } })
    }

    return { 
      rows,
      columns, 
      handleDeleteProfessor,
      handleEditProfessor
    }
  }
})
</script>

<style scoped>
div {
  text-align: center;
}
</style>