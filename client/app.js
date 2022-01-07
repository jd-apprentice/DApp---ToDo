// Clase App
export class App {
  contracts = {};
  async init() {
    await this.loadWeb3();
    await this.loadAccount();
    await this.loadContract();
    await this.renderTask();
    await this.render();
  }

  // Verificar si el usuario tiene una billetera
  async loadWeb3() {
    if (window.ethereum) {
      this.web3Provider = window.ethereum;
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else if (web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("Usted no tiene una billetera");
    }
  }

  // Obtener la cuenta del usuario
  async loadAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    this.account = accounts[0];
  }

  // Cargar el contrato
  async loadContract() {
    try {
      const res = await fetch("ToDoContract.json");
      const ToDoContractJSON = await res.json();
      this.contracts.ToDoContract = TruffleContract(ToDoContractJSON);
      this.contracts.ToDoContract.setProvider(this.web3Provider);

      this.ToDoContract = await this.contracts.ToDoContract.deployed();
    } catch (error) {
      console.error(error);
    }
  }

  // Renderizar la billetera
  async render() {
    document.querySelector("#wallet").innerText = this.account;
  }

  // Renderizar la tarea
  async renderTask() {
    const contador = await this.ToDoContract.taskCounter();
    const getNumero = contador.toNumber();

    let html = "";

    for (let i = 1; i <= getNumero; i++) {
      const task = await this.ToDoContract.tasks(i);
      const taskId = task[0].toNumber();
      const taskTitle = task[1];
      const taskDescription = task[2];
      const taskDone = task[3];
      const taskCreatedAt = task[4];

      window.toggleDone = this.toggleDone.bind(this); // Funciona pero tengo que buscar una mejor forma
      // Crear el html
      let taskElement = `<div class="card bg-dark rounded-0 mb-2">
    <div class="card-header d-flex justify-content-between align-items-center">
      <span>${taskTitle}</span>
      <div class="form-check form-switch">
        <input id="task-${taskId}" class="form-check-input" data-id="${taskId}" type="checkbox" onchange="toggleDone(this)" ${
        taskDone === true && "checked"
      }>
      </div>
    </div>
    <div class="card-body">
      <span>${taskDescription}</span>
      <p class="text-muted">La tarea fue creada el ${new Date(
        taskCreatedAt * 1000
      ).toLocaleString()}</p>
    </div>
  </div>`;

      // Pintar el html
      html += taskElement;
      document.querySelector("#taskList").innerHTML = html;
    }
  }

  // Crear una nueva tarea
  async createTask(title, description) {
    try {
      const result = await this.ToDoContract.createTask(title, description, {
        from: this.account,
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  // Cambiar la tarea como hecha
  async toggleDone(element) {
    const taskId = element.dataset.id;
    await this.ToDoContract.toggleDone(taskId, {
      from: this.account,
    });
  }
}
