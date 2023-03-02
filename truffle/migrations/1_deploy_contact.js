const Tasks = artifacts.require("../contracts/Tasks.sol")

module.exports = function(deployeer) {
    deployeer.deploy(Tasks)
}