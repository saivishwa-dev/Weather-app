const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https')
const PORT = 3000;

//middlewares must be used with app.use in node 
//body parser is a middleware so we have to use the app.use for the bodyparser

app.use(bodyParser.urlencoded({extended:true}));

//get method 
app.get("/",(req,res)=>{
    //res.sendFile is used to send the html file 
    res.sendFile(__dirname+'/index.html');
    
})

//post method: used to add the new data to the server 

app.post("/",(req,res)=>{
    const cityName = req.body.cityName;
    const API_key = '162808968969d6c6fe77bdbfc0dbe7d0';
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+API_key+"&units=metric"
    
    https.get(url, (response)=>{
        // console.log(response.statusCode); //this is for checking purpose
        response.on('data',(data)=>{
            // console.log(data) //consoling the data

            //changing the weather data into json format
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const feels_like = weatherData.main.feels_like;
            const pressure = weatherData.main.pressure;
            const humidity = weatherData.main.humidity;

            //this will prints the data at the command prompt 
            console.log(`Current temperature was ${temperature}`);
            console.log(`current description was ${description}`);
            console.log(`But the temperature feels like ${feels_like}`);
            console.log(`current pressure was ${pressure}`);
            console.log(`current humidity was ${humidity}`);

            //this will show the data at the front end 
            res.write('<h1>Temperature in ' + cityName + temperature + ' degree celcius</h1> ');
            res.write('<h2>Temperature in words at ' + cityName + description + '</h2>')
            res.write('<h2>But the temperature feels like ' + feels_like + '</h2>')
            res.write('<h2>Current pressure & humidity at '+ cityName +  ' is ' + pressure +' & '+ humidity +' </h2> ')
            res.send();
        })
    })
})
app.listen(PORT,()=>{
    console.log(`Server is running @ PORT ${PORT}`)
})