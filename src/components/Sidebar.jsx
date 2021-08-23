import React from "react";
import {FaInbox, FaRegCalendarAlt, FaRegCalendar} from "react-icons/fa";



function Sidebar({selectedTab, setSelectedTab}){
   

    

    return(
        <aside className="sidebar">
           <div class="active" onClick={()=>setSelectedTab("INBOX")}><FaInbox className="icon"/>Inbox</div>
           <div onClick={()=> setSelectedTab("TODAY")}><FaRegCalendarAlt className="icon" />Today</div>
           <div  onClick={()=> setSelectedTab("NEXT_7")}><FaRegCalendar className="icon" />Next 7 days</div>
        </aside>
    );
}

export default Sidebar