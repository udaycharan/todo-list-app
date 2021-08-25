import React, {useState} from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isToday from "date-fns/isToday";
import addDays from "date-fns/addDays";




 const FORMAT = "dd/MM/yyyy";

    function formatDate(date, format, locale) {
          return dateFnsFormat(date, format, { locale });
      }
   


function Taskactions(props){
    const {onCancel, addTask} = props;
    const [taskName, setTaskName] = useState("");
    const [date, setDate] = useState(null);

    const saveTask=(task)=>{
        setTaskName(task);

    }

return(
    <>
<div className="add-task-dialog">

<input value={taskName}  onChange={(event)=>saveTask(event.target.value)}/>

<div className="actions">
    <div className="action-btn">
        <button disabled ={!taskName} className="add-btn" onClick={()=>{
  
            addTask(taskName, date);
            setTaskName("");
            onCancel();
            }}>
                Add Task
                </button>
        <button className="cancel-btn" onClick={()=>{ 
            onCancel();
            setTaskName("");
        }

            }>Cancel</button>
    </div>
    <div className="date-container">
        <DayPickerInput onDayChange = {(day)=> setDate(day)} placeholder={`${dateFnsFormat(new Date(), FORMAT)}`} formatDate={formatDate}
      format={FORMAT}
      dayPickerProps={{
          modifiers: {
              disabled: [{before:new Date()}]
          }
      }}/>
    </div>
</div> 
</div>
</>
);

}

const sideBar_header_mapping = {
    INBOX: "Inbox",
    TODAY: "Today",
    NEXT_7: "Next 7 days"


}

function Taskitems(props){

    const {selectedTab, taskList} = props;

    let filteredTasksArray = [...taskList];


    if(selectedTab === "NEXT_7"){

        filteredTasksArray = filteredTasksArray.filter((el)=> isAfter(el.date, new Date()) && isBefore(el.date,addDays(new Date(), 7)))
        
    }

   if(selectedTab === "TODAY"){
    filteredTasksArray = filteredTasksArray.filter(el => isToday(el.date));
    }

        return filteredTasksArray.map(el => <p>{el.task}{"  "}{dateFnsFormat(new Date(el.date), FORMAT)}</p>)

}


function Tasks(props){

    const {selectedTab} = props;

    const [addTaskClicked, setAddtaskClicked] = useState(false);
    const [taskList, setTaskList] = useState([]);

    const handleClick=()=>{

        setAddtaskClicked((prevState)=> !prevState);
    }

    const addTask=(task, date)=>{

        if(task !== ""){

                const taskItemWithdate = {
                     task,
                    date: date || new Date()
                }
        setTaskList((prevTaskList)=> [...prevTaskList, taskItemWithdate]);
        }

    }

    return (
        <div className="task-box">
           <h1>{sideBar_header_mapping[selectedTab]}</h1>

           {selectedTab === "INBOX" ?
           <div className = "add-task-btn" onClick={handleClick}>
               <span id ="plus">+</span>
               <span className="input-text">Add Task</span>
           </div> : null}

            {addTaskClicked && <Taskactions addTask = {addTask} onCancel = {()=> setAddtaskClicked(false)}/>}

            {taskList.length > 0 ? <Taskitems selectedTab = {selectedTab} taskList = {taskList}/> : <p>No tasks yet.</p>}
        </div>
    );
}

export default Tasks
