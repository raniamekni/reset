const express = require ("express")
const mongoose = require ("mongoose")


const app =express()


mongoose.connect('mongodb://localhost:27017/contactList', 
	{
	 useNewUrlParser: true,
	 useUnifiedTopology: true,
	})
.then(()=>{
	console.log('DB CONNECTED');
	})
.catch((error)=>{
	console.log( error);
	})

app.use(express.json())
app.use(require("./routes"))






 const PORT = process.env.PORT || 5000;

 app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`))