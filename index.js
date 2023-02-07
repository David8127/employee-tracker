
const { prompt } = require("inquirer");
const db = require("./db/connection");
const { viewAllDepartments, addDepartment, deleteDepartment } = require('./db/departments');
const { viewAllEmployees, addEmployee, updateEmployeeRole, viewEmployeesByManager, deleteEmployee } = require("./db/employees");
const { viewAllRoles, addRole, deleteRole } = require("./db/roles");

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
                'View employees by manager',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Delete an employee',
                'Delete a department',
                'Delete a role',
                'Exit'
            ]
        }
    ])
    switch (choice) {
        case 'View all departments':
            const departments = await viewAllDepartments()
            console.table(departments)
            break;
        case 'View all roles':
            const roles = await viewAllRoles()
            console.table(roles)
            break;
        case 'View all employees':
            const employees = await viewAllEmployees()
            console.table(employees)
            break;
        case 'View employees by manager':
            const employeesViaManager = await viewEmployeesByManager()
            console.table(employeesViaManager)
            break;
        case 'Add a department':
            const newDepartment = await addDepartment()
            console.table(newDepartment)
            break;
        case 'Add a role':
            const newRole = await addRole();
            console.table(newRole)
            break;
        case 'Add an employee':
            const newEmployee = await addEmployee();
            console.table(newEmployee)
            break;
        case 'Update an employee role':
            const updatedRole = await updateEmployeeRole();
            console.table(updatedRole)
            break;
        case 'Delete an employee':
            const deletedEmployee = await deleteEmployee();
            console.table(deletedEmployee)
            break;
        case 'Delete a department':
            const deletedDepartment = await deleteDepartment();
            console.table(deletedDepartment)
            break;
        case 'Delete a role':
            const deletedRole = await deleteRole();
            console.table(deletedRole)
            break;
    }
}

start();
