import useApi from 'src/composables/useApi'

function listAlunosService() {
    const { list, getById,  post, update, remove } = useApi('alunos')

    return {
        list, 
        getById,
        post,
        update,
        remove
    }
}

export default listAlunosService
