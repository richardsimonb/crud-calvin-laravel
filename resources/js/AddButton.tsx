import { useState } from 'react';
import Form from './Form';

function AddButton({ onAddData }: { onAddData: (id: number, name: string, phone_number: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleOpenAdd(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsOpen(true);
        const dialog = document.querySelector('#add-dialog') as HTMLDialogElement;
        dialog.showModal();
    };

    function handleCloseAdd(){
        setIsOpen(false);
        const dialog = document.querySelector('#add-dialog') as HTMLDialogElement;
        dialog.close();
    }

    return (
        <>
            <button
                onClick={handleOpenAdd}
                className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
                Add
            </button>
            <dialog id="add-dialog" className={`fixed flex items-center justify-center my-4 mx-auto ${isOpen ? 'block' : 'hidden'}`}>
                <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">Add Person</h3>
                    <Form onClose={handleCloseAdd} handleData={onAddData} formType='add'  />
                </div>
            </dialog>
        </>

    );
}

export default AddButton;