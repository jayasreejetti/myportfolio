const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
// mongoose.connect("mongodb://127.0.0.1:27017/PersonDB");

mongoose.connect("mongodb://127.0.0.1:27017/PersonDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const personSchema = new mongoose.Schema({
  name: String,
  studying: String,
  age: String,
  place: String
});

const Person = mongoose.model("Person", personSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs'); 

let user = "";

app.get('/', (req, res) => {
  res.render('index'); 
});

app.get('/thank', (req, res) => {
    res.render('thank', {userName: user}); 
  });

app.post('/add', async (req, res) => {
  const { name, email, msg } = req.body;
  try {
    const newPerson = new Person({ name, email, msg });
    await newPerson.save();
    user = newPerson.name;
    res.redirect('/thank');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding person to the database.');
  }
});

app.listen(4500, () => {
  console.log('Server is running on port 4500');
});
