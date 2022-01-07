import { App } from "./app.js"

const newApp = new App();

document.addEventListener("DOMContentLoaded", () => {
  newApp.init()
});

// Task Form
const taskForm = document.querySelector("#getTask");
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskForm["title"].value;
  const description = taskForm["description"].value;
  newApp.createTask(title, description);
});
