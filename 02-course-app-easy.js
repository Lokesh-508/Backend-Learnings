const express=require('express');
const app=express();
// const bodyParser =require('body-parser');
const port =3000;

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

const adminAuthentication =(req,res,next)=>{
      const {username,password}=req.headers;
     

      // const {username,password}= { username: 'saitejackoti508@gmail.com', password: '585'};
      const admin=ADMINS.find(a=>a.username===username && a.password===password)
      if(admin){
        next();
      }else{
        res.status(403).json({message:'Admin authentication failed'});
      }

      console.log(ADMINS);
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
        res.json({message:'Admin created successfully'});
    }
});

app.post('/admin/login',adminAuthentication,(req,res)=>{
      res.json({message:'Logged in sucessfully'});  
});


app.post('/admin/courses',adminAuthentication,(req,res)=>{
  const course=req.body;
  // you can do validations befaore adding to courses

  course.id=Date.now();
  COURSES.push(course);
  res.json({message:'Course created successfully',courseId:course.id});
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