import { useEffect } from "react";
import { useState } from "react";

const TodoListHeader = (props) => {

    const [status, setStatus] = useState('');

    useEffect(() => {

        const filteredData = props.taskData.task.filter((eachTask) => eachTask.status === status);

        if (filteredData.length === 0) {
            props.setContentStatus(false);
        } else {
            props.setFilteredContent(filteredData);
            props.setContentStatus(true);
            console.log("Filtered data views ");
            console.log(status);
            console.log(filteredData);
        }


    }, [status])
    return (
        <div className="Todolist-header">
            <h1>Todolist</h1>
            <label>Search</label>
            <div className="search-inputs">
                <label>Status : </label>
                <select
                    className="input-box"
                    onChange={(event) => {
                        setStatus(event.target.value);
                    }}>
                    <option></option>
                    <option>in progress</option>
                    <option>future</option>
                    <option>completed</option>
                </select>
            </div>
        </div>
    );
}

export default TodoListHeader;