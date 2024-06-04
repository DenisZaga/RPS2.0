'use client';
import { createInitialgame } from '@/lib/action';
import { useFormState } from "react-dom";

const AddGameForm = () => {
  const [state, formAction] = useFormState(createInitialgame, undefined);

function refreshPage() {
  window.location.reload(true);
}

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 p-6">
      <div className="flex space-x-2">
        <form action={formAction}>
          <h1 className="text-2xl font-bold mb-6 text-center">Add new game</h1>
          <input 
          type="text" 
          name="name" 
          placeholder="Enter game name"
          className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          className="bg-green-500 text-white p-2 rounded-r-lg hover:bg-green-600 ml-2"
          onClick={refreshPage}
        >
          Add
        </button>
        </form>
        {state?.error && <div className="text-red-500">{state.error}</div>}
        {state?.success && <div className="text-green-500">{state.success}</div>}
      </div>
    </div>
  );
};

export default AddGameForm;