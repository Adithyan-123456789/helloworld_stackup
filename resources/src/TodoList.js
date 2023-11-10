import { Link } from "react-router-dom/cjs/react-router-dom";
const TodoList = (props) => {


    return (
        props.taskData.map((eachTask) => (
            <Link to={"/taskData/" + props.id + '/' + eachTask.taskId} key={eachTask.taskId} className="links">
                <div className='task' key={eachTask.taskId}>
                    <p className='task-details'>Task :{eachTask.taskName}</p>
                    <p className='task-details'>End Time :{eachTask.dueDate}</p>
                    <p className='task-details'>Status :{eachTask.status}</p>
                </div>
            </Link>
        ))
    );
}

export default TodoList;