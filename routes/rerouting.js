var ejs=require('ejs');

exports.pagetwo=function(req,res){

    console.log("inside rerouting in route");




        ejs.renderFile('./views/create_instance.ejs',function(err,result){
            if(!err){
                res.end(result);
            }
            else{
                console.log("error");
            }


        })







};