
import { Task} from "../../types/tasks";
import { apiInstance } from "./apiInstance";

export const  getTask= async (
    id:string
  ): Promise<Task> => {

    const response = await apiInstance.get(
      `/tasks/${id}`
    );
    return response.data.data;
  };

export default getTask
