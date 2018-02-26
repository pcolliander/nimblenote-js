import React from 'react';
import { Aside, Note } from './ui-components';

const Sidebar = ({ notes }) =>
  <Aside>
    {notes.map((n, i) => 
      <Note>{i}</Note>)
    }
  </Aside>


export default Sidebar;
