interface ConfirmationModalProps {
  message: string,
  onDelete: () => void
  onClose: () => void
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <p className="text-custom-purple mb-4">{props.message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => props.onDelete()}
            className="bg-custom-red text-white px-4 py-2 rounded"
          >
            Sim
          </button>
          <button
            onClick={() => props.onClose()}
            className="bg-gray-200 px-4 py-2 rounded"
          >
            Não
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
