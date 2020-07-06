import { Task } from "./task.entity";
import { Repository, EntityRepository } from "typeorm";
import { TaskDto } from "./dto/task.dto";
import { Status } from "./task-status.enum";
import { TaskFilterDto } from "./task-filter.dto";
import { User } from "src/auth/user.entity";


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(filterDto: TaskFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('task.title LIKE :serach OR task.description LIKE : search', { search: '%${search}%' })
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(taskDto: TaskDto, user: User): Promise<Task> {
        const { title, description } = taskDto;
        
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = Status.OPEN;
        task.user = user;

        await task.save();

        return task;
    }

    
}