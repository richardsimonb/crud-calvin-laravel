import { useState, useRef } from 'react';
import Form from './Form';

function AddButton({ onAddData }: { onAddData: (id: number, name: string, phone_number: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    let dialogRef = useRef<HTMLDialogElement | null>(null);

    function handleOpen(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsOpen(true);
        dialogRef.current?.showModal();
    };

    function handleClose() {
        setIsOpen(false);
        dialogRef.current?.close();
    }

    return (
        <>
            <button
                onClick={handleOpen}
                className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
                Add
            </button>
            <dialog ref={dialogRef} className={`fixed inset-0 flex items-center justify-center my-4 mx-auto ${!isOpen && 'hidden'}`}>
                <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">Add Person</h3>
                    {isOpen && <Form onClose={handleClose} handleData={onAddData} formType='add' />}
                </div>
            </dialog>
        </>

    );
}

export default AddButton;