export interface Task {
    id: string;
    title: string;
    "key-words": string[];
    status: number;
    creationDate: string;
    updatedDate: string;
}