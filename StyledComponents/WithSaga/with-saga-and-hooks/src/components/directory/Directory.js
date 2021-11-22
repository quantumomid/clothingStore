import React from 'react'
import MenuItem from '../menu-item/MenuItem'
import { useSelector } from 'react-redux'
import { selectDirectorySections } from '../../redux/directory/directorySelector'
import { DirectoryMenuContainer } from './directoryStyles'

const Directory = () => {   
    const sections = useSelector(selectDirectorySections);
    const menuItems = sections.map(({ id, ...otherSectionProps }) => <MenuItem key={id} {...otherSectionProps} />)

    return(
        <DirectoryMenuContainer>
            {menuItems}
        </DirectoryMenuContainer>
    )
}

export default Directory;