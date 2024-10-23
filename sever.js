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
const dbURI = 'mongodb+srv://mathisha1234:ByUa4uPb8fB2rnrs@mathisha.fvgwjpi.mongodb.net/form?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
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

    
    household_people: Number,
    household_ages: String, // We'll use a string or text to capture the ages and genders
    main_occupation: String,
    other_occupation: String,
    income: Number, // Monthly household income

    // Daily Life and Challenges
    daily_challenges: String, // Main challenges in daily life
    expense_management: String, // How they manage household expenses
    monthly_costs: String, // Major monthly costs
    access_services: String, // Access to essential services

    // Income and Livelihood
    primary_income: String, // Primary source of income
    additional_income: String, // Additional income sources
    income_change: String, // How income has changed over the past year

    // Additional fields can be uncommented or added here as needed
    // school: String,
    // industry: String,
    // mobile: String,
    // province: String,
    // district: String,
    // city: String,
    // gender: String
});

// Define a model
const FormData = mongoose.model('FormData', FormSchema);

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname)));

// Route to render the form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Serve the index.html (homepage)
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    console.log(req.body); // Log the form data to check if it's being received properly

    const formData = new FormData(req.body);

    // Save the data to MongoDB
    formData.save()
        .then(() => {
            console.log("Form data saved successfully");
            // Send a page with a success popup message
            res.send(`
                <script>
                    alert("Submitted successfully!");
                    window.location.href = '/index';
                </script>
            `);
        })
        .catch(err => res.status(400).send('Error saving data: ' + err.message));
});

// Fetch and display all submissions (for testing or admin view)
app.get('/submissions', async (req, res) => {
    try {
        const submissions = await FormData.find(); // Get all the form submissions
        res.json(submissions); // Respond with the submissions in JSON format
    } catch (err) {
        res.status(500).send('Error fetching submissions: ' + err.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
