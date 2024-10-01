// const express = require ('express')
// const mongoose = require ('mongoose')
// const path = require ('path')
// const port = 3019

// constapp =express();

// appendFile.get('/',(req,res)=>{
//     res.send("hello world")
// })

// appendFile.listen(port,()=>{
//     console.log("Sever started")
// })

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();
const port = 3019;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb+srv://mathisha1234:ByUa4uPb8fB2rnrs@mathisha.fvgwjpi.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define a schema
const FormSchema = new mongoose.Schema({
    regd_no: String,
    name: String,
    email: String,
    branch: String,
    school: String,
    industry: String,
    mobile: String,
    province: String,
    district: String,
    city: String,
    gender: String
});

// Define a model
const FormData = mongoose.model('FormData', FormSchema);

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Route to render the form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    const formData = new FormData(req.body);
    
    // Save the data to MongoDB
    formData.save()
        .then(() => res.send('Form submitted successfully!'))
        .catch(err => res.status(400).send('Error saving data: ' + err.message));
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
