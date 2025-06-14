<template>
    <q-page padding>
        <div>
        <h4><b>Crie uma conta</b></h4>
        <h6>Preencha os campos necessários para se cadastrar.</h6>
        </div>
        <q-form class="row q-col-gutter-sm">
            <q-input
                outlined
                v-model="email"
                label="E-mail"
                lazy-rules
                class="col-lg-6 col-xs-12"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório.']"
            />
            <q-input
                outlined
                v-model="password"
                label="Senha"
                lazy-rules
                class="col-lg-6 col-xs-12"
                filled type="password"
                :rules="[ val => val && val.length > 0 || 'Campo Obrigatório.']"  
            />  
            <div class="col-12 q-gutter-sm">
                <q-btn label="Logar com Google" color="info" class="float-right" icon="G" @click="signInWithGoogle"/>
                <q-btn label="Cadastrar" color="primary" class="float-right" icon="save" @click="register"/>
            </div>
        </q-form>
    </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => { // eslint-disable-line
        console.log("Você cadastrou-se com sucesso!")
        console.log(auth.currentUser)
        router.push('/')
    })
    .catch((error) => {
        console.log(error.code)
        alert(error.message)
    })
}

const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(getAuth(), provider) 
    .then((result) => {
        console.log(result.user);
        router.push("/")
    })
    .catch((error) => {
        console.error(error)
    })
}

</script>

<style scoped>
div {
  text-align: center;
}
</style>