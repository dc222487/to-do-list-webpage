// dom.js
import { projects, addProject, addTodoToProject, getProjectTodos } from './logic.js';
import { saveToLocalStorage } from './storage.js';

const projectListContainer = document.getElementById('project-list');
const todoListContainer = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const projectForm = document.getElementById('project-form');

let activeProjectId = null;

// Renders the list of all projects
function renderProjects(projectsData) {
  projectListContainer.innerHTML = '';
  projectsData.forEach(project => {
    const btn = document.createElement('button');
    btn.textContent = project.name;
    btn.classList.add('project-button');
    btn.dataset.projectId = project.id;

    btn.addEventListener('click', () => {
      activeProjectId = project.id;
      renderTodos(getProjectTodos(project.id));
    });

    projectListContainer.appendChild(btn);
  });
}

// Renders the todos for the selected project
function renderTodos(todos) {
  todoListContainer.innerHTML = '';

  todos.forEach(todo => {
    const card = document.createElement('div');
    card.classList.add('todo-card');
    card.style.borderLeft = `5px solid ${priorityColor(todo.priority)}`;

    card.innerHTML = `
      <h3>${todo.title}</h3>
      <p>Due: ${todo.dueDate}</p>
      <button class="expand-btn">Details</button>
      <button class="delete-btn">Delete</button>
    `;

    card.querySelector('.expand-btn').addEventListener('click', () => {
      alert(`Description: ${todo.description}\nPriority: ${todo.priority}\nNotes: ${todo.notes}`);
    });

    card.querySelector('.delete-btn').addEventListener('click', () => {
      deleteTodo(todo.id);
    });

    todoListContainer.appendChild(card);
  });
}

// Maps priority to color
function priorityColor(priority) {
  switch (priority.toLowerCase()) {
    case 'high': return 'red';
    case 'medium': return 'orange';
    case 'low': return 'green';
    default: return 'gray';
  }
}

// Adds new todo to current project
function setupTodoForm() {
  todoForm.addEventListener('submit', e => {
    e.preventDefault();

    const title = todoForm.elements['title'].value;
    const description = todoForm.elements['description'].value;
    const dueDate = todoForm.elements['due-date'].value;
    const priority = todoForm.elements['priority'].value;
    const notes = todoForm.elements['notes'].value;

    if (!activeProjectId) return;

    addTodoToProject(activeProjectId, [title, description, dueDate, priority, notes]);
    saveToLocalStorage(projects);
    renderTodos(getProjectTodos(activeProjectId));
    todoForm.reset();
  });
}

// Adds new project
function setupProjectForm() {
  projectForm.addEventListener('submit', e => {
    e.preventDefault();

    const name = projectForm.elements['project-name'].value;
    const project = addProject(name);
    saveToLocalStorage(projects);
    renderProjects(projects);
    projectForm.reset();
  });
}

// Deletes a todo
function deleteTodo(todoId) {
  const project = projects.find(p => p.id === activeProjectId);
  if (!project) return;

  project.todos = project.todos.filter(todo => todo.id !== todoId);
  saveToLocalStorage(projects);
  renderTodos(project.todos);
}

// Call these during app startup
function initializeDom() {
  setupProjectForm();
  setupTodoForm();
  renderProjects(projects);
}

export { renderProjects, renderTodos, initializeDom };
