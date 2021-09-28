const ToDoContract = artifacts.require('ToDoContract');

contract('ToDoContract', () => {

    before(async () => {
        this.ToDoContract = await ToDoContract.deployed()
    })

    it('migrate deployed successfully', async () => {
        const address = this.ToDoContract.address
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    })

    it('get Tasks List', async () => {
        const tasksCounter = await this.ToDoContract.taskCounter()
        const task = await this.ToDoContract.tasks(tasksCounter)

        assert.equal(task.id.toNumber(), tasksCounter);
        assert.equal(task.title, "Tarea de ejemplo");
        assert.equal(task.description, "Ejemplo de descripcion");
        assert.equal(task.done, false);
        assert.equal(tasksCounter, 1);
    })

    it("task created successfully", async () => {
       const resultado = await this.ToDoContract.createTask("la tarea", "descripcion segunda")
       const taskEvent = resultado.logs[0].args;
       const tasksCounter = await this.ToDoContract.taskCounter()

       assert.equal(tasksCounter, 2);
       assert.equal(taskEvent.id.toNumber(), 2);
       assert.equal(taskEvent.title, "la tarea");
       assert.equal(taskEvent.description, "descripcion segunda");
       assert.equal(taskEvent.done, false);
    })

    it("task toggle done", async () => {
       const resultado = await this.ToDoContract.toggleDone(1);
       const taskEvent = resultado.logs[0].args;
       const task = await this.ToDoContract.tasks(1)

       assert.equal(task.done, true);
       assert.equal(taskEvent.done, true);
       assert.equal(taskEvent.id.toNumber(), 1);

    })

})