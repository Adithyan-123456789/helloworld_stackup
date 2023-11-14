import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const EditWindow = (props) => {

    const format = (date) => {
        const [dd, mm, yyyy] = date.split('-');
        return (yyyy + '-' + mm + '-' + dd);
    }


    const [taskValue, setTask] = useState(props.data.task[props.taskId].taskName);
    const [dueDate, setDate] = useState(format(props.data.task[props.taskId].dueDate));
    const [description, setDescription] = useState(props.data.task[props.taskId].description);
    const [status, setStatus] = useState(props.data.task[props.taskId].status);
    const [ValidDueDate, setDueDateStatus] = useState(true);
    const history = useHistory();

    console.log("Due Date");
    console.log(dueDate);
    useEffect(() => {
        if ((new Date(dueDate).getTime() >= (new Date()).getTime())) {
            setDueDateStatus(true);
        } else {
            setDueDateStatus(false);
        }
    }, [dueDate])


    const handleSubmit = (event) => {
        event.preventDefault();

        if (ValidDueDate) {
            setDueDateStatus(true);
            const data = { taskValue, dueDate, status, description };
            console.log(data);

            //Replace the url with a path to a specific user using props.id for getting  userid
            fetch(`http://localhost:8000/users/${props.userId}/task`, {
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
            <h1>Edit The Details</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-details">
                    <label>Task : </label>
                    <input
                        type="text"
                        required
                        value={taskValue}
                        className="input-box"
                        onChange={(event) => {
                            setTask(event.target.value);
                        }}>
                    </input>
                    <label> Due Date : {!ValidDueDate && <span>Invalid Date</span>}</label>
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

export default EditWindow;