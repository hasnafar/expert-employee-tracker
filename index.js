const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Connect to employee database

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'employeetracker_db'
  },
  console.log(`Connected to the employeetracker_db database.`)
);

const questions=[
  {
    type: 'list',
    name: 'options',
    message: "What would you like to do?",
    choices: ['View All Employees',
  'Add Employee',
  'Update Employee Role',
  'View All Roles',
  'Add Role',
  'View All Departments',
  'Add Department',
  'Quit']
  },
];

function getAnswers() {

  return inquirer.prompt(questions).then((answers) => {

    

   index=questions[0].choices.indexOf(answers.options);
   
   if (index==0)
    getEmployee();
   else if (index==1)
    addEmployee();
   else if (index==2)
    updateEmployee();
   else if (index==3)
    getRoles();
   else if (index==4)
    addRole();
   else if(index==5)
    getDepartment()
   else if (index==6)
    addDepartment();
   else
    return;

 });
}


function getEmployee(){

  db.promise().query('SELECT * FROM employee')
  .then(([rows,fields]) => {
    console.table(rows);
  })
  .then(getAnswers);
  
}

function getDepartment(){

    db.promise().query('SELECT * FROM department')
    .then(([rows,fields]) => {
      console.table(rows);
    })
    .then(getAnswers);
    
}

function getRoles(){

  db.promise().query('SELECT * FROM role')
  .then(([rows,fields]) => {
    console.table(rows);
  })
  .then(getAnswers);
  
}


function addRole(){
  var DEPARTMENTS=[];
  db.query("SELECT name FROM department", function (err, result) {
    if (err) throw err;

    for (var i=0;i<result.length;i++){
    DEPARTMENTS.push(result[i].name);
    }
  });
  const questionsAddRole=[
    {
      type: 'input',
      name: 'roleName',
      message: "Enter the name of the role",
    },
    {
      type: 'input',
      name: 'roleSalary',
      message: "Enter the salary of the role",
    },
    {
      type: 'list',
      name: 'roleDept',
      message: "Enter the department of the role",
      choices: DEPARTMENTS
    },
  ];

  return inquirer.prompt(questionsAddRole).then((answers) => {
    db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.roleName}','${answers.roleSalary}','${DEPARTMENTS.indexOf(answers.roleDept)+1}')`)
    .then(([rows,fields]) => {
      console.log("Added successfully");
    })
    .then(getAnswers);
    })
  
}

function addEmployee(){
  var ROLES=[];
  var MANAGERS_ID=[];
  var MANAGERS_NAMES=[];

  db.query("SELECT title FROM role", function (err, result){
    if (err) throw err;
      for (var i=0;i<result.length;i++){
        ROLES.push(result[i].title);
        }
    })

  db.query("SELECT first_name, last_name, role_id FROM employee", function (err, result) {
 
    for (var i=0;i<result.length;i++){
    MANAGERS_ID.push(result[i].role_id);
    MANAGERS_NAMES.push(result[i].first_name+" "+result[i].last_name);
    }
  });

  const questionsAddEmployee=[
    {
      type: 'input',
      name: 'firstName',
      message: "Enter the first name of the employee",
    },
    {
      type: 'input',
      name: 'lastName',
      message: "Enter the last name of the employee",
    },
    {
      type: 'list',
      name: 'role',
      message: "Enter the role of the employee",
      choices: ROLES
    },
    {
      type: 'list',
      name: 'manager',
      message: "Enter the name of the manager",
      choices: MANAGERS_NAMES
    },
  ];
  
  return inquirer.prompt(questionsAddEmployee).then((answers) => {

  managerIndex=MANAGERS_NAMES.indexOf(answers.manager);
  managerID=MANAGERS_ID[managerIndex];
  
  console.log(managerID);

  db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}','${answers.lastName}','${ROLES.indexOf(answers.role)+1}','${managerID}')`)
  .then(([rows,fields]) => {
    console.log("Added successfully");
  })
  .then(getAnswers);
  }
)}

