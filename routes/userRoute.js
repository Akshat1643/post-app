const express = require('express');
const user_route = express();
const session = require ("express-session")
user_route.use(session({secret:"shhh"}))
const auth = require("../middlewares/auth")
user_route.set('view engine','ejs')
user_route.set('views','./views/users')
const bodyParser = require('body-parser')
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));
const multer = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../public/userImages'));
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
})
const upload = multer({storage:storage})
 const userContoller = require('../controllers/userController')
user_route.get("/",userContoller.home_page)
user_route.get('/register',auth.isLogOut,userContoller.loadRegister) 
user_route.post('/register',upload.single('image'),userContoller.insertUser) 
user_route.get('/verify', userContoller.verifyMail)
user_route.get('/login',auth.isLogOut, userContoller.login_user)
user_route.post('/login',userContoller.login) 
user_route.get('/main',auth.isLoggedIn,userContoller.main)
user_route.get('/logout',auth.isLoggedIn,userContoller.logout_user)
user_route.get("/forget_password",userContoller.forgetload)
user_route.post('/forget',userContoller.changepassword)
user_route.get('/forget-password',auth.isLogOut,userContoller.forget_password)
user_route.post('/reset',auth.isLogOut,userContoller.reset)
user_route.post('/create-post',auth.isLoggedIn,userContoller.create_post)
user_route.get('/post/:id',auth.isLoggedIn,userContoller.posts)
user_route.post('/unlock-post',auth.isLoggedIn,userContoller.unlockpost)
user_route.get('/chat',auth.isLoggedIn,userContoller.chat)
module.exports = user_route;
