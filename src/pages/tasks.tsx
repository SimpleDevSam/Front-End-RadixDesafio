import { useState, useEffect } from 'react';

import { TaskStatus } from '../types/taskStatus';
import { FaTrash } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { Task } from '../types/tasks';

import { toast } from 'react-toastify';
import formatDate from '../shared/dateHelper';
import ConfirmationModal from '../components/confirmationModal';
import EmptyTask from '../components/emptyTask';
import LayoutContainer from '../components/layoutContainer';
import deleteTask from '../services/tasks/deleteTask';
import getTasks from '../services/tasks/getTasks';

const statusColors = {
  [TaskStatus.Pendente]: 'bg-custom-red',
  [TaskStatus['Em Progresso']]: 'bg-custom-purple',
  [TaskStatus.Concluída]: 'bg-custom-green'
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isTasksEmpty = tasks.length === 0;

  const handleNavigateToCreateTask = () => {
    const nonExistingId = "0";
    const path = '/tasks/createOrUpdate/' + nonExistingId;
    navigate(path);
  };

  const handleNavigateToUpdateTask = (id: string) => {
    const path = '/tasks/createOrUpdate/' + id;
    navigate(path);
  };

  const handleNavigateToTaskInfo = (id: string) => {
    const path = '/news/task/' + id;
    navigate(path);
  };

  const removeTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const result = await deleteTask(id);
      if (result) {
        removeTask(id);
      } else {
        toast.error("Houve um erro ao deletar a task");
      }
    } catch (error) {
      toast.error("Houve um erro ao deletar a task");
    } 
  };

  const openDeleteModal = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setTaskToDelete(null);
  };

  const confirmDelete = async () => {
    if (taskToDelete) {
      await handleDeleteTask(taskToDelete);
      closeDeleteModal();
    }
  };

  useEffect(() => {
    setLoading(true)
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        toast.error('Falha ao buscar tarefas');
      } finally {
        setLoading(false)
      }
    };

    fetchTasks();
  }, []);

  return (
    <LayoutContainer>
      <div className='flex flex-row justify-between'>
        <p className="text-2xl font-bold text-custom-purple mb-4">Ver tarefas</p>
        <div onClick={handleNavigateToCreateTask} className='cursor-pointer flex items-center gap-x-2 px-3 py-1 rounded-full bg-white outline outline-custom-purple outline-1 w-1/8 hover:bg-custom-purple hover:text-white transition duration-300'>
          <FaPlus className='text-custom-purple text-4xl hover:bg-custom-purple hover:text-white' />
          <p className='text-bottom'>Adicionar tarefa</p>
        </div>
      </div>
      <div className="space-y-6 justify-center">
        {loading ?
          <div className="text-center text-custom-purple">Carregando tarefas...</div>
         :
        isTasksEmpty ?
          <div className='flex flex-col justify-center items-center w-1/2 gap-4 mx-auto'>
            <EmptyTask />
          </div>
          :
          tasks.map(task => (
            <div key={task.id} className="p-6 bg-white border border-custom-purple rounded-lg shadow">
              <p className="text-lg font-semibold text-custom-purple mb-2">{task.title}</p>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row items-center gap-x-24">
                  <div className="text-sm text-custom-purple w-1/4 flex items-center justify-center">Palavras-chave: {task["keywords"].join(', ')}
                  </div>
                  <div className={`inline-block px-3 whitespace-nowrap py-1 text-white text-xs font-semibold rounded-full w-1/8 ${statusColors[task.status]}`}>
                    {TaskStatus[task.status]}
                  </div>
                  <div className="text-sm text-custom-purple whitespace-nowrap w-1/4">
                    Criada Em: {formatDate(task.creationDate)}
                  </div>
                  <div className="text-sm text-custom-purple w-1/4 whitespace-nowrap">
                    Atualizada Em: {formatDate(task.updatedDate)}
                  </div>
                  <div className='flex flex-row gap-x-6'>
                    <FaTrash
                      className='text-custom-red text-8x1 cursor-pointer'
                      onClick={() => openDeleteModal(task.id)}
                    />
                    <BsPencil
                      className='text-custom-purple text-8x1 cursor-pointer'
                      onClick={() => handleNavigateToUpdateTask(task.id)}
                    />
                    <BsBoxArrowInUpRight
                      className='text-custom-purple text-8x1 cursor-pointer'
                      onClick={() => handleNavigateToTaskInfo(task.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {isModalOpen && (
        <ConfirmationModal
          message="Tem certeza que quer deletar essa tarefa?"
          onDelete={confirmDelete}
          onClose={closeDeleteModal}
        />
      )}
    </LayoutContainer>
  );
};

export default TasksPage;
