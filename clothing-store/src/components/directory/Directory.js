import React from 'react'
import MenuItem from '../menu-item/MenuItem'
import './Directory.scss'
import sections from '../../data/directoryData.js'

export default class Directory extends React.Component{
    constructor(){
        super()
        this.state={
            sections: sections
        }
    }

    render(){

        const menuItems = this.state.sections.map((section) => {
            return (
                <MenuItem title={section.title}/>
            )
        })

        return(
            <div className="directory-menu">
                {menuItems}
            </div>
        )
    }
}