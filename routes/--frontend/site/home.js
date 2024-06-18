const express = require('express');
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
    res.render('index', { title: 'Home | Recruitment Portal', keywords: '', description: '' });
});

// Export router
module.exports = router;