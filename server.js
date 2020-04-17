// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').load()
// }


const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

dotenv.config({path:'./config.env'});

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));

const db = process.env.DATABASE_URL;
mongoose.connect(db,{ //To connect to db, 1st connection string 2nd options for deprication warnings
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(con => { //This connection returns a promise so handle that.
  // console.log(con.connections);
  console.log('DB connection successful');
}).catch(err => console.log("Error in connected database " , err));

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on('error', error => console.error(error))
// db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

app.listen(process.env.PORT || 3000);