import mockData from "../mockData/mockData"

const getTask= async (id:string | undefined) => {
    return mockData.tasks.find(task => task.id === id)
} 

export default getTask