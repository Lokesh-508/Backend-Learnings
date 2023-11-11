const express=require("express");
const app= express();
const jwt =require('jsonwebtoken');
const mongoose =require("mongoose");
const connectDB=require('./connect');
const port =3000;


app.use(express.json());

const secretKey ="superS3cr3t1";


//define mongoose schema

const userSchema =new mongoose.Schema({
    username:String,
    password:String,
    // purchasedCourses:[{type:mongoose.Schema.Tupes.ObjectId,ref:'Course'}]
});

const adminSchema=new mongoose.Schema({
    username:String,
    password:String
});

//define models



const courseSchema =new mongoose.Schema({
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    published:Boolean
})

const User =mongoose.model('User',userSchema);
const Admin=mongoose.model('Admin',adminSchema);
const Course =mongoose.model('Course',courseSchema);

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

// connect mongoose
const MONGO_URI='mongodb+srv://lokeshsunkari508:1235@cluster0.2jolidn.mongodb.net/COURSE-SELLING-EASY?retryWrites=true&w=majority'


const start =async ()=>{
    try{
        await connectDB(MONGO_URI)
        app.listen(3001,console.log(`MOngodb Server is listening on port 3001...`))
    }
    catch(error){
        console.log('Mongodb failed to connect');
        console.log(error);
    }
    }

    start()
app.post('/admin/signup', async(req,res)=>{

     const {username,password}=req.body;
     const admin= await Admin.findOne({username});
     if(admin){
        res.status(403).json({message:'Admin already exists'});
     }else{
        const obj ={username:username,password:password};
        const newAdmin=new Admin(obj);
        await newAdmin.save();
        const token =jwt.sign({username,role:'admin'},secretKey,{expiresIn:'1hr'});
        res.json({mesage:'Admin created sucessfully',token});
     }
});
app.listen(port,()=>{
    console.log('server is listening on port 3000');
});