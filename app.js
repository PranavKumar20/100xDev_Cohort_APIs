const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.js");
})

app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    return res.status(400).json({ error: 'Both num1 and num2 must be valid numbers' });
  }

  const sum = num1 + num2;

  res.json({ sum });
});

const generateRandomSchedules=()=>{
    const schedules = [
        {
            "title":"Go to gym",
            "description":"Go to gym at 07:00 am"
        },
        {
            "title":"Go to class",
            "description":"Go to class at 09:00 am"
        },
        {
            "title":"Go to canteen",
            "description":"Go to canteen at 12:00 am"
        },
        {
            "title":"Go to playground",
            "description":"Go to playground at 04:00 am"
        },
        {
            "title":"Go to mess",
            "description":"Go to mess at 08:00am and 02:00pm and 08:00pm"
        }
    ]

    const arraySize = Math.floor(Math.random()*(schedules.length-1))+1;
    const randomSchedules=[];

    for(let i=0;i<arraySize;i++){
        const randomIndex = Math.floor(Math.random()*schedules.length);
        randomSchedules.push(schedules[randomIndex]);
    }
    return randomSchedules;
}

app.get('/getschedules',(req,res)=>{
    const randomSchedules = generateRandomSchedules();
    res.json({schedule:randomSchedules});
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
