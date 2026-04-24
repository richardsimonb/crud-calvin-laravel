import { useState, useEffect } from 'react';
import CSVButton from './CSVButton';
import AddButton from './AddButton';
import UpdateButton from './UpdateButton';
import Table from './Table';

/*
* Component entrypoint untuk frontend aplikasi CRUD
*/

type Person = {
  id: number;
  name: string;
  phone_number: string;
};

function Loading() {
  return (
    <div className="flex flex-col items-center mt-4">
      <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span className='sr-only'>Loading...</span>
    </div>
  )
}

function App() {
  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function handleAddData(id: number, name: string, phone_number: string) {
      setData(prevData => [...prevData, { id, name, phone_number }]);
  }
  function handleUpdateData(id: number, name: string, phone_number: string) {
      setData(prevData => prevData.map(item => item.id === id ? { id, name, phone_number } : item));
  }
  function handleDeleteData(id: number) {
      setData(prevData => prevData.filter(item => item.id !== id)); 
  }

  const fetchData = async () => {
    try {
      const response = await fetch(
        '/api/person');
      if (!response.ok) {
        if (response.status === 404) {
          setData([]);
          return
        } else {
          throw new Error("Something went wrong");
        }
      }
      const result = await response.json();
      setData(result.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setError(null);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <span className='text-lg'>{error}</span>;
  }

  return (
    <>
      <div className="flex items-center justify-center md:w-1/2 w-full gap-4 my-2 mx-auto ">
        <AddButton onAddData={handleAddData} />
        <UpdateButton onUpdateData={handleUpdateData} />
        <CSVButton />
      </div>
      <Table list={ data } onDeleteData={handleDeleteData} />
    </>
  )
}
export type { Person };
export default App