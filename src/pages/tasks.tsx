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
import NotFoundWarning from '../components/notFoundWarning';
import LayoutContainer from '../components/layoutContainer';
import deleteTask from '../services/tasks/deleteTask';
import getTasks from '../services/tasks/getTasks';
import MainTitle from '../components/MainTitle';

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
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;  // Show 5 tasks per page
  const navigate = useNavigate();
  const isTasksEmpty = tasks.length === 0;

  const handleNavigateToCreateTask = () => navigate('/tasks/createOrUpdate/0');
  const handleNavigateToUpdateTask = (id: string) => navigate('/tasks/createOrUpdate/' + id);
  const handleNavigateToTaskInfo = (id: string) => navigate('/news/task/' + id);

  const removeTask = (taskId: string) => setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

  const handleDeleteTask = async (id: string) => {
    try {
      const result = await deleteTask(id);
      if (result) {
        removeTask(id);
      } else {
        toast.error("Houve um erro ao deletar a tarefa");
      }
    } catch (error) {
      toast.error("Houve um erro ao deletar a tarefa");
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
    setLoading(true);
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        toast.error('Falha ao buscar tarefas');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const goToNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <LayoutContainer>
      <div className='flex flex-col md:flex-row justify-between mb-6'>
        <MainTitle message='Ver Tarefas' />
        <div onClick={handleNavigateToCreateTask} className='cursor-pointer flex items-center gap-x-2 px-3 py-1 rounded-full bg-white outline outline-custom-purple outline-1 w-full md:w-auto hover:bg-custom-purple hover:text-white transition duration-300'>
          <FaPlus className='text-custom-purple text-2xl md:text-3xl hover:bg-custom-purple hover:text-white' />
          <p className='text-sm md:text-base'>Adicionar tarefa</p>
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="text-center text-custom-purple">Carregando tarefas...</div>
        ) : isTasksEmpty ? (
          <div className='flex flex-col justify-center items-center w-full md:w-1/2 gap-4 mx-auto'>
            <NotFoundWarning message="Não foram encontradas tarefas" />
          </div>
        ) : (
          currentTasks.map(task => (
            <div key={task.id} className="p-4 md:p-6 bg-white border border-custom-purple rounded-lg shadow">
              <p className="text-base md:text-lg font-semibold text-custom-purple mb-2">{task.title}</p>
              <div className="flex flex-col justify-between space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center md:gap-x-6">
                  <div className="text-sm text-custom-purple flex-1 md:w-1/4">
                    Palavra(s) chave: {task.keywords.join(', ')}
                  </div>
                  <div className={`inline-block px-3 py-1 text-white text-center text-xs font-semibold rounded-full flex-shrink-0 md:w-32 ${statusColors[task.status]}`}>
                    {TaskStatus[task.status]}
                  </div>
                  <div className="text-sm text-custom-purple flex-1 md:w-1/4">
                    Criada Em: {formatDate(task.creationDate)}
                  </div>
                  <div className="text-sm text-custom-purple flex-1 md:w-1/4">
                    Atualizada Em: {formatDate(task.updatedDate)}
                  </div>
                  <div className='flex flex-row gap-x-4 mt-4 md:mt-0'>
                    <FaTrash
                      className='text-custom-red text-2xl md:text-2xl cursor-pointer'
                      onClick={() => openDeleteModal(task.id)}
                    />
                    <BsPencil
                      className='text-custom-purple text-2xl md:text-2xl cursor-pointer'
                      onClick={() => handleNavigateToUpdateTask(task.id)}
                    />
                    <BsBoxArrowInUpRight
                      className='text-custom-purple text-2xl md:text-2xl cursor-pointer'
                      onClick={() => handleNavigateToTaskInfo(task.id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {!isTasksEmpty && (
          <div className="flex flex-col md:flex-row justify-between items-center mt-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-custom-purple text-white rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <p className="text-sm md:text-base">Página {currentPage} de {totalPages}</p>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-custom-purple text-white rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        )}
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
