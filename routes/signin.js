var mysql = require('mysql');
exports.checksignin=function(req,res){

    console.log("inside checksignin present in route");
    console.log(req.param("email_signin"));
    console.log(req.param("password_signin"));


    //
    //database
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

    connection.query("SELECT * from users where email ='"+ req.param("email_signin")+"' AND password= '"+req.param("password_signin")+"'", function(err, check_result) {
        console.log("entering the query");
        if (err) {
            console.log("inside error block");
            console.log(err);
            res.send({statusCode: 204});
        }
        else {
            console.log("the result is ");
            console.log(check_result);
            console.log(check_result[0].user_id);

            if (check_result.length > 0) {
                //

                console.log("user  present");
                req.session.user_email=req.param("email_signin");
                req.session.user_id=check_result[0].user_id;
                console.log("user session"+req.session.user_id);
                res.send({statusCode: 200});


            }
            else {
                console.log("4");

                res.send({statusCode: 400});

                connection.end();
            }
        }
    });



            //if user authenticated
    //session create


    //var result={

      //  statusCode:200

  //  };

    //res.send(result);

    //if user  not created
    //statusCode:400

};