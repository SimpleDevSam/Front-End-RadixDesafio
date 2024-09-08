import { apiInstance } from "../apiInstance"


  async function getNews(taskId:string){
    const response = (await apiInstance.get(`/news/task/${taskId}`)).data
    return response.data
  }

export default getNews