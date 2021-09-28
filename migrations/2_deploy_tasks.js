const ToDoContract = artifacts.require("ToDoContract");
module.exports = function (deployer) {
  deployer.deploy(ToDoContract);
};
