import React from 'react';
import { Aside, Note } from './ui-components';

const Sidebar = ({ changeActiveNote, notes }) =>
  <Aside>
    {notes.map(note =>
      <Note onClick={() => changeActiveNote(note.id)}>{note.content}</Note>)
    }
  </Aside>


export default Sidebar;
