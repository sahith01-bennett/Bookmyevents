const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser =require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8080
require('dotenv').config({ path: '.env' });

require('dotenv').config();

const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.static('public'));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb+srv://bsahith2001:F9X2IdaxcdjPpkG4@cluster1.ttgw9ey.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser :true, useCreateIndex: true, useUnifiedTopology:true}).then(()=>{
    console.log("MongoDB connected");
}).catch((error)=>{console.log(error);});
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})
app.use('/events',eventRoutes);
app.use('/users',userRoutes);

app.listen(PORT,()=>{
    console.log('Server is running on port 8080');
});
