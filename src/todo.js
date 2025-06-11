// todo.js
export default function createTodo(title, description, dueDate, priority, notes = '', checklist = []) {
  return {
    id: Date.now(), // unique ID
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    completed: false,
  };
}
