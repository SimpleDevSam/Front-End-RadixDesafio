import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import LayoutContainer from '../components/layoutContainer';
import getNews from '../services/news/getNews';
import type TaskNewsInfo from '../types/taskNews';
import getTask from "../services/tasks/getTask";
import { Task } from '../types/tasks';
import NotFoundWarning from '../components/notFoundWarning';
import TaskInfoSection from '../components/TaskInfoSection';

const TaskNews = () => {

  const [task, setTask] = useState<Task>();
  const [taskInfoArray, setTaskInfoArray] = useState<TaskNewsInfo[]>([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [taskIsConcluded, setTaskIsConcluded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 5; // Set the number of news items per page

  useEffect(() => {
    const fetchTaskNews = async (id: string) => {
      setLoading(true);
      try {
        const task = await getTask(id);
        setTask(task);
        const fetchedTaskNews = await getNews(id);
        setTaskInfoArray(fetchedTaskNews);
      } catch (error: any) {
        if (error.status === 422) {
          setTaskIsConcluded(true);
          return;
        }
        toast.error('Falha ao buscar assuntos');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTaskNews(id);
    }
  }, [id]);

  const hasNews = taskInfoArray.length > 0;
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = taskInfoArray.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(taskInfoArray.length / newsPerPage);

  const goToNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <LayoutContainer>
      {loading ? (
        <div className="text-center text-custom-purple">Carregando Notícias...</div>
      ) : (
        <TaskInfoSection task={task} />
      )}

      {taskIsConcluded ? (
        <NotFoundWarning message="Não é possível buscar assuntos para tarefas já concluídas" />
      ) : hasNews ? (
        <div>
          <div className="space-y-6">
            {currentNews.map((news) => (
              <div key={news.author} className="p-6 bg-white border border-custom-purple rounded-lg shadow">
                <p className="text-lg font-semibold text-custom-purple mb-2">{news.title}</p>
                <a href={`${news.url}`} target="_blank" rel="noreferrer">
                  {news.url}
                </a>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-custom-purple text-white rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <p>Página {currentPage} de {totalPages}</p>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-custom-purple text-white rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      ) : (
        <NotFoundWarning message="Não foram encontradas notícias relacionadas as palavras-chave." />
      )}
    </LayoutContainer>
  );
};

export default TaskNews;
