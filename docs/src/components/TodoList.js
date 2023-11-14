import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
const TodoList = (props) => {

    const [taskData, setTaskData] = useState(props.taskData);

    const format = (date) => {
        const [dd, mm, yyyy] = date.split('-');
        return (correctDate(yyyy) + '-' + correctDate(mm) + '-' + correctDate(dd));
    }


    const correctDate = (value) => {

        if (parseInt(value, 10) >= 10)
            return value;
        else
            return '0' + value;
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTaskData((prevTaskData) =>
                prevTaskData.map((task) => ({
                    ...task,
                    backgroundColor: (new Date(format(task.dueDate)).getTime() >= new Date().getTime()) ? '#7A7AE9' : 'red',
                }))
            );
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        taskData.map((eachTask) => (
            <Link to={"/taskData/" + props.id + '/' + eachTask.taskId} key={eachTask.taskId} className="links">
                <div className='task' key={eachTask.taskId} style={{
                    backgroundColor: eachTask.backgroundColor,
                }}>
                    <p className='task-details'>Task :{eachTask.taskName}</p>
                    <p className='task-details'>End Time :{eachTask.dueDate}</p>
                    <p className='task-details'>Status :{eachTask.status}</p>
                </div>
            </Link>
        ))
    );
}

export default TodoList;