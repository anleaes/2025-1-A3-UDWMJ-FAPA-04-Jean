<template>
    <q-page padding>
        <div>
        <h4><b>Página de Adição de Salas</b></h4>
        <h6>Preencha os campos necessários para adicionar um sala.</h6>
        </div>
        <q-form
            @submit="onSubmit"
            class="row q-col-gutter-sm"
        >
            <q-input
                outlined
                v-model="form.numero"
                label="Número"
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório.']"
            />
            <q-input
                outlined
                v-model="form.localizacao"
                label="Localização"
                lazy-rules
                class="col-lg-6 col-xs-12"
            />  
            <div class="col-12 q-gutter-sm">
                <q-btn label="Cancelar" color="negative" class="float-right" icon="cancel" :to="{ name: 'salas' }"/>
                <q-btn label="Salvar" color="primary" class="float-right" icon="save" type="submit"/>
            </div>
        </q-form>
    </q-page>
</template>


<script>
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import { listSalasService } from "../services/lists.js"

export default defineComponent({
    nome: 'FormSala',
    setup() {
        const { post, getById, update } = listSalasService()
        const $q = useQuasar()
        const router = useRouter()
        const route = useRoute()
        const form = ref({
            numero: '',
            localizacao: ''
        })

        onMounted( async () => {
            if (route.params.id) {
                getSala(route.params.id)
            }
        })

        const getSala = async (id) => {
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
                    $q.notify({ message: 'Sala editada com sucesso!', icon: 'check', color: 'positive' })
                } else {
                    await post(form.value)
                    $q.notify({ message: 'Sala criada com sucesso!', icon: 'check', color: 'positive' })
                }
                router.push({ name: 'salas' })
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