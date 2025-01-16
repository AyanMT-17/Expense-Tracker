import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// View all entries
router.get('/', async (req, res) => {
    const result = await query('SELECT * FROM entries ORDER BY id DESC');
    res.render('index', { entries: result.rows });
});

// Add a new entry (form)
router.get('/add', (req, res) => {
    res.render('add');
});

// Handle new entry submission
router.post('/', async (req, res) => {
    const { type, category, amount, description } = req.body;
    await query('INSERT INTO entries (type, category, amount, description) VALUES ($1, $2, $3, $4)', [type, category, amount, description]);
    res.redirect('/entries');
});

// Edit an entry (form)
router.get('/edit/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID');
    }
    const result = await query('SELECT * FROM entries WHERE id = $1', [id]);
    res.render('edit', { entry: result.rows[0] });
});

// Handle entry update
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID');
    }
    const { type, category, amount, description } = req.body;
    await query('UPDATE entries SET type = $1, category = $2, amount = $3, description = $4 WHERE id = $5', [type, category, amount, description, id]);
    res.redirect('/entries');
});

// Delete an entry
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).send('Invalid ID');
    }
    await query('DELETE FROM entries WHERE id = $1', [id]);
    res.redirect('/entries');
});

export default router;