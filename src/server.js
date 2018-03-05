const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String,
    notes: [Note],
  },

  type Mutation {
    createNote(content: String): Note,
    editContent(id: Int, content: String): Note,
  },

  type Note {
    id: Int,
    content: String,
  },

`);

var notes = [
  {id: 1, content: "some note"},
  {id: 2, content: "second note"},
  {id: 3, content: "third note"},
  {id: 4, content: "fourth note"},
];

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => 'Hello world!',
  notes: () => notes,

  // mutations
  createNote: ({ content }) => {
    const note = { id: notes.length + 1, content };
    notes.push(note);

    console.log('note', note);
    return note;
  },

  editContent: ({ id, content }) => {
    notes = notes.map(n => n.id === id
      ? {...n, content } 
      : n)           

    return { id, content };
  }
};

app.use(
  '/graphql',
  cors(),
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
