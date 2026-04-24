import { useState } from 'react';
import Form from './Form';

function UpdateButton({ onUpdateData }: { onUpdateData: (id: number, name: string, phone_number: string) => void }) {
    const [isOpen, setIsOpen] = useState(false);

    function handleOpenUpdate(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setIsOpen(true);
        const dialog = document.querySelector('#update-dialog') as HTMLDialogElement;
        dialog.showModal();
    };

    function handleCloseUpdate(){
        setIsOpen(false);
        const dialog = document.querySelector('#update-dialog') as HTMLDialogElement;
        dialog.close();
    }

    return (
        <>
            <button
                onClick={handleOpenUpdate}
                className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
                Update
            </button>
            <dialog id="update-dialog" className={`fixed flex items-center justify-center my-4 mx-auto ${isOpen ? 'block' : 'hidden'}`}>
                <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">Update Data</h3>
                    <Form onClose={handleCloseUpdate} handleData={onUpdateData} formType='update'  />
                </div>
            </dialog>
        </>

    );
}

export default UpdateButton;