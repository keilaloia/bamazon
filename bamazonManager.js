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
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            },

        ])
        .then(function (answer) {
            // console.log(answer);

            switch (answer.prompt) {
                case "View Products for Sale":

                    basicQuery("SELECT * FROM products");
                    break;

                case "View Low Inventory":
                    basicQuery("SELECT * FROM products WHERE stock_quantity <= 5");
                    break;

                case "Add to Inventory":
                    addToinventory();
                    break;

                case "Add New Product":
                    createProduct();
                    break;
                default:
                    console.log("something has broken!");
                    break;

            }

        });

}

function createProduct()
{
    inquirer
    .prompt([
        {
            name: "name",
            type: "input",
            message: "please input the new product name!"
        },
        {
            name: "department",
            type: "input",
            message: "please input the department for the new product!"
        },
        {
            name: "price",
            type: "input",
            message: "please input the price for the new product!"
        },
        {
            name: "quantity",
            type: "input",
            message: "please input the quantity for the new product!"
        }

    ])
    .then(function (answer) {

            connection.query("INSERT INTO products SET ?",
            {
              product_name: answer.name,
              department_name: answer.department,
              price: parseInt(answer.price),
              stock_quantity: parseInt(answer.quantity)
            },
            function(err, res)
            {
                if(err) throw err;
                console.log("Product Added");
                basicQuery("SELECT * FROM products");

            }
        );
        
    });
}

function addToinventory() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "please input the item_id for the product you would like to add!\n"
            },
            {
                name: "quantity",
                type: "input",
                message: "how many of said item would you like to add?\n"
            }

        ])
        .then(function (answer) {

            var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?";
            connection.query(query, [parseInt(answer.quantity), parseInt(answer.id)], function (err, res) 
            {
                if (err) throw err;

                console.log("Your new inventory is! \n")
                basicQuery("SELECT * FROM products");
            });

        });

}

function basicQuery(query) {
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        connection.end(); // watch for sync 
    });
}
