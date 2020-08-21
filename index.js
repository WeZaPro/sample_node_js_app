const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')

app.listen(3000, () => {
 console.log("Server started on port 3000")
})

app.use(cors())

app.use(express.static('public'))

const bodyParser = require('body-parser') 
app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/employees", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('open', () => {
    console.log('Connected to mongoDB');
});
db.on('error', (error) => {
    console.log(error)
})

let employeeModel = require('./employee_schema')

app.post('/employee/add', (req, res) => {
    let newEmployee = new employeeModel;
    newEmployee.number = req.body.employee.number;
    newEmployee.name = req.body.employee.name;
    newEmployee.role = req.body.employee.role;
    newEmployee.save((err) => {
      if(err){
        res.send("Error while adding Employee");
      }else{
        res.send("Employee added");
      }
    })
})

app.get('/employees', (req, res) => {
    employeeModel.find({}, (err, employees) => {
      if (err) {
        res.send("Error while fetching Todos");
      } else {
        res.json(employees)
      }
    })
})

app.post('/employee/update/:num',(req, res) => {
    const filter = { number: req.params.num };
    const update = { 
        number: req.body.employee.number,
        name: req.body.employee.name,
        role: req.body.employee.role
    };
    employeeModel.findOneAndUpdate(filter, update, (err, employee) =>{
      if(!err){
        res.send("Good Work");
      }
    })
})

app.delete('/employee/:num', (req, res) => {
    let query = { number: req.params.num }
    employeeModel.deleteOne(query, (err) => {
      if(err){
        res.send("Error while deleting employee")
      }else{
        res.send("Employee deleted")
      }
    })
})
