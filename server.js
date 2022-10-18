// dependencies 
const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.port || 7777;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));
app.use('/', htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
