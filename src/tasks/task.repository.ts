import { Task } from "./task.entity";
import { Repository, EntityRepository } from "typeorm";
import { TaskDto } from "./dto/task.dto";
import { Status } from "./task-status.enum";
import { TaskFilterDto } from "./task-filter.dto";
import { User } from "src/auth/user.entity";
import { Logger, InternalServerErrorException } from "@nestjs/common";


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    private logger = new Logger('TaskRepository');

    async getTasks(filterDto: TaskFilterDto, user: User): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (search) {
            query.andWhere('task.title LIKE :serach OR task.description LIKE : search', { search: '%${search}%' })
        }

        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(`Failed to get tasks for user "${user.username}", DTO: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }

    }

    async createTask(taskDto: TaskDto, user: User): Promise<Task> {
        const { title, description } = taskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = Status.OPEN;
        task.user = user;

        try {
            await task.save();        
        } catch (error) {
            this.logger.error(`Failed to create task for user "${user.username}", DATA: ${JSON.stringify(taskDto)}`, error.stack);
            throw new InternalServerErrorException();
        }

        delete task.user;
        return task;
    }


}