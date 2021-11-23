import React, { useContext } from 'react';
import directoryContext from '../../contexts/directory/directoryContext';
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';

const Directory = () => {
  const sections = useContext(directoryContext);
  return (
    <div className='directory-menu'>
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  )
};

export default Directory;
