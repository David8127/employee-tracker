const db = require("./connection");
const { prompt } = require("inquirer");
const { viewAllRoles } = require("./roles");

async function viewAllEmployees() {
    try {
        const employees =
            await db.query(`
                SELECT 
                    employee.id,
                    employee.first_name,
                    employee.last_name,
                    employee.manager_id,
                    role.title,
                    role.salary,
                    department.name AS department
                FROM employee
                LEFT JOIN role ON employee.role_id=role.id
                LEFT JOIN department ON role.department_id=department.id
                `)
        return employees
    } catch (err) {
        console.log(err)
    }
}

async function addEmployee() {
    const employees = await viewAllEmployees();
    const roles = await viewAllRoles();
    try {
        const { first_name, last_name, role_title, manager } = await prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is their last name?"
            },
            {
                type: "list",
                name: "role_title",
                message: "What is the employe's role?",
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                })
            },
            {
                type: "list",
                name: "manager",
                message: "Who is this employee's manager?",
                choices: employees.map((employee) => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }
                })
            },
        ])
        await db.query(`
            INSERT INTO employee (first_name, last_name, role_id, manager_id ) 
            VALUES ("${first_name}", "${last_name}", "${role_title}", "${manager}")`
        )
        const addEmployee = await viewAllEmployees();
        return addEmployee;
    } catch (err) {
        console.log(err)
    }
}

async function updateEmployeeRole() {
    const employees = await viewAllEmployees();
    const roles = await viewAllRoles();
    try {
        const { employee, newRole } = await prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee's role are you updating?",
                choices: employees.map((employee) => {
                    return {
                        name: `${employee.first_name} ${employee.last_name} ` ,
                        value: employee.id
                    }
                })
            },
            {
                type: "list",
                name: "newRole",
                message: "What is their new role?",
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                })
            },
        ])
        await db.query(`UPDATE employee SET role_id = "${newRole}" WHERE id = "${employee}" `)
        const updatedRole = await viewAllEmployees();
        return updatedRole;
    } catch (err){
        console.log(err)
    }
}

module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole }