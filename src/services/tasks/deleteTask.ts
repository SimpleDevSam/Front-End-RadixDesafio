import { apiInstance } from "./apiInstance";

export const deleteTask= async (id:string): Promise<number> => {
  const response = await apiInstance.delete(
    `/task/${id}`
  );
  return response.status;
};

export default deleteTask