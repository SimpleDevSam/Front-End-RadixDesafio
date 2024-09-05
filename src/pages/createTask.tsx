import { useState } from "react";

const CreateTask = () => {

    const [keywords, setKeywords] = useState(['']);
    const [inputKeywordValue, setInputKeywordValue] = useState('');

    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter' && inputKeywordValue.trim()) {
            e.preventDefault();
            setKeywords([...keywords, inputKeywordValue.trim()]);
            setInputKeywordValue('');
        }
    };
    const handleRemoveKeyword = (index: number) => {
        setKeywords(keywords.filter((_, i) => i !== index));
    };


    return (
        <div className="p-8 min-h-screen flex flex-col items-center bg-gray-100">
            <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-6">
                <div>
                    <label htmlFor="titulo" className="block text-custom-blue font-semibold mb-2">
                        Titulo
                    </label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        className="w-full px-4 py-2 border border-custom-purple bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
                        placeholder="Titulo da task"
                    />
                </div>
                <div>
                    <label htmlFor="titulo" className="block text-custom-blue font-semibold mb-2">
                        Palavras-chave
                    </label>
                    <div className="w-full px-4 py-2 border border-custom-purple bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-custom-blue flex flex-wrap items-center gap-2">
                        {keywords.map((keyword, index) => (
                            <div
                                key={index}
                                className="bg-custom-purple text-white px-2 py-1 rounded-full flex items-center space-x-2"
                            >
                                <span>{keyword}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveKeyword(index)}
                                    className="text-white hover:text-red-500"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        <input
                            type="text"
                            value={inputKeywordValue}
                            onChange={(e) => setInputKeywordValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-grow bg-transparent outline-none"
                            placeholder="Digite e pressione Enter"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="status" className="block text-custom-blue font-semibold mb-2">
                        Status
                    </label>
                    <select
                        id="status"
                        name="status"
                        className="w-full px-4 py-2 border border-custom-purple bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
                    >
                        <option value="Pendente">Pendente</option>
                        <option value="Em Progresso">Em Progresso</option>
                        <option value="Concluído">Concluído</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="dataCriacao" className="block text-custom-blue font-semibold mb-2">
                        Data Criação
                    </label>
                    <input
                        type="datetime-local"
                        id="dataCriacao"
                        name="dataCriacao"
                        className="w-full px-4 py-2 border border-custom-purple bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
                    />
                </div>
                <div>
                    <label htmlFor="dataAtualizacao" className="block text-custom-blue font-semibold mb-2">
                        Data Atualização
                    </label>
                    <input
                        type="datetime-local"
                        id="dataAtualizacao"
                        name="dataAtualizacao"
                        className="w-full px-4 py-2 border border-custom-purple bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-custom-blue"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-1/2  p-2 border-2 self-center border-custom-purple text-custom-purple font-bold rounded-full hover:bg-custom-purple hover:text-white transition duration-300"
                    >
                        Criar Tarefa
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;
