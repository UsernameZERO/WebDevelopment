const User = require("../models/users");

module.exports.profile = (req,res)=>{
    // return res.end('<h1>Users Profile</h1>');

    // return res.render('profile',{
    //     title : 'profile',
    // })

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,(err,user)=>{
           if (user) {
            return res.render('profile',{
                title : 'User profile',
                user : user,
            });
           }else{
               return res.redirect('/users/signin');
           }
        });
    }else{
        return res.redirect('/users/signin');
    }
};

module.exports.signUp=(req,res)=>{
    return res.render('signup',{
        title : 'signup',
    })
};

module.exports.login=(req,res)=>{
    return res.render('login',{
        title : 'login',
    })
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
                return res.redirect('/users/signin');
            });
        }else{
            return res.redirect('back');
        }
    });
}
module.exports.create_signin = (req,res)=>{
    // Steps to authenticate
    // find the user
    User.findOne({email : req.body.email},(err,user)=>{
        if (err) {
            console.log('error in finding email in sign in');
            return;
        }
        // handle the user
        if(user){
            // password mismatch
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            //create cookies to it
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else{
            //handle user not found
            return res.redirect('back');
        }
    });
}

// module.exports.signOut = (res,req)=>{
//    // console.log(req.cookie.user_id);
//     req.cookie('user_id',"");
//     res.clearCookie('user_id');
//     return res.redirect('/users/signin');
// }