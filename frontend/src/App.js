import ListHeader from './components/ListHeader';
import { useEffect, useState } from 'react';
import ListItem from './components/ListItem';
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`https://task-manager-ej4g.onrender.com/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, [authToken]);

  console.log(tasks);

  // Sort by date
  const sortedTasks = tasks?.length > 0 ? tasks.sort((a, b) => new Date(a.date) - new Date(b.date)) : [];

  return (
    <div className="bg-[rgb(233,241,249)] flex items-center justify-center mt-12">
      <div className="bg-white shadow-md rounded-lg p-4 w-[800px] mt-12">
        {!authToken && <Auth />}
        {authToken && (
          <>
            <ListHeader listName={'Task manager'} getData={getData} />
            <p className="text-lg m-3 float-right">Welcome back {userEmail}</p>
             {sortedTasks.map((task)=>(
              <ListItem key={task.id} task={task} getData={getData} />
             ))}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
