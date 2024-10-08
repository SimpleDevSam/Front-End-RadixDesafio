
import { CreateTask } from "../../types/tasks";
import { apiInstance } from "./apiInstance";

export const createTask= async (
    task:CreateTask
  ): Promise<any> => {

    const response = await apiInstance.post(
      `/tasks`,
      task
    );
    return response;
  };

export default createTask