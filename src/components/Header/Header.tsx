import React from 'react'
import './Header.css'
import { RootState } from '../../redux'
import { connect } from 'react-redux'
import { Product } from '../../shared/Table/Table.mockdata'

declare interface HeaderProps {
    title: string;
    firstProduct: Product;
    menuActive?:boolean;
}

const Header:React.FC<HeaderProps> = (props) => {
    
    //Dica: possibilidade condicional para className
    let className = 'AppHeader'
    if(props.menuActive){
        className += ' menu-active' 
    }

    return <header className={className}>
        <h1>{ props.title }</h1>
        <span>{ props.firstProduct?.name }</span>
    </header>
}

const mapStateToProps = (state: RootState) => ({
    firstProduct: state.products[0]
})

export default connect(mapStateToProps)(Header)
