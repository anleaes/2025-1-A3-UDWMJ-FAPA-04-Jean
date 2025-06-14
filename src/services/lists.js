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

function listProfessoresService() {
    const { list, getById,  post, update, remove } = useApi('professores')

    return {
        list, 
        getById,
        post,
        update,
        remove
    }
}

function listSalasService() {
    const { list, getById,  post, update, remove } = useApi('salas')

    return {
        list, 
        getById,
        post,
        update,
        remove
    }
}

function listTurmasService() {
    const { list, getById,  post, update, remove } = useApi('turmas')

    return {
        list, 
        getById,
        post,
        update,
        remove
    }
}

export { listAlunosService, listProfessoresService, listSalasService, listTurmasService }