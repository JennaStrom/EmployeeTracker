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
                    name: "View all Departments",
                    value: "view_departments"
                },
                {
                    name: "View all Employees",
                    value: "view_employees"
                },
                {
                    name: "View all Roles",
                    value: "view_roles"
                },
                {
                    name: "Add a Department",
                    value: "add_department"
                },
                {
                    name: "Add a Role",
                    value: "add_role"
                },
                {
                    name: "Add an Employee",
                    value: "add_employee"
                },
                {
                    name: "Update an Employee",
                    value: "update_employee"
                }
            ]
        }
    ]).then(res => {
        let option = res.start
        switch (option) {
            case "view_departments":
                viewDepartments();
                break;
            case "view_employees":
                viewEmployees();
                break;
            case "view_roles":
                viewRoles();
                break;
            case "add_department":
                addDepartment();
                break;
            case "add_role":
                addRole();
                break;
            case "add_employee":
                addEmployee();
                break;
            case "update_employee":
                updateEmployee();
                break;
            default: quit();
        }
    })
}
function viewDepartments() {
    return db.promise().query("SELECT * FROM department;").then(([rows]) => {
        let department = rows;
        console.table(department)
    }).then(() => prompt())
};

function viewEmployees() {
    return db.promise().query("SELECT * FROM employee").then(([rows]) => {
        let employee = rows;
        console.table(employee)
    }).then(() => prompt())
};

function viewRoles() {
    return db.promise().query("SELECT * FROM role").then(([rows]) => {
        let role = rows;
        console.table(role)
    }).then(() => prompt())
};

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "deptartment_name"
    }).then(function (res) {
        db.promise().query("INSERT INTO department (name) VALUES (?)", [res.dpartment_name], function (err, res) {
            if (err) throw err;
            console.table(res)
        }).then(() => prompt())
    })
}

prompt();