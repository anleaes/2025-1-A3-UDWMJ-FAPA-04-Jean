<template>
    <q-page padding>
        <div>
        <h4><b>Página de Login</b></h4>
        <h6>Preencha os campos necessários para fazer login.</h6>
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
                <q-btn label="Login" color="primary" class="float-right" icon="save" @click="login"/>
            </div>
            <p v-if="errMgs">{{ errMgs }}</p>
        </q-form>
    </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const errMgs = ref()
const auth = getAuth()

const login = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => { // eslint-disable-line
        console.log("Você logou-se com sucesso!")
        console.log(auth.currentUser)
        router.push('/')
    })
    .catch((error) => {
        console.log(error.code)
        switch (error.code) {
            case "auth/invalid-email":
                errMgs.value = "E-mail inválido."
                break
            case "auth/user-not-found":
                errMgs.value = "Nenhuma conta com esse e-mail foi encontrada."
                break
            case "auth/wrong-password":
                errMgs.value = "Senha Incorreta."
                break
            default:
                errMgs.value = "E-mail ou senha incorretas."
                break
        }
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