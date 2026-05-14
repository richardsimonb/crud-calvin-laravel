import { useState, useRef, DialogHTMLAttributes } from 'react';
import Form from './Form';

function UpdateButton({ onUpdateData }: { onUpdateData: (id: number, name: string, phone_number: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    function handleOpenUpdate(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsOpen(true);
        dialogRef.current?.showModal(); 
    };

    function handleCloseUpdate() {
        setIsOpen(false);
        dialogRef.current?.close();
    }

    return (
        <>
            <button
                onClick={handleOpenUpdate}
                className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
                Update
            </button>
            <dialog ref={dialogRef} className={`fixed inset-0 flex items-center justify-center my-4 mx-auto ${!isOpen && 'hidden'}`}>
                <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">Update Data</h3>
                    {isOpen && <Form onClose={handleCloseUpdate} handleData={onUpdateData} formType='update' />}
                </div>
            </dialog>

        </>

    );
}

export default UpdateButton;