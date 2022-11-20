const express = require('express')
const cors = require('cors')

const db = require('./js/db');

const app = express();
const port = 3000;

const user = {
  user: []
}

app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))

app.use(cors());

app.get('/', (req, res) => {
  db.findAll().then((data) => {
    user.user = data;
    res.render('home', user);
  })
});

app.get('/create', (req, res) => {
  res.render('create');
});
app.post('/create', (req, res) => {
  var date = req.body.DoB.split("-");
  var DoB = date[2] + '/' + date[1] + '/' + date[0];
  var data = {
    Fname : req.body.Fname,
    Lname : req.body.Lname,
    Age : req.body.Age,
    DoB : DoB,
    DoB_Format : req.body.DoB
  }
  db.insertData(data).then(console.log).catch(console.error);
  user.user.push(data)
  res.redirect('/');
})

app.get('/edit/:id', (req, res) => {
  var user_edit = {
    user: user.user.find(user => user._id == req.params.id)
  }
  res.render('edit', user_edit);
});
app.put('/edit', (req, res)=> {
  db.update(req.body._id,req.body).then(
    res.json({data: 'Save'})
  );
})
app.delete('/edit', (req, res) => {
  console.log('req dele')
  db.remove(req.body._id).then(
    res.json({data: 'Delete'})
  )
})

app.listen(port, () => {
    console.log('listen')
})