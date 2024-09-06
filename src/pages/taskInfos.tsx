import { useState, useEffect } from 'react';
import { TaskInfo } from '../types/links';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


const TaskInfos = () => {
    const [taskInfoArray, setTaskInfoArray] = useState<TaskInfo[]>([]);
    const {id} = useParams();

    const links = [
        {
          "id": "9462c84d-8320-4048-bd38-b15fbb482588",
          "link": "https://example.com/task/3dedd5db-eb5e-4f96-8e9a-77c4a7cec7f2",
          "taskId": "3dedd5db-eb5e-4f96-8e9a-77c4a7cec7f2"
        },
        {
          "id": "85c33b95-93e3-4f9f-8338-69f32c42c551",
          "link": "https://example.com/task/d2fb100e-bd6b-4fca-9d44-dd291dae826a",
          "taskId": "d2fb100e-bd6b-4fca-9d44-dd291dae826a"
        },
        {
          "id": "f99e4e69-bb46-4299-b09b-4a8449be0098",
          "link": "https://example.com/task/f35fa61d-7cc8-4c08-84f7-82421369715f",
          "taskId": "f35fa61d-7cc8-4c08-84f7-82421369715f"
        },
        {
          "id": "ae52d611-00de-469b-9fc4-53d3080e5ae6",
          "link": "https://example.com/task/30951518-7a1f-4640-87b3-53d6e9d89e3b",
          "taskId": "30951518-7a1f-4640-87b3-53d6e9d89e3b"
        }
      ]

    useEffect(() => {
        const fetchInfo = async () => {
            if (id){
                try {
                    const fetchedTaskInfo = links;
                    setTaskInfoArray(fetchedTaskInfo);
                } catch (error) {
                    toast.error('Falha ao buscar assuntos');
                }
            }
        };

        fetchInfo();
    });

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
