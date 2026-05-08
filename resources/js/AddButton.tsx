import { useState } from 'react';
import Form from './Form';

function AddButton({ onAddData }: { onAddData: (id: number, name: string, phone_number: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleOpen(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsOpen(true);
        const dialog = document.querySelector('#add-dialog') as HTMLDialogElement;
        dialog.showModal();
    };

    function handleClose() {
        setIsOpen(false);
        const dialog = document.querySelector('#add-dialog') as HTMLDialogElement;
        dialog.close();
    }

    return (
        <>
            <button
                onClick={handleOpen}
                className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
                Add
            </button>
            {isOpen && <dialog key={'add'} id="add-dialog" className={`fixed inset-0 flex items-center justify-center my-4 mx-auto`}>
                <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">Add Person</h3>
                    <Form onClose={handleClose} handleData={onAddData} formType='add' />
                </div>
            </dialog>}
        </>

    );
}

export default AddButton;