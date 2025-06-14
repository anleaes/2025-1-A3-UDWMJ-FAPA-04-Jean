<template>
    <q-page padding>
        <div>
        <h4><b>Página de Adição de Professores</b></h4>
        <h6>Preencha os campos necessários para adicionar um professor.</h6>
        </div>
        <q-form
            @submit="onSubmit"
            class="row q-col-gutter-sm"
        >
            <q-input
                outlined
                v-model="form.nome"
                label="Nome"
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório.']"
            />
            <q-input
                outlined
                v-model="form.sobrenome"
                label="Sobrenome"
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório.']"  
            />  
            <q-input
                outlined
                v-model="form.genero"
                label="Gênero"
                hint="Escolha entre H, M ou O."
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório.']"
            />
            <q-input
                outlined
                v-model="form.anoNascimento"
                label="Ano de Nascimento"
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório.']"
            />
            <q-input
                outlined
                v-model="form.especializacao"
                label="Especialização"
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório.']"
            />
            <div class="col-12 q-gutter-sm">
                <q-btn label="Cancelar" color="negative" class="float-right" icon="cancel" :to="{ name: 'professores' }"/>
                <q-btn label="Salvar" color="primary" class="float-right" icon="save" type="submit"/>
            </div>
        </q-form>
    </q-page>
</template>


<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import { listProfessoresService } from "../services/lists.js"

export default defineComponent({
    nome: 'FormProfessor',
    setup() {
        const { post, getById, update } = listProfessoresService()
        const $q = useQuasar()
        const router = useRouter()
        const route = useRoute()
        const form = ref({
            nome: '',
            sobrenome: '',
            genero: '',
            anoNascimento: '',
            especializacao: ''
        })

        onMounted( async () => {
            if (route.params.id) {
                getProfessor(route.params.id)
            }
        })

        const getProfessor = async (id) => {
            try {
                const response = await getById(id)
                form.value = response
            } catch (error) {
                console.error(error)
            }
        }

        const onSubmit = async () => {
            try {
                if (form.value.id) {
                    await update(form.value)
                    $q.notify({ message: 'Professor editado com sucesso!', icon: 'check', color: 'positive' })
                } else {
                    await post(form.value)
                    $q.notify({ message: 'Professor criado com sucesso!', icon: 'check', color: 'positive' })
                }
                router.push({ name: 'professores' })
            } catch (error) {
                console.error(error)
            }
        }

        return {
            form,
            onSubmit
        }
    }
})
</script>

<style scoped>
div {
  text-align: center;
}
</style>