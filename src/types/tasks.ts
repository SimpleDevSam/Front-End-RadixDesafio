import { TaskStatus } from "./taskStatus";

export interface CreateTask {
    title: string;
    keywords: string[];
    status: TaskStatus;
    creationDate: string;
    updatedDate: string;
}

export interface UpdateTask extends CreateTask {
    id:string
}