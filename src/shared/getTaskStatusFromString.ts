import { TaskStatus } from "../types/taskStatus";

export const  getStatusFromString = (status: any): TaskStatus => {
  switch (status) {
    case 'Pendente':
      return TaskStatus.Pendente;
    case 'Em Progresso':
      return TaskStatus["Em Progresso"];
    case 'Concluída':
      return TaskStatus.Concluída;
    default:
      return TaskStatus.Pendente; 
  }
}