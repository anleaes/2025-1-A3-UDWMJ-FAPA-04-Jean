import useApi from 'src/composables/useApi'

function listAlunosService() {
    const { list, post, update, remove } = useApi('alunos')

    return {
        list, 
        post,
        update,
        remove
    }
}

export default listAlunosService
