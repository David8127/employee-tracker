
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments } = require('./db/departments');
const { viewAllEmployees } = require("./db/employees");
const { viewAllRoles } = require("./db/roles");

const start = async () => {
    console.log("Welcome to the Employee Manager!");
    const { choice } = await prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])
    switch (choice) {
        case 'View all departments':
            const departments = await viewAllDepartments()
            return console.table(departments)
        case 'View all roles':
            const roles = await viewAllRoles()
            return console.table(roles)
        case 'View all employees':
            const employees = await viewAllEmployees()
            return console.table(employees)
    }
    
}

start();
