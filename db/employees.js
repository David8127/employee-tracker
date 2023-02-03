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
                role.title AS job title,
                department.name AS department,
                role.salary,

            FROM employee 
            LEFT JOIN employee 
            ON role.id=employee.role_id
            LEFT JOIN role
            ON role.department_id=department.name
            `)
        return employees
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllEmployees }