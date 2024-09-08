import { Task } from '../types/tasks';
import MainTitle from './MainTitle';

interface TaskInfoSectionProps {
    task?:Task
}

const TaskInfoSection = (props:TaskInfoSectionProps) => {
    return (
        <div>
            <MainTitle message={` Veja as noticias relacionadas à tarefa ${props.task?.title}`}/>
        <div className='flex flex-row'>
            <p className="text-2xl mb-4 font-bold text-custom-purple">
                Palavras-chave:
            </p>
            <p className="text-2xl mb-4 text-custom-purple">
                {props.task?.keywords.join(',')}
            </p>
        </div>
    </div>
    )
};

export default TaskInfoSection;
