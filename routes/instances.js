

exports.createInstance=function(req,res)
{

    console.log("inside create Instance");

    console.log(req.param("instance_name"));



    var mysql = require('mysql')
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        port: 3306
    });


    var post = {
        instance_name: req.param("instanceName"),
        no_instance: req.param("instanceNumber"),
        instance_type: req.param("instanceType"),
        sec_domain: req.param("securityDomain")
    };

    connection.query('INSERT INTO instance_desc SET ?', post, function(error,result)
    {
        if(error) {
            console.log('error');
            res.send({statusCode: 204});
        }
        else {
            numRows=result.affectedRows;
            if(numRows>0)
            {
                console.log('success');
                res.send({statusCode: 200});
            }
            else{
                console.log('no changes in the code');
                res.send({statusCode: 400});
            }
        }
    });

    connection.end();



    /*


    var result={
        statusCode:200
    }

    res.send(result);
*/

};