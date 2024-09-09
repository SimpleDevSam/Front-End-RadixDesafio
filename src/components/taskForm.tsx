import { useState } from "react";
import { UpdateTask } from "../types/tasks";
import { TaskStatus } from "../types/taskStatus";
import { toast } from "react-toastify";

import { getStatusFromString } from "../shared/getTaskStatusFromString";

import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { createTaskSchema, updateTaskSchema } from "../shared/validationSchemas";
import createTask from "../services/tasks/create";
import updateTask from "../services/tasks/update";

interface TaskFormProps {
  task?: UpdateTask;
}

const TaskForm = ({ task }: TaskFormProps) => {
  const { id } = useParams();
  const [inputKeywordValue, setInputKeywordValue] = useState<string>("");
  
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: task?.title || "",
      keywords: task?.keywords || [],
      status: getStatusFromString(task?.status) || TaskStatus.Pendente,
      creationDate: task?.creationDate || "",
      id: task ? task.id : "",
    },
    validationSchema: task ? updateTaskSchema : createTaskSchema,
    enableReinitialize: true,

    onSubmit: async (values) => {
      try {
        if (task) {
          const taskData = values;
          await updateTask(id, taskData);
          toast.success("Tarefa atualizada com sucesso");
          navigate('/tasks');

        } else {
          const { id, ...taskData } = values;
          await createTask(taskData);
          toast.success("Tarefa criada com sucesso");
          formik.resetForm();
          navigate('/tasks');
          
        }
      } catch (error: any) {
        const createOrUpdate = task ? 'atualizar' : 'criar'
        if (error.code === 'ERR_NETWORK') {
          toast.warning(`Erro ao ${createOrUpdate} tarefa, não foi possível comunicar com o servidor`);
          return
        }
        toast.warning(`Erro ao ${createOrUpdate} tarefa. ` + error.message);
      }
    },
  });

  const handleAddKeyWord = (e: any) => {
    if (e.key === "Enter" && inputKeywordValue.trim()) {
      e.preventDefault();
      if (!/^\d+$/.test(inputKeywordValue.trim())) {
        formik.setFieldValue("keywords", [...formik.values.keywords, inputKeywordValue.trim()]);
        setInputKeywordValue("");
      } else {
        toast.warning("A palavra-chave não pode ser um número.");
      }
    }
  };

  const handleRemoveKeyword = (index: number) => {
    const newKeyWords = formik.values.keywords.filter((_, i) => i !== index);
    formik.setFieldValue("keywords", newKeyWords);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-6">
      <p className="text-lg font-bold text-custom-purple">{task ? "Atualizar Tarefa" : "Criar Tarefa"}</p>

      <div>
        <label htmlFor="title" className="block text-custom-blue font-semibold mb-2">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formik.values.title}
          className="w-full px-4 py-1 border border-custom-purple bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
          placeholder="Título da tarefa"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.title && formik.errors.title ? (
          <p className="text-red-500">{formik.errors.title}</p>
        ) : null}
      </div>

      <div>
        <div className="flex flex-row items-center">
          <label htmlFor="keywords" className="block text-custom-blue font-semibold mb-2">Palavras-chave</label>
          <label htmlFor="keywords" className=" ml-4 block text-custom-blue text-xs mb-2">(Para adicionar, digite e aperte Enter)</label>
        </div>

        <div className="w-full px-4 py-1 border border-custom-purple bg-transparent rounded flex flex-wrap items-center gap-2">
          {formik.values.keywords.map((keyword, index) => (
            <div key={index} className="bg-custom-purple text-white px-2 py-1 rounded-full flex items-center space-x-2">
              <span>{keyword}</span>
              <button type="button" onClick={() => handleRemoveKeyword(index)} className="text-white hover:text-red-500">&times;</button>
            </div>
          ))}
          <input
            type="text"
            value={inputKeywordValue}
            onChange={(e) => setInputKeywordValue(e.target.value)}
            onKeyDown={handleAddKeyWord}
            className="flex-grow bg-transparent outline-none"
            placeholder="Digite a palavra e pressione Enter para adicioná-la"
          />
          {formik.touched.keywords && formik.errors.keywords ? (
            <p className="text-red-500">{formik.errors.keywords}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="status" className="block text-custom-blue font-semibold mb-2">Status</label>
        <select
          id="status"
          name="status"
          value={formik.values.status}
          className="w-full px-4 py-1 border border-custom-purple bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value={TaskStatus.Pendente}>Pendente</option>
          <option value={TaskStatus["Em Progresso"]}>Em Progresso</option>
          <option value={TaskStatus.Concluída}>Concluída</option>
        </select>
        {formik.touched.status && formik.errors.status ? (
          <p className="text-red-500">{formik.errors.status}</p>
        ) : null}
      </div>
      <div className="text-center">
        <button type="submit" className="w-1/2 p-1 border-2 self-center border-custom-purple text-custom-purple font-bold rounded-full hover:bg-custom-purple hover:text-white transition duration-300">
          {task ? "Atualizar Tarefa" : "Criar Tarefa"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