function addDepartment(){
  const questionsAddDepartment=[
    {
      type: 'input',
      name: 'deptName',
      message: "Enter the name of the department",
    },
  ];
  return inquirer.prompt(questionsAddDepartment).then((answers) => {

  db.promise().query(`INSERT INTO department (name) VALUES ('${answers.deptName}')`)
  .then(([rows,fields]) => {
    console.log("Added successfully");
  })
  .then(getAnswers);
  }
)}


function addEmployee(){
  var ROLES=[];
  var MANAGERS_ID=[];
  var MANAGERS_NAMES=[];

  db.query("SELECT title FROM role", function (err, result){
    if (err) throw err;
      for (var i=0;i<result.length;i++){
        ROLES.push(result[i].title);
        }
    })

  db.query("SELECT first_name, last_name, role_id FROM employee", function (err, result) {
 
    for (var i=0;i<result.length;i++){
    MANAGERS_ID.push(result[i].role_id);
    MANAGERS_NAMES.push(result[i].first_name+" "+result[i].last_name);
    }
  });

  const questionsAddEmployee=[
    {
      type: 'input',
      name: 'firstName',
      message: "Enter the first name of the employee",
    },
    {
      type: 'input',
      name: 'lastName',
      message: "Enter the last name of the employee",
    },
    {
      type: 'list',
      name: 'role',
      message: "Enter the role of the employee",
      choices: ROLES
    },
    {
      type: 'list',
      name: 'manager',
      message: "Enter the name of the manager",
      choices: MANAGERS_NAMES
    },
  ];
  
  return inquirer.prompt(questionsAddEmployee).then((answers) => {

  managerIndex=MANAGERS_NAMES.indexOf(answers.manager);
  managerID=MANAGERS_ID[managerIndex];
  
  console.log(managerID);

  db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.firstName}','${answers.lastName}','${ROLES.indexOf(answers.role)+1}','${managerID}')`)
  .then(([rows,fields]) => {
    console.log("Added successfully");
  })
  .then(getAnswers);
  }
)}

function updateEmployee () {
  var ROLES=[];
  var EMPLOYEE_NAMES=[];
  var EMPLOYEE_ID=[];
  var questionsUpdateEmployee=[];

  var newRoleID;
  var employeeIndex;

  db.promise().query("SELECT title FROM role")
    .then(([result,fields])=> {
      for (var i=0;i<result.length;i++){
        ROLES.push(result[i].title);
        }
      return ROLES;
      })
    db.promise().query("SELECT first_name, last_name, role_id FROM employee")
    .then(([result,fields])=> {
        for (var i=0;i<result.length;i++){
        EMPLOYEE_ID.push(result[i].role_id);
        EMPLOYEE_NAMES.push(result[i].first_name+" "+result[i].last_name);
        }
      return EMPLOYEE_NAMES;
    })
    .then( () => {
    questionsUpdateEmployee=[
      {
        type: 'list',
        name: 'selectEmployee',
        message: "Which Employee do you want to update?",
        choices: EMPLOYEE_NAMES
      },
      {
        type: 'list',
        name: 'newRole',
        message: "Enter the new role of the employee",
        choices: ROLES
      },
    ];
    return (questionsUpdateEmployee);
   })

   .then ( ()=>{

      console.log(questionsUpdateEmployee);
      inquirer.prompt(questionsUpdateEmployee).then((answers) => {
        newRoleID=ROLES.indexOf(answers.newRole)+1;
        employeeIndex=EMPLOYEE_NAMES.indexOf(answers.selectEmployee)+1;
        db.promise().query(`UPDATE employee SET role_id='${newRoleID}' WHERE id='${employeeIndex}'`)
        .then(([rows,fields]) => {
          console.log("Added successfully");
        })
          .then(getAnswers);

      })

    })
 
    
}
 

//Start Program

getAnswers();