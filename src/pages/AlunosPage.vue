<template>
  <q-page padding>
    <div>
    <h4><b>Página de Gerenciamento de Alunos</b></h4>
    <h6>Adicione, edite e exclua alunos.</h6>
    </div>
    <q-table
      title="Alunos"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
     <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="delete" color="negative" size="sm" @click="handleDeleteAluno(props.row.id)"/>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import listAlunosService from "../services/lists.js"


export default defineComponent({
  name: 'AlunosPage',
  setup() {
    const rows = ref([])
    const { list, remove } = listAlunosService()
    const columns = [
      { name: 'nome', field: 'nome', label: 'Nome', sortable: true, align: 'left' },
      { name: 'sobrenome', field: 'sobrenome', label: 'Sobrenome', sortable: true, align: 'left' },
      { name: 'genero', field: 'genero', label: 'Gênero', sortable: true, align: 'left' },
      { name: 'anoNascimento', field: 'anoNascimento', label: 'Ano de Nascimento', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: "right" },
    ]
    const $q = useQuasar()

    onMounted(() => {
      getAlunos()
    })

    const getAlunos = async () => {
      try {
        const data = await list()
        rows.value = data
      } catch (error) {
        console.error(error)
      }
    }

    const handleDeleteAluno = async (id) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: 'Deseja deletar este aluno?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(id) 
          $q.notify({ message: 'Aluno apagado com sucesso!', icon: 'check', color: 'positive' })
          await getAlunos()
        })
      } catch (error) { // eslint-disable-line
        $q.notify({ message: 'Erro ao apagar aluno', icon: 'close', color: 'negative' })
      }
    }

    return { 
      rows,
      columns, 
      handleDeleteAluno 
    }
  }
})
</script>

<style scoped>
div {
  text-align: center;
}
</style>