import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import { directoryData } from "./directoryData";
import './directory.styles.scss';

const sections = directoryData.sections;

const Directory = () => (
  <div className='directory-menu'>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

export default Directory;
