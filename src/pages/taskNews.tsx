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



    useEffect(() => {
        const fetchTaskNews = async (id: string) => {
            setLoading(true);
            try {
                const task = await getTask(id)
                const fetchedTaskNews = await getNews(id);
                setTask(task)
                setTaskInfoArray(fetchedTaskNews);

            } catch (error) {
                toast.error('Falha ao buscar assuntos');
            } finally {
                setLoading(false);
            }

        };

        if (id) {
            fetchTaskNews(id);
        }

    }, [id]);

    const hasNews = taskInfoArray.length > 0

    return (
        <LayoutContainer>
            {loading ? <div className="text-center text-custom-purple">Carregando Notícias...</div> :
                <TaskInfoSection task={task} />}
            {
                hasNews ?
                    (<div>
                        <div className="space-y-6">
                            {taskInfoArray.map(news => (
                                <div key={news.author} className="p-6 bg-white border border-custom-purple rounded-lg shadow">
                                    <p className="text-lg font-semibold text-custom-purple mb-2">{news.title}</p>
                                    <a href={`${news.url}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >{news.url}</a>
                                </div>
                            ))}
                        </div>
                    </div>)
                    :
                    <div>
                        <NotFoundWarning message="Não foram encontradas notícias relacionadas as palavras-chave." />
                    </div>

            }
        </LayoutContainer>
    );
};

export default TaskNews;
