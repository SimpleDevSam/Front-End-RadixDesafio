import { useEffect, useState } from "react";
import TaskForm from "../components/taskForm";
import { Task } from "../types/tasks";
import getTask from "../services/getTask";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateOrUpdateTask = () => {

  const [task, setTask] = useState<Task>();
  const { id } = useParams();

  const isNonExistingId = id === "0";

  useEffect(() => {
    if (!isNonExistingId && id) {
      const fetchTask = async (taskId: string) => {
        try {
          const fetchedTask = await getTask(taskId);
          console.log(fetchedTask)
          setTask(fetchedTask);
        } catch (error) {
          toast.error('Falha ao buscar tarefa');
        }
      };
      fetchTask(id);
    }
  }, []);

  return (
    <div className="p-8 min-h-screen flex flex-col items-center bg-gray-100">
      <TaskForm
        task={task} />
    </div>
  );
};

export default CreateOrUpdateTask;
