
const { prompt } = require("inquirer");
const db = require("./db/connection");

const start = () => {
    console.log("Welcome to the Employee Manager!");
    prompt([
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
}

start();
