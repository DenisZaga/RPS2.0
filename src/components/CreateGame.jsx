// 'use client';

// import { createInitialgame } from '@/lib/action';
// import { useFormState } from "react-dom";
// import { useState } from 'react';

// const AddGameForm = () => {
//   const [state, formAction] = useFormState(createInitialgame, undefined);
//   const [animate, setAnimate] = useState(false);

//   function refreshPage() {
//     window.location.reload(true);
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     formAction(event);
//     setAnimate(true);
//     setTimeout(() => setAnimate(false), 500); 
//   }

//   return (
//     <div className="flex flex-col items-center justify-center bg-gray-200 p-6">
//       <div className="flex flex-col items-center space-y-4">
//         <h1 className={`text-2xl font-bold mb-6 transform transition-transform duration-500 ${animate ? 'scale-125' : ''}`}>Add New Game</h1>
//         <form onSubmit={handleSubmit} className="flex items-center space-x-2">
//           <input
//             type="text"
//             name="name"
//             placeholder="Enter game name"
//             className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           />
//           <button
//             type="submit"
           
//             className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           >
//             Add
//           </button>
//         </form>
//         {state?.error && <div className="text-red-500">{state.error}</div>}
//         {state?.success && <div className="text-green-500">{state.success}</div>}
//       </div>
//     </div>
//   );
// };

// export default AddGameForm;


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
          <h1 className="text-2xl font-bold mb-6">Add New Game</h1>
          <input type="text" name='name' placeholder="Enter game name"
            className="p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
    
          <button className="bg-green-500 text-white p-2 rounded-r-lg hover:bg-green-600" onClick={refreshPage}>
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