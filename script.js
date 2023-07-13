const taskForm = document.querySelector('#task-form')
const taskInput = document.querySelector('#task-input')
const taskList = document.querySelector('#task-list')
const clearAll = document.querySelector('#clear')
const filter = document.querySelector('#filter')

function addTask(e) {
  e.preventDefault()
  const task = taskInput.value
  if (task === '') {
    alert('Please Enter Any Task !')
    return
  }

  const li = document.createElement('li')
  li.appendChild(document.createTextNode(task))
  const button = createButton('remove-task btn-link text-red')

  li.appendChild(button)

  taskList.appendChild(li)
  checkUI()
  taskInput.value = ''
}

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

function removeTask(e) {
  if (e.target.parentElement.classList.contains('remove-task')) {
    e.target.parentElement.parentElement.remove()
  }
  checkUI()
}

function clear() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  checkUI()
}

function checkUI() {
  const tasks = document.querySelectorAll('li')
  if (tasks.length === 0) {
    clearAll.style.display = 'none'
    filter.style.display = 'none'
  } else {
    clearAll.style.display = 'block'
    filter.style.display = 'block'
  }
}

function filterAll(e) {
  const tasks = document.querySelectorAll('li')
  const task = e.target.value.toLowerCase()
  tasks.forEach((t) => {
    const availableTasks = t.firstChild.textContent.toLowerCase()
    if (availableTasks.indexOf(task) != -1) {
      t.style.display = 'flex'
    } else {
      t.style.display = 'none'
    }
  })
}

taskForm.addEventListener('submit', addTask)
taskList.addEventListener('click', removeTask)
clearAll.addEventListener('click', clear)
filter.addEventListener('input', filterAll)

checkUI()
