import NavBar from './components/NavBar';
import TodoList from './components/TodoList';
import useFetch from "./components/useFetch";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import AboutUs from "./components/AboutUs";
import SideNav from './components/SideNav';
import TaskDetails from './components/TaskDetails';
import AddTask from './components/AddTask';
import UserLogin from './components/UserLogin';
import { useEffect, useState } from 'react';
import SignInDetails from './components/CreateAccount';
import TodoListHeader from './components/ToDoListHeader';
import EditWindow from './components/EditWindow';

function App() {

  const [filteredContent, setFilteredContent] = useState(null);
  const [isContentPresent, setContentStatus] = useState(false);

  const [id, setId] = useState(localStorage.getItem('userId') || '');
  const [taskId, setTaskId] = useState(null);
  const [isSignedIn, setSignInStatus] = useState(() => {
    const value = localStorage.getItem('isSignedIn');
    return value === 'true';
  });


  /*Replace the url in the useFetch with the path to a specific user using id*/
  const { data, pending, error } = useFetch('http://localhost:8000/users/' + id);

  useEffect(() => {
    console.log('Hello World');
  })

  return (
    <Router>
      <div className="App">
        <NavBar isSignedIn={isSignedIn} setSignInStatus={setSignInStatus} data={data} />
        <header className="App-header">
          {isSignedIn && <SideNav />}
          <div className='todoList'>
            <Switch>
              <Route exact path='/'>
                <UserLogin isSignedIn={isSignedIn} setSignInStatus={setSignInStatus} setId={setId} id={id} />
              </Route>
              <Route exact path="/home">
                {data && <TodoListHeader taskData={data} setContentStatus={setContentStatus} filteredContent={filteredContent} setFilteredContent={setFilteredContent} />}
                {error && <div> {error}</div>}

                {pending && <div className='loading-container'><img src='./transparentLoading.gif' alt='An animated logo of an infinity symbol'></img></div>}
                <div className='todoList-block'>
                  {(data && !isContentPresent) && <TodoList taskData={data.task} setId={setId} id={id} />}
                  {(data && isContentPresent) && <TodoList taskData={filteredContent} setId={setId} id={id} />}

                </div>
              </Route>

              <Route exact path="/aboutUs">
                <AboutUs />
              </Route>

              <Route path="/addTask">
                <AddTask id={id} />
              </Route>

              <Route path="/taskData/:id/:taskId">
                <h1>TASK DETAILS</h1>
                <TaskDetails setTaskId={setTaskId} />
              </Route>
              <Route path="/createAccount">
                <SignInDetails />
              </Route>

              <Route path="/editDetails">
                {data && <EditWindow userId={id} taskId={taskId - 1} data={data} />}
              </Route>
            </Switch>
          </div>
        </header>
      </div>
    </Router >
  );
}

export default App;

