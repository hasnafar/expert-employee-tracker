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



//Start Program

getAnswers();