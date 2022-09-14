
export type TaskStatus = 1 | 2 | 3; // 1: incomplete; 2: done; 3: archived

export class TaskModel
{
    _id?: string;
    name: string;
    isDone: boolean;
    status?: TaskStatus;
    description?: string;
    createdAt?: number;
    doneAt?: number;
}
