const formatDate = (inputDate) => {
  inputDate.setDate(inputDate.getDate() + 1)
  const date = inputDate.getDate().toString().padStart(2, '0')
  const month = (inputDate.getMonth() + 1).toString().padStart(2, '0')
  const year = inputDate.getFullYear().toString()

  return `${date}/${month}/${year}`
}
export {
  formatDate
}