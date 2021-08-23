import React from "react";
import logo from "../assets/images/logo.png";


function Header(props){

    return (
        <header className="header">
           <nav>
               <div className = "logo">
                   <img src = {logo} alt = {"Todolist"}></img>
                   <strong>TodoList</strong>
                   
               </div>
           </nav>
        </header>
    );
}

export default Header