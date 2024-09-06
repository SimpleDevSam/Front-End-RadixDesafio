import { UpdateTask } from "../types/tasks";
import { apiInstance } from "./apiInstance";

export const getTask= async (
    id:string
  ): Promise<UpdateTask> => {

    const response = await apiInstance.get(
      `/task/${id}`
    );
    return response.data.data;
  };

export default getTask
