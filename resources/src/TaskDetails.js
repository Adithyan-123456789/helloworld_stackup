import { useParams, Link } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";

const TaskDetails = () => {

    const { taskId } = useParams();
    const { id } = useParams();

    //change the url with a path to a specific user using id for userid
    const { data: taskList, pending, error } = useFetch('http://localhost:8000/users/' + id);
    console.log(taskId - 1);
    const handleDeleteButton = () => {

        /*Replace the url with the path to a specific task using id and taskid */
        fetch('url', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error('Server responds is not ok');
                } else {
                    console.log('Delete request is performed successfully');
                }
            })
            .catch((error) => {
                console.log(error.message);
            })
    }


    return (
        <div className="task-manager">
            {pending && <div className="loading-container"><img src='/public/loadingGif.gif'></img></div>}
            {error && <p> {error}</p>}
            {taskList && <div className="task-view">
                <div className="login-button-section">
                    <button className="button-configuration" onClick={() => { handleDeleteButton() }}>Complete</button>
                    <Link to="/editDetails"> <button className="button-configuration" onClick={() => { handleDeleteButton() }}>Edit</button></Link>
                </div>
                <h2>{taskList.task[taskId - 1].taskName}</h2>
                <label> Description : </label>
                <span> {taskList.task[taskId - 1].description}</span><br></br><br></br>
                <label>Due Date : </label>
                <span> {taskList.task[taskId - 1].dueDate}</span><br></br><br></br>
                <label>Status : </label>
                <span> {taskList.task[taskId - 1].status}</span>
            </div>}
        </div>
    );
}

export default TaskDetails;