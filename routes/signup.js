var mysql = require('mysql');

exports.checksignup=function(req,res){

    console.log("inside checksignup");
  console.log(req.param("email"));
  console.log(req.param("password"));


  //
    //database:Ldv
    console.log("1");
    var connection = mysql.createConnection({
        host     : 'vlmopenstack.cydynx5fnloe.us-west-2.rds.amazonaws.com',
        user     : 'openstackSignup',
        password : 'password',
        database: 'virtuallab',
        port     : '3306'
    });

    console.log("2");



    console.log("3");
    connection.connect(function(err) {
        console.log(err);
        if (err) {
            console.error('Database connection failed: ' + err.stack);
            return;
        }

        console.log('Connected to database.');
    });




    connection.query('SELECT * from users where email = ?',req.param("email"), function(err, check_result){
        if(err) {
            console.log("inside error block");
            res.send({statusCode: 204});
        }
        else
        {
            console.log("the result is ");
           console.log(check_result);

           if(check_result.length>0)
           {
               //

               console.log("email already present");
               res.send({statusCode: 207});


           }
           else
           {
               console.log("4");

               var post ={

                   email: req.param("email"),
                   password: req.param("password")

               };

                connection.query ('INSERT INTO users SET ?',post, function(err2,result){


                if(err2)
                {
                     console.log(err2);
                     res.send({statusCode:204});
                }
                else
                {
                     console.log(result);
                    if(result.affectedRows>0)
                    {
                    console.log("inserted successfully");
                    res.send({statusCode:200});
                    }
                }

                });

               connection.end();


           }



        }
    });

    // if not present then it must be addedc to the database.





















};












