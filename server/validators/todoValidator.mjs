export const todoValidator = {
    content: {
        notEmpty: true,
        errorMessage: 'Please provide a content!'
    },
    isDone: {
        isBoolean: true,
        errorMessage: 'Please give a valid done!'
    },
    projectId: {
        notEmpty: true,
        errorMessage: 'Please provide a valid projectId!'
    }
}