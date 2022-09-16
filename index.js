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

