import { useState, useEffect } from 'react';
import getTasks from '../services/getTasks';
import { TaskStatus } from '../types/taskStatus';
import { FaTrash } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Task } from '../types/tasks';
import deleteTask from '../services/deleteTask';
import { toast } from 'react-toastify';




const statusColors = {
  [TaskStatus.Pendente]: 'bg-custom-red',
  [TaskStatus.EmProgresso]: 'bg-custom-purple',
  [TaskStatus.Concluída]: 'bg-custom-green'
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const handleNavigateToCreateTask = () => {
    const nonExistingId = "0";
    const path = '/tasks/createOrUpdate/' + nonExistingId
    navigate(path);
  }
  const handleNavigateToUpdateTask = (id:string) => {
    const path = '/tasks/createOrUpdate/' + id
    navigate(path);
  }

  const handleNavigateToTaskInfo = (id:string) => {
    const path = '/tasks/info/' + id
    navigate(path);
  }

  const handleDeleteTask = async (id:string) => {
    const result = await deleteTask (id)
    if(result){
      toast.success("Task deletada com sucesso")
    } else {
      toast.error("Houve um erro ao deletar a task")
    }
      
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Falha ao buscar tarefas', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-8 min-h-screen space flex flex-col space-y-16">
      <div className='flex flex-row justify-between'>
        <p className="text-2xl font-bold text-custom-purple mb-4">Ver tarefas</p>
        <div onClick={handleNavigateToCreateTask} className='cursor-pointer flex items-center gap-x-2 px-3 py-1 rounded-full bg-white outline outline-custom-purple outline-1 w-1/8'>
          <FaPlus className='text-custom-purple text-4xl' />
          <p className='text-bottom'>Adicionar Task</p>
        </div>

      </div>

      <div className="space-y-6">
        {tasks.map(task => (
          <div key={task.id} className="p-6 bg-white border border-custom-purple rounded-lg shadow">
            <p className="text-lg font-semibold text-custom-purple mb-2">{task.title}</p>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row items-center gap-x-24">
                <div className="text-sm text-custom-purple w-1/4 flex items-center justify-center">Palavras-chave: {task["keywords"].join(', ')}</div>
                <div className={`inline-block px-3 py-1 text-white text-xs font-semibold rounded-full w-1/8 ${statusColors[task.status]}`}>
                  {TaskStatus[task.status]}
                </div>
                <div className="text-sm text-custom-purple w-1/4">
                  Creation Date: {task.creationDate}
                </div>
                <div className="text-sm text-custom-purple w-1/4 ">
                  Updated Date: {task.updatedDate}
                </div>
                <div className="text-sm text-custom-purple w-1/4  ">
                  Updated Date: {task.updatedDate}
                </div>
                <div className='flex flex-row gap-x-6'>
                  <FaTrash
                  className='text-custom-red text-8x1 cursor-pointer'
                  onClick={()=>handleDeleteTask(task.id)}
                  ></FaTrash>
                  <BsPencil
                    className='text-custom-purple text-8x1 cursor-pointer'
                    onClick={()=>handleNavigateToUpdateTask(task.id)}
                  ></BsPencil >
                  <BsBoxArrowInUpRight
                  className='text-custom-purple text-8x1 cursor-pointer'
                  onClick={()=>handleNavigateToTaskInfo(task.id)}
                  ></BsBoxArrowInUpRight >
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
