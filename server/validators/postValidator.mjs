export const postValidator = {
  title: {
    notEmpty: true,
    errorMessage: 'Title should not be empty!',
  },
  content: {
    notEmpty: true,
    errorMessage: 'Invalid content field!',
  },

  tags: {
    notEmpty: true,
    errorMessage: 'Category should not be empty!',
  },
  images: {
    escape: true,
    errorMessage: 'Images not an array!',
  },
}