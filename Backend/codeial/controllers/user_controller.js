const User = require("../models/users");

module.exports.profile = (req,res)=>{
    // return res.end('<h1>Users Profile</h1>');


    return res.render('profile',{
        title : 'profile',
    });
};

module.exports.signUp=(req,res)=>{

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('signup',{
        title : 'signup',
    });
};
module.exports.login=(req,res)=>{

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('login',{
        title : 'login',
    });
};

module.exports.create_signup = (req,res)=>{
    if(req.body.password != req.body.C_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},(err,user)=>{
        if (err) {
            console.log('error in finding user in signing up');
            return;
        }
        if (!user) {
            User.create(req.body,(err,user)=>{
                if (err) {
                    console.log('error in creating user in signing up');
                    return;
                }
                return res.redirect('/users/login');
            });
        }else{
            return res.redirect('back');
        }
    });
}


module.exports.create_signin = (req,res)=>{
return res.redirect('/');
}