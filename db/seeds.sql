USE employee_db;

INSERT INTO department 
(name)
VALUES 
("Tech"),
("Manager");

INSERT INTO role 
(title, salary, department_id)
VALUES
("worker", 80000, 1);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("Jenna", "Strom", 1, NULL);
