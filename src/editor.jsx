import React, { Component } from 'react';
import { EditorContainer, EditorOutput, TextEditor } from './ui-components';
import marked from 'marked';

class Editor extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: ""
    };

  }
  render() {
    return (
      <EditorContainer>
        <TextEditor value={this.state.value} onChange={this.onChange} />
        <EditorOutput dangerouslySetInnerHTML={{ __html: marked(this.state.value)}} / >
      </EditorContainer>
    )
  }

  onChange = ev =>
    this.setState({ value : ev.target.value })
}

export default Editor;
