const db = require("./connection");

async function viewAllEmployees() {
    try {
        const employees =
            //fix the SQL query
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

module.exports = { viewAllEmployees }