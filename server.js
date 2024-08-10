const express = require('express');
const articleRouter = require('./routes/articles');
const Article = require('./models/article');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();

// Connect to MongoDB with options and error handling
mongoose.connect('mongodb://localhost/bharatInternDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Set up views directory and engine
app.set('views', './views'); // Ensure this matches the actual folder structure
app.set('view engine', 'ejs');

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Define routes
app.get('/', async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: 'desc' });
        res.render('articles/index', { articles: articles });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.use('/articles', articleRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
