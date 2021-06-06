import React from 'react'
import './Header.css'

declare interface HeaderProps {
    title: string;
    menuActive?:boolean
}

const Header:React.FC<HeaderProps> = (props) => {
    
    //Dica: possibilidade condicional para className
    let className = 'AppHeader'
    if(props.menuActive){
        className += ' menu-active' 
    }

    return <header className={className}>
        <h1>{props.title}</h1>
    </header>
}

export default Header