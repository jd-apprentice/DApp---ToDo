// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// Contrato
contract ToDoContract {
    // Contador
    uint256 public taskCounter = 0;

    // Constructor inicial
    constructor () {
        createTask("Tarea de ejemplo", "Ejemplo de descripcion");
    }

    // Evento TaskCreated
    event TaskCreated(
        uint id,
        string title,
        string description,
        bool done,
        uint createdAt
    );

    // Evento ToggleDone
    event TaskToggleDone (
        uint id,
        bool done
    );

    // Estructura de una tarea
    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 createAt;
    }
    
    // Array
    mapping(uint256 => Task) public tasks;

    // Funcion para crear una tarea
    function createTask(string memory _title, string memory _description) public {
        taskCounter++;
        tasks[taskCounter] = Task(taskCounter, _title, _description, false, block.timestamp);
        emit TaskCreated(taskCounter, _title, _description, false, block.timestamp);
    }

    // Funcion para marcar una trea como completada
    function toggleDone(uint256 _id) public {
       Task memory _task = tasks[_id];
       _task.done = !_task.done;
       tasks[_id] = _task;
       emit TaskToggleDone(_id, _task.done);
    }
}