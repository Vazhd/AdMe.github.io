const express =require('express');
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use("/auth", authRouter)


const start =async () => {
  try{
      await mongoose.connect(`mongodb+srv://adilet:1021103@cluster0.u9kr8.mongodb.net/AddMe?retryWrites=true&w=majority`);
      app.listen(PORT, ()=>console.log(`listening on port ${PORT}...`))
  }catch (e){
      console.log(e)
  }
}
start()



