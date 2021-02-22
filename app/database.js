// Dotenv import to access to .env variable
require('dotenv').config();

// MongoDB impot package
const MongoClient = require('mongodb').MongoClient;

// DB host
const url = process.env.MONGODB_HOST;
console.log(url)

// DB name
const dbName = process.env.MONGODB_DBNAME;
console.log(dbName)

// Database connection
const clientPromise = MongoClient.connect(url, { useUnifiedTopology: true });

module.exports = clientPromise.then(client => client.db(dbName));