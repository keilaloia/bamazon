var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    promptUser();
});

function promptUser() {
    inquirer
        .prompt([
            {
                name: "prompt",
                type: "list",
                message: "what would you like to do?",
                choices: ["View Product Sales by Department", "Create New Department"]
            },

        ])
        .then(function (answer) {
            // console.log(answer);

            switch (answer.prompt) {
                case "View Product Sales by Department":

                    basicQuery("SELECT departments.department_name,SUM(products.product_sales)AS department_sales FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_name");

                    // basicQuery("SELECT * FROM departments");
                    break;

                case "Create New Department":
                    basicQuery("SELECT * FROM products WHERE stock_quantity <= 5");
                    break;
                default:
                    console.log("something has broken!");
                    break;

            }

        });
}

function basicQuery(query) {
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end(); // watch for sync 
    });
}

function viewQuery(query, arr) {
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end(); // watch for sync 
    });
}