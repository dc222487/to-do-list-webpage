// logic.js
import createProject from './project';
import createTodo from './todo';

let projects = [];

function addProject(name) {
  const project = createProject(name);
  projects.push(project);
  return project;
}

function addTodoToProject(projectId, todoData) {
  const project = projects.find(p => p.id === projectId);
  if (project) {
    project.todos.push(createTodo(...todoData));
  }
}

function getProjectTodos(projectId) {
  return projects.find(p => p.id === projectId)?.todos || [];
}

export { addProject, addTodoToProject, getProjectTodos, projects };
