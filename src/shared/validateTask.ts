import { CreateTask, UpdateTask } from "../types/tasks";
import { TaskStatus } from '../types/taskStatus';

interface ValidationErrors {
  [key: string]: string; 
}


export function validateCreateTask(task: CreateTask): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!task.title || typeof task.title !== 'string') {
    errors.title = 'O título é obrigatório e deve ser uma string.';
  }

  if (!Array.isArray(task.keywords) || task.keywords.length === 0) {
    errors.keywords = 'A lista de palavras-chave não pode estar vazia.';
  } else if (task.keywords.some(keyword => typeof keyword !== 'string' || !keyword.trim())) {
    errors.keywords = 'A lista de palavras-chave não pode conter elementos vazios ou valores não-string.';
  }

  if (!Object.values(TaskStatus).includes(task.status)) {
    errors.status = 'O status deve ser um valor válido de TaskStatus.';
  }

  if (!task.creationDate || isNaN(Date.parse(task.creationDate))) {
    errors.creationDate = 'A data de criação é obrigatória e deve ser uma data válida.';
  }

  if (!task.updatedDate || isNaN(Date.parse(task.updatedDate))) {
    errors.updatedDate = 'A data de atualização é obrigatória e deve ser uma data válida.';
  }

  return errors;
}

export function validateUpdateTask(task: UpdateTask): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!task.id || typeof task.id !== 'string') {
    errors.id = 'O ID é obrigatório e deve ser uma string válida.';
  }

  if (!task.title || typeof task.title !== 'string') {
    errors.title = 'O título é obrigatório e deve ser uma string.';
  }

  if (!Array.isArray(task.keywords) || task.keywords.length === 0) {
    errors.keywords = 'A lista de palavras-chave não pode estar vazia.';
  } else if (task.keywords.some(keyword => typeof keyword !== 'string' || !keyword.trim())) {
    errors.keywords = 'A lista de palavras-chave não pode conter elementos vazios ou valores não-string.';
  }

  if (!Object.values(TaskStatus).includes(task.status)) {
    errors.status = 'O status deve ser um valor válido de TaskStatus.';
  }

  if (!task.creationDate || isNaN(Date.parse(task.creationDate))) {
    errors.creationDate = 'A data de criação é obrigatória e deve ser uma data válida.';
  }

  if (!task.updatedDate || isNaN(Date.parse(task.updatedDate))) {
    errors.updatedDate = 'A data de atualização é obrigatória e deve ser uma data válida.';
  }

  return errors;
}
