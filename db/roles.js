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

async function deleteRole() {
    const roles = await viewAllRoles();
    try {
        const { deleted_role } = await prompt([
            {
                type: "list",
                name: "deleted_role",
                message: "Which role would you like to delete from the database?",
                choices: roles.map((r) => {
                    return {
                        name: `${r.title}`,
                        value: r.id
                    }
                })
            },
        ])
        await db.query(`DELETE FROM role WHERE id="${deleted_role}"`)
        const deleteRole = await viewAllRoles();
        return deleteRole;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllRoles, addRole, deleteRole }