import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";
import { TaskFilterDto } from "./task-filter.dto";
import { Status } from "./task-status.enum";

const mockUser = { username: 'Test user' };

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
})

describe('TasksService', () => {
    let tasksService;
    let taskRespository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService,
                { provide: TaskRepository, useFactory: mockTaskRepository }
            ]
        }).compile();


        tasksService = await module.get<TasksService>(TasksService);
        taskRespository = await module.get<TaskRepository>(TaskRepository);
    })

    describe('getTasks', () => {
        it('gets all tasks from the repository', async () => {
            taskRespository.getTasks.mockResolvedValue('someValue');
            expect(taskRespository.getTasks).not.toHaveBeenCalled();
            
            const filters: TaskFilterDto = { status: Status.IN_PROGRESS, search: 'Some search query' };    
            const result = await tasksService.getTasks(filters, mockUser);
            
            expect(taskRespository.getTasks).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        })
    })

})