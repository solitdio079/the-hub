export const commentSchema = {
    content: {
        notEmpty: true,
        errorMessage: 'Please provide a content!'
    },
    postId: {
        notEmpty: true,
        errorMessage: 'Please provide a post id!'
    },
}

