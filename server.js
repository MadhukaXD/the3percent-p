const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors')


const nDate = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Calcutta'
});

console.log(nDate);

//Connect database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
  }))

app.get('/', (req, res) => res.send('API running'));

// define route
app.use('/api/programme', require('./routes/api/programme'));

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));