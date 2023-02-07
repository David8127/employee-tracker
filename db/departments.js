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

async function deleteDepartment() {
    const departments = await viewAllDepartments();
    try {
        const { deleted_dept } = await prompt([
            {
                type: "list",
                name: "deleted_dept",
                message: "Which department would you like to delete from the database?",
                choices: departments.map((d) => {
                    return {
                        name: `${d.name}`,
                        value: d.id
                    }
                })
            },
        ])
        await db.query(`DELETE FROM department WHERE id="${deleted_dept}"`)
        const deleteDepartment = await viewAllDepartments();
        return deleteDepartment;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { viewAllDepartments, addDepartment, deleteDepartment }