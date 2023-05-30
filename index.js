const inquirer = require("inquirer");
// const { listenerCount } = require("process");
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
                },
                {
                    name: "Delete an Employee",
                    value: "delete_employee"
                },
                {
                    name: "Delete a Department",
                    value: "delete_department"
                },
                {
                    name: "Delete a Role",
                    value: "delete_role"
                },
                {
                    name: "Quit",
                    value: "quit"
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
            case "delete_employee":
                deleteEmployee();
                break;
            case "delete_department":
                deleteDepartment();
                break;
            case "delete_role":
                deleteRole();
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
        name: "name"
    }).then(function (res) {
        db.promise().query("INSERT INTO department (name) VALUES (?)", [res.name], function (err, res) {
            if (err) throw err;
            console.table(res)
        }).then(() => prompt())
    })
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the title of the role you wold like to add?",
            name: "roleTitle"
        },
        {
            type: "input",
            message: "What is the salary of the role?",
            name: "roleSalary"
        },
        {
            type: "input",
            message: "What is the department ID number for this role?",
            name: "deptID"
        },
    ]).then(function (res) {
        db.promise().query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [res.roleTitle, res.roleSalary, res.deptID], function (err, res) {
            if (err) throw err;
            console.table(res)
        }).then(() => prompt())
    })
};

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Please enter the first name of the new employee.",
            name: "emp_first_name"
        },
        {
            type: "input",
            message: "Please enter the last name of the new employee.",
            name: "emp_last_name"
        },
        {
            type: "input",
            message: "What is the employee's role id number?",
            name: "emp_role_id"
        },
        {
            type: "input",
            message: "What is the manager id number?",
            name: "emp_man_id"
        }
    ]).then(function (res) {
        db.promise().query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.emp_first_name, res.emp_last_name, res.emp_role_id, res.emp_man_id], function (err, res) {
            if (err) throw err;
            console.table(res)
        }).then(() => prompt())
    })
};

function updateEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "Which employee's role would you like to update?",
            name: "emp_update"
        },
        {
            type: "input",
            message: "What is their new role ID?",
            name: "emp_role_update"
        }
    ]).then(function (res) {
        db.promise().query("UPDATE employee SET role_id=? WHERE first_name=?", [res.emp_role_update, res.emp_update], function (err, res) {
            if (err) throw err;
            console.table(res)
        }).then(() => prompt())
    })
};

function deleteEmployee() {
    inquirer.prompt({
        type: "input",
        message: "Which employee would you like to delete?",
        name: "delete_employee"
    }).then(function (res) {
        db.promise().query("DELETE FROM employee WHERE first_name=?", [res.delete_employee], function (err, res) {
            if (err) throw err;
            console.table(res)
        }).then(() => prompt())
    })
};

function deleteDepartment() {
    inquirer.prompt({
        type: "input",
        message: "Which Department would you like to delete?",
        name: "delete_department"
    }).then(function (res) {
        db.promise().query("DELETE FROM department WHERE name=?", [res.delete_department], function (err, res) {
            if (err) throw err;
            console.table(res)
        }).then(() => prompt())
    })
};

function deleteRole() {
    inquirer.prompt({
        type: "input",
        message: "Which Role would you like to delete?",
        name: "delete_role"
    }).then(function (res) {
        db.promise().query("DELETE FROM role WHERE title=?", [res.delete_role], function (err, res) {
            if (err) throw err;
            console.table(res)
        }).then(() => prompt())
    })
};


function quit() {
    process.exit();
}

prompt();