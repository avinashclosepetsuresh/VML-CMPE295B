

exports.createInstance=function(req,res)
{

    console.log("inside create Instance");

    console.log(req.param("instance_name"));

    var result={
        statusCode:200
    }

    res.send(result);

};