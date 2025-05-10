export const userValidator = {
    email: {
        isEmail: true,
        errorMessage: 'Please enter an email!'
    },
    fullName: {
        notEmpty: true,
        errorMessage: 'Please provide a fullName'
    }
}