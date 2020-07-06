import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskDto } from './dto/task.dto';
import { Status } from './task-status.enum';
import { TaskFilterDto } from './task-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { }

    async getTasks(filterDto: TaskFilterDto, user: User): Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id } });

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return found;
    }

    async createTask(taskDto: TaskDto, user: User): Promise<Task> {
        return await this.taskRepository.createTask(taskDto, user);
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({ id, userId: user.id });

        if(result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    }

    async updateTaskSatatus(id: number, status: Status, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }
}



