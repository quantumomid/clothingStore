import React from 'react'
import MenuItem from '../menu-item/MenuItem'
// import './Directory.scss'
import { connect } from 'react-redux'
import { selectDirectorySections } from '../../redux/directory/directorySelector'
import { createStructuredSelector } from 'reselect'
import { DirectoryMenuContainer } from './directoryMenuContainer'

const Directory = ({ sections }) => {   

    const menuItems = sections.map(({ id, ...otherSectionProps }) => <MenuItem key={id} {...otherSectionProps} />)

    return(
        <DirectoryMenuContainer>
            {menuItems}
        </DirectoryMenuContainer>
    )
}

//OLD version - essentially returns an object that becomes part of the props
// const mapStateToProps = (state) => ({
//     sections: selectDirectorySections(state)
// });

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
});

export default connect(mapStateToProps)(Directory);