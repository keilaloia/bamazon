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
    readProducts();
});

function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);

        promptUser();
    });
}

function promptUser() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "please input the item_id for the product you would like to purchase?"
            },
            {
                name: "quantity",
                type: "input",
                message: "how many of said item would you like to purchase?"
            }

        ])
        .then(function (answer) {

            var query = "SELECT * FROM products WHERE ? = item_id"
            connection.query(query, [answer.id], function(err, res) {
                if(err) throw err;

                // console.log(res[0]);
                if(parseInt(res[0].stock_quantity) - parseInt(answer.quantity) >=0 )
                { 
                    console.log(answer.quantity, answer.id)
                    var queryTwo = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?";
                    connection.query(queryTwo, [parseInt(answer.quantity), parseInt(answer.id)], function(err, ress) 
                    {
                        if(err) throw err;
                        // console.log( "secondRess" ,res[0].price);
                        console.log(`you paid ${parseInt(res[0].price) * parseInt(answer.quantity)} USD`);
                        var queryThree = "UPDATE products SET product_sales = ? * ? WHERE item_id = ?";

                        connection.query(queryThree, [parseInt(answer.quantity), parseInt(res[0].price), parseInt(answer.id)], function(err, ress) 
                        {
                            if(err) throw err;
                            console.log(`your new product list!`);
                            connection.query("SELECT * FROM products", function (err, resss) {
                                if (err) throw err;
                                // Log all results of the SELECT statement
                                console.table(resss);
                                connection.end(); // watch for sync 

                            });

                        });
                    });

                }
                else
                {
                    console.log("We don't have that many in stock human!");
                    connection.end(); // watch for sync 

                }

            });


        });

}