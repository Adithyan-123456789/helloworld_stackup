import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const AddTask = (props) => {

    const [taskName, setTask] = useState('');
    const [dueDate, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [isValidDueDate, setDueDateStatus] = useState(true);
    const history = useHistory();

    useEffect(() => {
        if ((new Date(dueDate).getTime() >= (new Date()).getTime())) {
            setDueDateStatus(true);
        } else {
            setDueDateStatus(false);
        }
    }, [dueDate])

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isValidDueDate) {
            setDueDateStatus(true);
            const data = { taskName, dueDate, status, description };
            console.log(data);

            //Replace the url with a path to a specific user using props.id for getting  userid
            fetch(`http://localhost:8000/users/${props.id}/task`, {
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
                });

            history.goBack();
        }

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
                    <label> Due Date : {!isValidDueDate && <span>Invalid Date</span>}</label>
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
                        className="input-box">
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