import mockData from "../mockData/mockData"

const getTasksInfo= async (taskId:string) => {
    return mockData.links.filter(l => l.taskId === taskId)
} 

export default getTasksInfo