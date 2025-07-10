
const express = require('express');

const app = express();

const PORT = 3001;



app.get('/api/health', (req, res) => {

  res.json({ status: 'OK', message: 'Backend is running!' });

});



app.listen(PORT, () => {

  console.log(`Backend server running on port ${PORT}`);

});

