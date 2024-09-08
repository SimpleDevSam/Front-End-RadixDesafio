import { useEffect, useState } from "react";
import TaskForm from "../components/taskForm";
import { UpdateTask } from "../types/tasks";

import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import getTask from "../services/tasks/getTask";

const CreateOrUpdateTask = () => {

  const [task, setTask] = useState<UpdateTask>();
  const { id } = useParams();

  const isNonExistingId = id === "0";

  useEffect(() => {
    if (!isNonExistingId && id) {
      const fetchTask = async (taskId: string) => {
        try {
          const fetchedTask = await getTask(taskId);
          setTask(fetchedTask);
        } catch (error) {
          toast.error('Falha ao buscar tarefa');
        }
      };
      fetchTask(id);
    }
  },[isNonExistingId,id]);

  return (
    <div className="p-8 min-h-screen flex flex-col items-center bg-gray-100">
      <TaskForm
        task={task} />
    </div>
  );
};

export default CreateOrUpdateTask;
