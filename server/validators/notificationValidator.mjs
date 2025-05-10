export const notificationValidator = {
    title: {
        notEmpty: true,
        errorMessage: 'Please provide a title!'
    },
    content: {
        notEmpty: true,
        errorMessage: 'Please privde a content for notifications!'
    }
}