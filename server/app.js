import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import entriesRouter from './routes/entries.js';

dotenv.config();

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.use('/entries', entriesRouter);

// Home route
app.get('/', (req, res) => {
    res.redirect('/entries');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});