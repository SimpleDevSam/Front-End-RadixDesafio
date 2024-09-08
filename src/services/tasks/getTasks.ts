import { apiInstance } from "./apiInstance";

  async function getTasks() {
    const response = await apiInstance.get('/task')
    return response.data.data
  }

export default getTasks