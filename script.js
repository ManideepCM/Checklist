const taskForm = document.querySelector('#task-form')
const taskInput = document.querySelector('#task-input')
const taskList = document.querySelector('#task-list')

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const task = taskInput.value
  if (task === '') {
    alert('Please Enter Any Task !')
    return
  }

  const li = document.createElement('li')
  li.appendChild(document.createTextNode(task))
  const button = createButton('remove-item btn-link text-red')

  li.appendChild(button)

  taskList.appendChild(li)
  taskInput.value = ''
})

function createButton(classes) {
  const button = document.createElement('button')
  button.className = classes
  const icon = createIcon('fa-solid fa-xmark')
  button.appendChild(icon)
  return button
}

function createIcon(classes) {
  const icon = document.createElement('i')
  icon.className = classes
  return icon
}
