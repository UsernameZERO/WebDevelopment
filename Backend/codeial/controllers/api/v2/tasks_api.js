
module.exports.tasks = function(req,res){
    return res.json(200,{
        message: "List of tasks",
        tasks: []
    });
}