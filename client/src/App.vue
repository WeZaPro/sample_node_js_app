<template>
  <v-app>
    <div class="d-flex justify-center">
      <h1 id="addTodo">Add/Update Employee</h1>
    </div>
    <div class="d-flex flex-column justify-center">
        <div style="margin: 10px 350px 0px 350px">
            <v-text-field v-model="newEmployee.number" label="Employee Number" solo></v-text-field>
        </div>

        <div style="margin: 10px 350px 0px 350px">
            <v-text-field v-model="newEmployee.name" label="Employee Name" solo></v-text-field>
        </div>

        <div style="margin: 10px 350px 0px 350px">
            <v-text-field v-model="newEmployee.role" label="Employee Role" solo></v-text-field>
        </div>
    </div>
    <div class="d-flex justify-center">
      <v-btn @click="addEmployee()" color="primary">Add Employee</v-btn>
    </div>
    <div class="d-flex justify-center" style="margin-top: 10px;">
      <v-btn @click="updateEmployee(newEmployee.number)" color="primary">Update Employee</v-btn>
    </div>

    <!-- completed todos -->
    <div class="d-flex justify-center">
      <h1>Employees</h1>
    </div>

    <h1 class="text-center white--text">Employees</h1>
    <div style="margin-top: 15px;" v-for="employee in employees" :key="employee.number">
      <v-card class="mx-auto" color="blue" dark max-width="800">
        <v-card-text class="font-weight-bold title white--text">
          {{ employee.name }}
          <v-list-item id="todo-list-item" class="grow">
            <v-btn @click="deleteEmployee(employee.number)" class="mx-2" small color="red"
              >Delete</v-btn
            >
            <v-btn @click="showEmployeeSet(employee.number)" class="mx-2" small color="green"
              >Show</v-btn
            >
          </v-list-item>
        </v-card-text>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data: () => ({
    headers: [{
        text: 'Employee Number',
        align: 'start',
        sortable: false,
        value: 'number',
        },
        { text: 'Name', value: 'name' },
        { text: 'Role', value: 'role' }
    ],
    newEmployee: {
        number: '',
        name: '',
        role: ''
    },
    employees: []
  }),
  methods: {
    addEmployee() {
      axios
        .post("http://localhost:3000/employee/add", {
          employee: this.newEmployee
        })
        .then(response => {
          this.message = response.data;
        });
      this.newEmployee = {
        number: '',
        name: '',
        role: ''
      };
      this.load()
    },
    showEmployeeSet(employeeNum){
        const updateEmployee = this.employees.find(element => element.number == employeeNum);
        this.newEmployee.number = updateEmployee.number;
        this.newEmployee.name = updateEmployee.name;
        this.newEmployee.role = updateEmployee.role;
    },
    updateEmployee(employeeNum) {
      axios
        .post("http://localhost:3000/employee/update/" + employeeNum, {
          employee: this.newEmployee
        })
        .then(response => {
          console.log(response.data);
        });
      this.newEmployee = {
        number: '',
        name: '',
        role: ''
      };
      this.load()
    },
    deleteEmployee(employeeNum) {
      axios.delete("http://localhost:3000/employee/" + employeeNum).then(response => {
        console.log(response.data);
      });
      this.load()
    },
    load(){
        axios
            .get("http://localhost:3000/employees")
            .then(response => (this.employees = response.data))
            .catch(error => console.log(error));
    }
  },
  created() {
    // fetch employees
    axios
      .get("http://localhost:3000/employees")
      .then(response => (this.employees = response.data))
      .catch(error => console.log(error));
  }
};
</script>