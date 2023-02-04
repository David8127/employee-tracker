const db = require("./connection");
const { prompt } = require("inquirer");
const { viewAllDepartments } = require("./departments");

async function viewAllRoles() {
    try {
        const roles =
            await db.query(`
                SELECT 
                    role.id, 
                    role.title, 
                    role.salary, 
                    department.name AS department 
                FROM role 
                LEFT JOIN department 
                ON role.department_id=department.id`
            )
        return roles
    } catch (err) {
        console.log(err)
    }
}

async function addRole() {
    const departmentData = await viewAllDepartments();
    try {
        const { title, salary, department_id } = await prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of this role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the annual salary for this role?"
            },
            {
                type: "list",
                name: "department_id",
                message: "What department does this new role belong to?",
                choices: departmentData.map((department) => {
                    return {
                        name: department.name,
                        value: department.id
                    }
                })
            },
        ])
        await db.query(
        `INSERT INTO role (title, salary, department_id) 
        VALUES ("${title}", "${salary}", "${department_id}")`
        )
        const addRole = await viewAllRoles();
        return addRole;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllRoles, addRole }