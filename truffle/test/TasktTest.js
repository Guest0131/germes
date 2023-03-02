const Tasks = require('../contracts/Tasks.sol')

contract('Tasks', () => {
    it("Create tasks", async () => {
        const tasksStorage = await Tasks.new();
        tasksStorage.createTask(
            "Test Task 1", "Test description",
            [
                'src/file1', 'src/file2', 'src/file3'
            ],
            200
        );
        
        tasksStorage.createTask(
            "Test Task 2", "Test description 2",
            [
                'dest/file1'
            ],
            222
        );

        const data = await tasksStorage.getTasksList();
        
        assert(data.length === 2)
    });
})