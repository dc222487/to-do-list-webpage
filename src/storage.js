function saveToLocalStorage(data) {
  localStorage.setItem('todoProjects', JSON.stringify(data));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem('todoProjects');
  return data ? JSON.parse(data) : null;
}

export { saveToLocalStorage, loadFromLocalStorage };
