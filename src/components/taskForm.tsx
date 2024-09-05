import { useState, useEffect } from "react";
import { Task } from "../types/tasks";
import { TaskStatus } from "../types/taskStatus";
import { toast } from "react-toastify";


interface TaskFormProps {
  task?: Task; 
}

const TaskForm = ({ task }: TaskFormProps) => {
  
  const [inputKeywordValue, setInputKeywordValue] = useState<string>("");
  const [formData, setFormData] = useState<Task>({
    id: "",
    title: "",
    keywords: [],
    status: TaskStatus.Pendente,
    creationDate: "",
    updatedDate: "",
  });
  
  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id || "",
        title: task.title || "",
        keywords: task.keywords || [],
        status: task.status || TaskStatus.Pendente,
        creationDate: task.creationDate || "",
        updatedDate: task.updatedDate || "",
      });
    }
  }, [task]);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddKeyWord = (e: any) => {
    if (e.key === "Enter" && inputKeywordValue.trim()) {
      e.preventDefault();
      const newKeyWords = [...formData.keywords, inputKeywordValue.trim()];
      setFormData({ ...formData, keywords: newKeyWords });
      setInputKeywordValue("");
    }
  };

  const handleRemoveKeyword = (index: number) => {
    const newKeyWords = formData.keywords.filter((_, i) => i !== index);
    setFormData({ ...formData, keywords: newKeyWords });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      toast.success("Tarefa atualizada com sucesso")
    } else {
      toast.success("Tarefa criada com sucesso")
    }
  };

  return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <p className="text-lg font-bold text-custom-purple">{task ? "Atualizar Tarefa" : "Criar Tarefa"}</p>

        <div>
          <label htmlFor="title" className="block text-custom-blue font-semibold mb-2">Titulo</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            className="w-full px-4 py-1 border border-custom-purple bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
            placeholder="Titulo da tarefa"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="keywords" className="block text-custom-blue font-semibold mb-2">Palavras-chave</label>
          <div className="w-full px-4 py-1 border border-custom-purple bg-transparent rounded flex flex-wrap items-center gap-2">
            {formData.keywords.map((keyword, index) => (
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
              placeholder="Digite e pressione Enter"
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="block text-custom-blue font-semibold mb-2">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            className="w-full px-4 py-1 border border-custom-purple bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
            onChange={handleChange}
          >
            <option value="Pendente">Pendente</option>
            <option value="Em Progresso">Em Progresso</option>
            <option value="Concluído">Concluído</option>
          </select>
        </div>

        <div>
          <label htmlFor="creationDate" className="block text-custom-blue font-semibold mb-2">Data Criação</label>
          <input
            type="date"
            id="creationDate"
            name="creationDate"
            value={formData.creationDate}
            className="w-full px-4 py-1 border border-custom-purple bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="updatedDate" className="block text-custom-blue font-semibold mb-2">Data Atualização</label>
          <input
            type="date"
            id="updatedDate"
            name="updatedDate"
            value={formData.updatedDate}
            className="w-full px-4 py-1 border border-custom-purple bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
            onChange={handleChange}
          />
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
