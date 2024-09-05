import { TaskStatus } from "./taskStatus";

export interface Task {
    id: string;
    title: string;
    keywords: string[];
    status: TaskStatus;
    creationDate: string;
    updatedDate: string;
}
