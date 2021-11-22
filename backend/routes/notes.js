const express = require('express');
const router = express.Router();

router.get('/api/notes', ()=> {
    console.log('notes.');
});

module.exports = router