const mongoose = require("mongoose");
const employeeSchema = mongoose.Schema({
  number: {
    type: String,
    required: true
  }, 
  name: {
    type: String
  },
  role: {
    type: String
  }
});
const employee = (module.exports = mongoose.model("employee", employeeSchema));