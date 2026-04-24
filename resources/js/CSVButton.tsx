import { useState } from 'react';

function CSVButton() {
    const [loading, setLoading] = useState(false);

    async function handleExportCSV (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/person/csv');
            if (!response.ok) {
                throw new Error('Failed to export CSV');
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'person.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleExportCSV}
            disabled={loading}
            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 text-sm"
        >
            {loading ? 'Exporting...' : 'Export CSV'}
        </button>
    );
}

export default CSVButton;
