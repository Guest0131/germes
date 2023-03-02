//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract Tasks {
    struct Task {
        uint256 id;
        address owner;
        string title;
        string description;
        string[] files;

        uint256 amount;
        bool completed;
    }

    Task[] public tasks;
    uint256 public count;


    function createTask(string memory _title, string memory _description, string[] memory _files, uint256 _amount) public returns (uint256) {
        tasks.push(Task(count, msg.sender, _title, _description, _files, _amount, false));
        count++;
        return count - 1;
    }

    function confirmTask(uint256 _taskId, address payable _worker)
        external
        payable
    {
        require(_taskId >= 0 && _taskId < count, "Invalid task id");

        Task storage task = tasks[_taskId];

        require(msg.value == task.amount, "Incorrect amount");
        require(msg.sender == task.owner, "You are not a creator of task");
        require(task.completed == false, "Task already completed");

        _worker.transfer(msg.value);
        task.completed = true;
    }

    function getTasksList() public view returns(Task[] memory) {
        return tasks;
    }
}