const db = require("./connection");
const { prompt } = require("inquirer");

async function viewAllDepartments() {
    try {
        const departments = 
            await db.query('SELECT * FROM department ORDER BY id')
        return departments
    } catch (err) {
        console.log(err)
    }
}

async function addDepartment() {
    try {
        const { name } = await prompt([
            {
                type: "input",
                name: "name",
                message: "What would you like to name this new department?"
            }
        ])
        await db.query(`INSERT INTO department (name) VALUES ("${name}")`)
        const addDepartment = await viewAllDepartments();
        return addDepartment;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllDepartments, addDepartment }