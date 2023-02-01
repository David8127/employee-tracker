const db = require("./connection");

async function viewAllEmployees() {
    try {
        const employees = 
            //fix the SQL query
            await db.promise().query('SELECT * FROM employee LEFT JOIN role ON employee.role_id=role.id')
        return employees[0]
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllEmployees }