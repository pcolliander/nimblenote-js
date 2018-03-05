import React, { Component } from 'react';
import { EditorContainer, EditorOutput, TextEditor } from './ui-components';
import marked from 'marked';
import { gql } from 'apollo-boost';
import { graphql  } from 'react-apollo';
import { GetNotes } from './app';
import { client } from './index';
import debounce from 'lodash.debounce';


const writeToCache = ({ query, data }) =>
  client.writeQuery({ query, data });

const readFromCache = ({ query }) =>
  client.readQuery({ query });

class Editor extends Component {
  render() {
    return (
      <EditorContainer>
        <TextEditor value={this.props.activeNote.content} onChange={this.edit}/>

        <EditorOutput dangerouslySetInnerHTML={{ __html: marked(this.props.activeNote.content)}} / >
      </EditorContainer>
    )
  }

  edit = ({ target: { value } }) => {
    const _data = readFromCache({ query: GetNotes })
    const { id } = this.props.activeNote;

    const notes = _data.notes.map(n => n.id === id 
                    ? {...n, content: value} 
                    : n)           

    writeToCache({
      query: GetNotes, 
      data: {
        ..._data,
        notes,
      }
    });


    this.sendEdit(id, value);
  }

  sendEdit = debounce((id, content) => {
      this.props.sendEdit({
        variables: { id, content }
      })
    }, 500, { trailing: true })
}

export default graphql(gql`
  mutation ($id: Int, $content: String) {
    editContent(id: $id, content: $content) {
      id,
      content
    }
  }`
  , {
  name: 'sendEdit',
}
)(Editor);

