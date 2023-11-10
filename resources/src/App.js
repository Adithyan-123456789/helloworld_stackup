import NavBar from './NavBar';
import TodoList from './TodoList';
import useFetch from "./useFetch";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import AboutUs from "./AboutUs";
import SideNav from './SideNav';
import TaskDetails from './TaskDetails';
import AddTask from './AddTask';
import UserLogin from './UserLogin';
import { useState } from 'react';
import SignInDetails from './CreateAccount';
import TodoListHeader from './ToDoListHeader';
import EditWindow from './EditWindow';

function App() {



  const [id, setId] = useState(localStorage.getItem('userId') || '');

  /*Replace the url in the useFetch with the path to a specific user using id*/
  const { data, pending, error } = useFetch('http://localhost:8000/users/' + id);

  const [isSignedIn, setSignInStatus] = useState(() => {
    const value = localStorage.getItem('isSignedIn');
    return value === 'true';
  });


  const [filteredContent, setFilteredContent] = useState(null);
  const [isContentPresent, setContentStatus] = useState(false);

  return (
    <Router>
      <div className="App">
        <NavBar isSignedIn={isSignedIn} setSignInStatus={setSignInStatus} data={data} />
        <header className="App-header">
          {isSignedIn && <SideNav />}
          <div className='todoList'>
            {!isSignedIn && <p className='try'>Please sign in</p>}
            <Switch>
              <Route exact path='/'>
                <UserLogin isSignedIn={isSignedIn} setSignInStatus={setSignInStatus} setId={setId} id={id} />
              </Route>
              <Route exact path="/home">
                {data && <TodoListHeader taskData={data} setContentStatus={setContentStatus} filteredContent={filteredContent} setFilteredContent={setFilteredContent} />}
                {error && <div> {error}</div>}

                {pending && <div className='loading-container'><img src='/public/loadingGif.gif'></img></div>}
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
                <TaskDetails />
              </Route>
              <Route path="/createAccount">
                <SignInDetails />
              </Route>

              <Route path="/editDetails">
                <EditWindow />
              </Route>
            </Switch>
          </div>
        </header>
      </div>
    </Router >
  );
}

export default App;

