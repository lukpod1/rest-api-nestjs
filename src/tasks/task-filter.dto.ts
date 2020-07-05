
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { Status } from "./task-status.enum";

export class TaskFilterDto {
    @IsOptional()
    @IsIn([Status.OPEN, Status.IN_PROGRESS, Status.DONE])
    status: Status;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}