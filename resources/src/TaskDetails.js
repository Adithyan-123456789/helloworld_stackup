import { useParams } from "react-router-dom/cjs/react-router-dom";
import useFetch from "./useFetch";

const TaskDetails = () => {

    const { taskId } = useParams();
    const { id } = useParams();
    const { data: taskList, pending, error } = useFetch('http://localhost:8000/users/' + id);
    console.log(taskId - 1);
    const handleDeleteButton = () => {

        fetch('usl', {
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
            {pending && <p>Loading.....</p>}
            {error && <p> {error}</p>}
            {taskList && <div className="task-view">
                <div className="login-button-section">
                    <button className="button-configuration" onClick={() => { handleDeleteButton() }}>Complete</button>
                    <button className="button-configuration" onClick={() => { handleDeleteButton() }}>Edit</button>
                </div>
                <h2>{taskList.task[taskId - 1].taskName}</h2>
                <label> Description : </label>
                <span> {taskList.task[taskId - 1].description}</span><br></br><br></br>
                <label>Due Date : </label>
                <span> {taskList.task[taskId - 1].dueDate}</span>
            </div>}
        </div>
    );
}

export default TaskDetails;