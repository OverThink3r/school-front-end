export const filterSubjects = (studentSubjects, allSubjects) => {
  const studentSubjectsIds = studentSubjects.map(el => el.subject.id)
  return allSubjects.filter(subject => !studentSubjectsIds.includes(subject.id))

}