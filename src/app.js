import React, { Component } from 'react';
import './App.css';
import { Container, Header, Footer, Icon } from './ui-components';
import Sidebar from './sidebar';
import Editor from './editor';
import { gql } from 'apollo-boost';
import { compose, graphql  } from 'react-apollo';

class Nimblenote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeNoteId: 1,
    };
  }

  render () {
    const { loading, error, notes } = this.props.data;

    if (loading || error) return 'loading';

    const activeNote = notes.find(n => n.id === this.state.activeNoteId);

    return (
      <Container>
        <Header column='1/2' borderBottom borderRight >
          <h3>Nimblenote</h3>

        <span onClick={this.addNote}>
          <Icon className='fa fa-plus fa-2x'></Icon>
        </span>

        </Header>

        <Header column='2/3' borderBottom >
          <Icon className='fa fa-columns fa-2x'></Icon>
        </Header>

        <Sidebar changeActiveNote={this.changeActiveNote} notes={notes} />

        <Editor activeNote={activeNote}>editor</Editor>

        <Footer />
      </Container>
    )
  }

  addNote = () => this.props.createNote();

  changeActiveNote = id =>
    this.setState({ activeNoteId: id });
}

export const GetNotes = gql`query { notes { id, content }}`;

const createNote = graphql(gql`
  mutation {
    createNote(content: "new note") {
      id,
      content,
    }
  }`, { 
    name: "createNote",
    options: {
      update: (proxy, { data: { createNote: note }} ) => {
        const data = proxy.readQuery({ query: GetNotes });

        data.notes.push(note);
        proxy.writeQuery({ query: GetNotes, data });
      },
    }                  
});
  

export default compose(
  createNote,
  graphql(GetNotes),
)(Nimblenote)

