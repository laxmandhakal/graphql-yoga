const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/schema/index");
const resolvers = require("./graphQL/resolver/index");
const { GraphQLServer } = require("graphql-yoga");
const app = express();
// file upload
// import { createWriteStream } from 'fs'
// import * as mkdirp from 'mkdirp'
// import * as shortid from 'shortid'
// import lowdb = require('lowdb')
// import FileSync = require('lowdb/adapters/FileSync')
// const uploadDir = './uploads'
// const db = new lowdb(new FileSync('db.json'))
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./db.connect");
const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context: (req) => req,
});
server.start(() => {
    console.log("GraphQL Listening on port 4000");
});