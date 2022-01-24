const User = require("../models/users");

module.exports.profile = (req,res)=>{
    // return res.end('<h1>Users Profile</h1>');
    User.findById(req.params.id,(err,user)=>{
        return res.render('profile',{
            title : 'profile',
            profile_user : user,
        });

    })
};

module.exports.update = async (req,res)=>{
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,(err,user)=>{
    //         return res.redirect('back');
    //     });
    // }
    // else{
    //     return res.status(401).send('Unauthorised');
    // }

    if(req.user.id == req.params.id){
        try {
            
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if (err) {
                    console.log('****Multer ERROR: ',err );
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    //This is saving the path of the upload file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                // console.log(req.file);// to check whether uploaded or not when uploaded
                user.save();
                return res.redirect('back');
            })

        } catch (err) {
            req.flash("error", err);
            return res.redirect('back');
        }

    }else{
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
}

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
    req.flash('success','Logged in Successfully');
return res.redirect('/');
}

module.exports.signout = (req,res)=>{
    req.logout();// it is to remove the cookie that was used through passport library
    req.flash('success','You have Logged out ');
    return res.redirect('/');
}