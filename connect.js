const mongoose =require('mongoose')
const url='mongodb+srv://lokeshsunkari508:1235@cluster0.2jolidn.mongodb.net/COURSE-SELLING-EASY?retryWrites=true&w=majority'

const connectDB =(url) =>{
  return  mongoose
.connect(url,{
    useNewUrlParser:true,
    
    
    useUnifiedTopology:true,
})
}


module.exports =connectDB