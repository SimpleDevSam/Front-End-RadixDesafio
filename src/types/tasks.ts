import { TaskStatus } from "./taskStatus";

export interface CreateTask {
    title: string;
    keywords: string[];
    status: TaskStatus;
}

export interface UpdateTask extends CreateTask {
    id:string
    creationDate:Date
}

export interface Task extends UpdateTask {
    updatedDate:Date
}