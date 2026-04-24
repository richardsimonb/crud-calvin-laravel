import { useState } from 'react';
import { Person } from './App';

function Table({ list, onDeleteData }: { list: Person[]; onDeleteData: (id: number) => void }) {
    const [loading, setLoading] = useState(false);

    function handleDelete(id: number) {
        const deleteData = async (id: number) => {
            try {
                setLoading(true);
                const response = await fetch(
                    `/api/person/${id}`, {
                    method: 'DELETE',
                }
                );
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                onDeleteData(id);
            } catch (error: any) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        deleteData(id);
    }

    const personList = list.map((item: Person) => (
        <tr key={item.id}>
            <td scope="row" className="px-4 py-2 text-left">
                {item.name}
            </td>
            <td className="px-4 py-2 text-left">
                {item.phone_number}
            </td>
            <td>
                <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    Delete
                </button>
            </td>
        </tr>
    ));
    return (
        <table className="table-fixed md:w-1/2 w-full border-collapse border border-gray-300 rounded-lg mx-auto md:text-sm text-xs">
            <thead className="bg-gray-100">
                <tr>
                    <th scope="col" className="px-4 py-2 text-left md:w-3/7 w-2/5">
                        Name
                    </th>
                    <th scope="col" className="px-4 py-2 text-left md:w-3/7 w-2/5">
                        Phone Number
                    </th>
                    <th scope="col" className="px-4 py-2 md:w-1/7 w-1/5">
                    </th>
                </tr>
            </thead>
            <tbody>
                {list.length > 0 ? personList : (
                    <tr>
                        <td colSpan={2} className="px-4 py-2 text-center">
                            No data available.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Table;