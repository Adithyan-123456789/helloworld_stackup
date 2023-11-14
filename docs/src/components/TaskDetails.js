import { useParams, Link } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";

const TaskDetails = (props) => {

    const { taskId } = useParams();
    props.setTaskId(taskId);
    const { id } = useParams();

    //change the url with a path to a specific user using id for userid
    const { data: taskList, pending, error } = useFetch('http://localhost:8000/users/' + id);

    const handleDeleteButton = () => {

        /*Replace the url with the path to a specific task using id and taskid */
        fetch('url', {
            method: 'POST',
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
            {pending && <div className="loading-container"><img src='./transparentLoading.gif' alt="An animated logo of an infinity symbol"></img></div>}
            {error && <p> {error}</p>}
            {taskList && <div className="task-view">
                <div className="login-button-section">
                    <Link to="/home" className="links"><button className="button-configuration" onClick={() => { handleDeleteButton() }}>Complete</button></Link>
                    <Link to="/editDetails" className="links"> <button className="button-configuration" >Edit</button></Link>
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