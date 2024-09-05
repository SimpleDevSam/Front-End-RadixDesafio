import { useState, useEffect } from 'react';
import getTasksInfo from '../services/getTaskInfos';
import { TaskInfo } from '../types/links';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


const TaskInfos = () => {
    const [taskInfoArray, setTaskInfoArray] = useState<TaskInfo[]>([]);
    const {id} = useParams();

    useEffect(() => {
        const fetchInfo = async () => {
            if (id){
                try {
                    const fetchedTaskInfo = await getTasksInfo(id);
                    setTaskInfoArray(fetchedTaskInfo);
                } catch (error) {
                    toast.error('Falha ao buscar assuntos');
                }
            }
        };

        fetchInfo();
    }, []);

    const hasLinks = taskInfoArray.length > 0

    return (
        <div className="p-8 min-h-screen space flex flex-col space-y-16">
            {
                hasLinks ?
                ( <div><p className="text-2xl mb-4 font-bold text-custom-purple">Veja as noticias relacionadas às palavras-chave da sua tarefa</p><div className="space-y-6">
                            {taskInfoArray.map(info => (
                                <div key={info.id} className="p-6 bg-white border border-custom-purple rounded-lg shadow">
                                    <p className="text-lg font-semibold text-custom-purple mb-2">Link: {info.link}</p>
                                </div>
                            ))}
                        </div></div>)
                : (<p />)
                }
            </div>
    );
};

export default TaskInfos;
