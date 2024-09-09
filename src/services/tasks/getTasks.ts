import { apiInstance } from "./apiInstance";

  async function getTasks() {
    const response = await apiInstance.get('/tasks')
    return response.data.data
  }

export default getTasks