import { useState } from "react";

const EditWindow = () => {

    const [taskName, setTask] = useState('');
    const [dueDate, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = () => {
        console.log("submitted");
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