const express=require('express');
const app=express();
// const bodyParser =require('body-parser');
const port =3000;


ADMINS=[];
USERS=[];
app.use(express.json());


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




app.listen(port,()=>{
      console.log('Server is listening on port 3000')
});