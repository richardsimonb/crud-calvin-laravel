import { useState } from 'react';

function Form({ onClose, handleData, formType }: { onClose: () => void; handleData: (id: number, name: string, phone_number: string) => void; formType: 'add' | 'update' }) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);
    const [validName, setValidName] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [samePhoneNumber, setSamePhoneNumber] = useState(false);

    function closeDialog() {
        setName('');
        setPhoneNumber('');
        setValidPhoneNumber(true);
        setValidName(true);
        setError(null)
        setSamePhoneNumber(false);
        onClose();
    }

    function handleCloseAdd(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        closeDialog();
    }

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
        setValidName(true);
    }

    function handlePhoneNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
        const input = e.target.value;
        const phoneRegex = /^[0-9]{7,12}$/;
        setPhoneNumber(input);
        setValidPhoneNumber(phoneRegex.test(input));
        setSamePhoneNumber(false)
    }

    const submitData = async (name: string, phoneNumber: string) => {
        try {
            const response = await fetch(
                '/api/person', {
                method: formType === 'add' ? 'POST' : 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    phone_number: phoneNumber
                })
            }
            );
            if (!response.ok) {
                if (response.status === 409) {
                    setValidName(false)
                    return;
                } else if (response.status === 404) {
                    setValidName(false);
                    return;
                }
                throw new Error('Something went wrong');
            }
            if(response.status == 204){
                setSamePhoneNumber(true)
                return;
            }
            const result = await response.json();
            handleData(result.data.id, result.data.name, result.data.phone_number);
            closeDialog();
        } catch (error: any) {
            setError(error.message);
        } finally {
            setError(null);
        }
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        submitData(name, phoneNumber);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-1"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
                {!validName && (
                    <p className="text-sm text-red-500 mt-1">
                        {formType === 'add' ? 'Name already used.' : 'Name not found.'}
                    </p>
                )}
            </div>
            <div className="mb-2">
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phone_number"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-1"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    required
                />
                {!validPhoneNumber && (
                    <p className="text-sm text-red-500 mt-1">
                        Please enter a valid phone number.
                    </p>
                )}
                {samePhoneNumber && (
                    <p className="text-sm text-red-500 mt-1">
                        Same as the old phone number.
                    </p>
                )}
            </div>
            {error && (
                <p className="text-sm text-red-500 mb-2">
                    {error}
                </p>
            )}
            <div className="flex justify-center gap-2">
                <button
                    type="button"
                    onClick={handleCloseAdd}
                    className="bg-gray-500 hover:bg-gray-700 text-white text-sm font-bold py-1 px-2 rounded"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded disabled:bg-gray-400"
                    disabled={!validName || !validPhoneNumber || samePhoneNumber}
                >
                    Save
                </button>
            </div>
        </form>
        );
}

export default Form;