
import { CreateTask, UpdateTask } from "../../types/tasks";
import { apiInstance } from "./apiInstance";

export const updateTask= async (id:string | undefined,task:UpdateTask |CreateTask): Promise<any> => {
  const response = await apiInstance.put(
    `/tasks/${id}`,
    task
  );
  return response;
};

export default updateTask