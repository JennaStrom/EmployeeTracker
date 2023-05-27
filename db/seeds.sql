USE employee_db;

INSERT INTO department 
(name)
VALUES 
("Engineering"),
("Finance"),
("Legal"),
("Sales");

INSERT INTO role 
(title, salary, department_id)
VALUES
("Lead Engineer", 100000, 1),
("Software Engineer", 80000, 1),
("Account Manager", 80000, 2),
("Accountant", 70000, 2),
("Legal Team", 90000, 3),
("Sales Lead", 100000, 4),
("Salesperson", 80000, 4),
("Lawyer", 110000, 3);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Jenna", "Capperton", 1, NULL),
("Alex", "Smith", 1, 1),
("Ben", "Johnson", 3, NULL),
("Felix", "Hanson", 4, NULL),
("Greg", "Miller", 4, 3);
