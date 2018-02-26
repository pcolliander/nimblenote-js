import React, { Component } from 'react';
import './App.css';
import { Container, Header, Footer, Icon } from './ui-components';
import Sidebar from './sidebar';
import Editor from './editor';

class Nimblenote extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };
  }

  render() {
    return (
      <Container>
        <Header borderBottom borderRight column='1/2'>
          <h3>Nimblenote</h3>

        <span onClick={this.addNote}>
          <Icon className='fa fa-plus fa-2x'></Icon>
        </span>

        </Header>

        <Header borderBottom column='2/3'>
          <Icon className='fa fa-columns fa-2x'></Icon>
        </Header>

        <Sidebar notes={this.state.notes} />

        <Editor>editor</Editor>

        <Footer />
      </Container>
    )
  }

  addNote = () =>
    this.setState({
      notes: this.state.notes.concat(1),
    });
}

export default Nimblenote;

