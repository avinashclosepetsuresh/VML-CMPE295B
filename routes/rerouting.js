var ejs=require('ejs');

exports.pagetwo=function(req,res){

    console.log("inside rerouting in route");





        if(req.session.user_id!=undefined)
        {

            ejs.renderFile('./views/create_instance.ejs',function(err,result){
                if(!err){
                    res.end(result);
                }
                else{
                    console.log("error");
                }


            })

        }
        else
        {

            res.redirect('/');

        }









};