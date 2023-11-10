import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const AddTask = (props) => {

    const [taskName, setTask] = useState('');
    const [dueDate, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { taskName, dueDate, status, description };
        console.log(data);

        fetch(`http://localhost:8000/users/3`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    console.log('Task added successfully!!!!');
                } else {
                    console.log("Error Occured");
                }
            })
            .catch((error) => {
                console.log(error.message);
            })
    }
    return (

        <div className="login-container">
            <h1>Add A New Task</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-details">
                    <label>Task : </label>
                    <input
                        type="text"
                        required
                        value={taskName}
                        className="input-box"
                        onChange={(event) => {
                            setTask(event.target.value);
                        }}>
                    </input>
                    <label> Due Date : </label>
                    <input
                        type="date"
                        required
                        value={dueDate}
                        className="input-box"
                        onChange={(event) => {
                            setDate(event.target.value);
                        }}>
                    </input>
                    <label>Description : </label>
                    <textarea
                        placeholder="Describe your task"
                        value={description}
                        className="input-box"
                        required
                        onChange={(event) =>
                            setDescription(event.target.value)}>
                    </textarea>
                    <label>Task Status :</label>
                    <select
                        onChange={(event) => setStatus(event.target.value)}
                        required
                        className="input-box"
                        aria-rowcount="6"
                        aria-colcount="20">
                        <option value="completed">completed</option>
                        <option value="in progress">in progress</option>
                        <option value="future">future</option>

                    </select>
                    <input type="submit" className="submit-button"></input>
                </div>
            </form>
        </div>
    );
}

export default AddTask;