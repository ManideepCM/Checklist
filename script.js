const taskForm = document.querySelector('#task-form')
const taskInput = document.querySelector('#task-input')
const taskList = document.querySelector('#task-list')
const clearAll = document.querySelector('#clear')
const filter = document.querySelector('#filter')
const formBtn = taskForm.querySelector('button')
let editingTask = false

function displayTasks() {
  const tasksFromStorage = getTaskFromStorage()
  tasksFromStorage.forEach((task) => addToDOM(task))
  checkUI()
}

function addTask(e) {
  e.preventDefault()
  const task = taskInput.value
  if (task === '') {
    alert('Please Enter Any Task !')
    return
  }
  // Check Edit Mode
  if (editingTask == true) {
    const currentTask = taskList.querySelector('.edit-mode')
    removeTaskFromStorage(currentTask.innerText)
    currentTask.classList.remove('edit-mode')
    currentTask.remove()
    editingTask = false
  } else {
    if (taskExists(task)) {
      alert('Already Exists!')
      return
    }
  }
  addToDOM(task)
  addToLocalStorage(task)
  checkUI()
  taskInput.value = ''
}

function addToDOM(task) {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(task))
  const button = createButton('remove-task btn-link text-green')

  li.appendChild(button)

  taskList.appendChild(li)
}

function addToLocalStorage(task) {
  let localStorageTasks = getTaskFromStorage()
  localStorageTasks.push(task)

  // Stringify the array
  localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}

function createButton(classes) {
  const button = document.createElement('button')
  button.className = classes
  const icon = createIcon('fa-solid fa-check')
  button.appendChild(icon)
  return button
}

function createIcon(classes) {
  const icon = document.createElement('i')
  icon.className = classes
  return icon
}

function getTaskFromStorage() {
  let localStorageTasks
  if (localStorage.getItem('tasks') === null) {
    localStorageTasks = []
  } else {
    localStorageTasks = JSON.parse(localStorage.getItem('tasks'))
  }
  return localStorageTasks
}

function onClickTask(e) {
  if (e.target.parentElement.classList.contains('remove-task')) {
    removeTask(e.target.parentElement.parentElement)
  } else {
    editTask(e.target)
  }
}

function editTask(task) {
  editingTask = true
  taskList
    .querySelectorAll('li')
    .forEach((i) => i.classList.remove('edit-mode'))
  task.classList.add('edit-mode')
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Task'
  formBtn.style.backgroundColor = '#228b22'
  taskInput.value = task.textContent
}

function taskExists(task) {
  const allTasks = getTaskFromStorage()
  if (allTasks.includes(task)) {
    return true
  }
  return false
}

function removeTask(task) {
  if (confirm('Are You Sure ? ')) {
    // Remove task from DOM
    task.remove()
    // Remove Task from LocalStorage
    removeTaskFromStorage(task.textContent)

    checkUI()
  }
}

function removeTaskFromStorage(task) {
  let localStorageTasks = getTaskFromStorage()
  localStorageTasks = localStorageTasks.filter((t) => t !== task)
  localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
}

function clear() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild)
  }
  // Remove From local storage as well
  localStorage.removeItem('tasks')
  checkUI()
}

function checkUI() {
  taskInput.value = ''
  const tasks = document.querySelectorAll('li')
  if (tasks.length === 0) {
    clearAll.style.display = 'none'
    filter.style.display = 'none'
  } else {
    clearAll.style.display = 'block'
    filter.style.display = 'block'
  }
  editingTask = false
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Task'
  formBtn.style.backgroundColor = '#333'
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
taskList.addEventListener('click', onClickTask)
clearAll.addEventListener('click', clear)
filter.addEventListener('input', filterAll)
document.addEventListener('DOMContentLoaded', displayTasks)

checkUI()
