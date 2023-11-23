const express=require('express');
const cors=require('cors');
const nodemon =require('nodemon')
const app=express();


const jwt =require('jsonwebtoken');
const port =3000;
app.use(cors());

app.use(express.json());
let ADMINS=[{
    "username":"lokeshsunkari508@gmail.com",
    "password":"1234"

}];


let USERS=[{
    "username":"lokeshsunkari508@gmail.com",
    "password":"1234"

}];

let COURSES=[];


// you can remove arrays and move to files like admins.json,users.json to get data peristed 
// admins.json
// users.json
//courses.json

const secretKey ="superS3cr3t1";

const generateJwt =(user)=>{
    const payload ={username:user.username};
    return jwt.sign(payload,secretKey,{expiresIn:'1h'});
};
    const authenticateJwt =(req,res,next)=>{
const authHeader =req.headers.authorization;

         if(authHeader){
            const token =authHeader.split('')[1];

            jwt.verify(token,secretKey,(err,user)=>{
                if(err){
                    console.error('JWT Verification Error:', err);

                    return res.sendStatus(403);
                }
                req.user =user;
                next();
            });
         }else{

            console.error('Authorization Header Missing');
            res.sendStatus(401);
         }
    };





    const userAuthentication =(req,res,next)=>{
        const {username,password}=req.headers;
        const user=USERS.find(a=>a.username===username && a.password===password)
        if(user){
          next();
        }else{
          res.status(403).json({message:'user authentication failed'});
        }

        console.log(USERS);
      };


app.post('/admin/signup',(req,res)=>{
    const admin=req.body;
    const existingAdmin=ADMINS.find(a=>a.username===admin.username);
    if(existingAdmin){
        res.status(403).json({message:'Admin already exists'});
    }else{
        ADMINS.push(admin);
          const token =generateJwt(admin);
        res.json({message:'Admin created successfully',token});
        
    }
    console.log(admin);
});

app.post('/admin/login',(req,res)=>{
    const {username,password}=req.headers;
     

   
    const admin=ADMINS.find(a=>a.username===username && a.password===password)
    if(admin){
     const token=generateJwt(admin);
     res.json({message:'Logged in sucessfully',token});
    }else{
      res.status(403).json({message:'Admin authentication failed'});
    }

    console.log(ADMINS); 
});


app.post('/admin/courses',authenticateJwt,(req,res)=>{
    // console.log(req.user.username);
  const course=req.body;
  // you can do validations befaore adding to courses

  course.id=COURSES.length+1;
  COURSES.push(course);
  res.json({message:'Course created successfully',courseId:COURSES.length});
})


app.get('/admin/courses',(req,res)=>{
  res.json({courses:COURSES});
});


app.post('/user/signup',(req,res)=>{
    const user=req.body;
    const existingUser=USERS.find(a=>a.username===user.username);
    if(existingUser){
        res.json('User already Logged in');
    }else{
        USERS.push(user);
        res.json('user created sucessfully');
    }

    console.log(USERS);
});


app.post('/user/login',userAuthentication,(req,res)=>{
    res.json('User already existe');
})




app.listen(port,()=>{
      console.log('Server is listening on port 3000')
});