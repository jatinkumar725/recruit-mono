const express = require('express');
const router = express.Router();

// Define routes
router.use((req, res, next) => {
    res.status(404).render('404', { title: '404 | Recruitment Portal', keywords: '', description: '' });
});

// Export router
module.exports = router;