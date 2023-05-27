const inquirer = require("inquirer");
const { listenerCount } = require("process");
const db = require("./db/connection.js");

function prompt() {
    inquirer.prompt([
        {
            type: "list",
            name: "start",
            message: "What do you want to do?",
            choices: [
                {
                    name: "view all departments",
                    value: "view_departments"
                }
            ]
        }
    ]).then(res => {
        let option = res.start
        switch (option) {
            case "view_departments":
                viewDepartments();
                break;
            // case "view_roles":
            //     viewRoles;
            //     break;
            default: quit();
        }
    })
}
function viewDepartments() {
    return db.promise().query("SELECT * FROM department;").then(([rows]) => {
        let department = rows;
        console.table(department)
    }).then(()=> prompt())
}
prompt();