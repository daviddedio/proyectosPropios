import './NavBar.css'
import { useState } from 'react'
export const NavBar = ({ children, funcionAddItem, functionReviewProyect}) => {

    const addItem = ()=>{
        console.log('hola')
        funcionAddItem()
    }

    const proyectManager = ()=>{
        functionReviewProyect()
    }

    return (
        <div className='navbar'>
            <div className="options-items">
                <ul>
                    <li onClick={()=>addItem()}>Item de accion</li>
                    <li onClick={()=>proyectManager()}>Proyecto</li>
                </ul>
            </div>
            <div className="select-proyect">
                {children}
            </div>
            <div className="select-login">

            </div>
        </div>
    )
}