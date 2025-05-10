export const projectValidator = {
    title: {
        notEmpty: true,
        errorMessage: 'Please enter a project title!'
    },
    overview: {
        notEmpty: true,
        errorMessage: 'Please enter a project overview!'
    },
    deadline: {
        isDate: true,
        errorMessage: 'Please enter a date as a deadline!'
    }
}