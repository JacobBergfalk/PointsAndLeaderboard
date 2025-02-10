import { Task } from "../model/task.interface";

export class TaskService {
    private tasks : Task[] = [];

    async getTasks() : Promise<Task[]> {
        return JSON.parse(JSON.stringify(this.tasks));
    }

    async addTask(description : string) : Promise<Task> {
        const task = {
            id: Date.now(),
            description: description,
            done: false
        }
        this.tasks.push(task);
        return { ...task };
    }

    async markDone(id: number): Promise<Task | undefined> {
        const task = this.tasks.find((task) => task.id === id);
        if (! task) {
            return undefined;
        }
        task.done = true;
        return { ...task };
    }
}