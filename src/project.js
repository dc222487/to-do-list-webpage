// project.js
export default function createProject(name) {
  return {
    id: Date.now(),
    name,
    todos: []
  };
}
