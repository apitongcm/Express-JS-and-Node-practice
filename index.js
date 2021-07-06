const Joi = require('joi'); //modules
const express = require('express');
const app = express();

app.use(express.json()); //middleware

const profiles = [{id:1, name:"About Me"}, 
                    {id:2, name:"My Education"},
                    {id:3, name:"My Work Experience"},
                    { id:4, name:"My Projects"}
                ];


                
//POST or create element in array profiles
app.post('/myself/Carl', (req, res) => {

    // if(!req.body.name || req.body.name.length < 3 ){
    //     res.status(400).send('Name is required and minimum of 3 characters.');
    //     return;
    // }

    const schema = {
        name:Joi.string().min(3).required()
    };
    const result = Joi.validate(req.body, schema);
    console.log(result);

    if(result.error) { 
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const profile = {     //adding an Element inside the profiles Array. 
         id:profiles.length + 1, // indicate that whenever you add you should add 1 to the actual array length. 
         name:req.body.name //you will be using the json middleware for this line of code. 
    };
    profiles.push(profile); //you will push the created profile inside the array of profiles
    res.send(profile); //send it to the browser so you can see it. 
});



app.get('/myself/Carl', (req,res) =>{
    res.send(profiles); //showing all the available data of Carl in profiles array.
});

app.get('/myself/Carl/:id', (req,res) => {
    const profile = profiles.find( c => c.id === parseInt(req.params.id));
    if (!profile) res.status(404).send("The id profile you have given is not define.");
    res.send(profile); //shows the particular data regarding to its id in the constant.
});

app.get( '/', (req , res) => {
    res.send('Hello World');
})

app.get('/api/Ngalan', (req, res) => {
    let arrName = ["Carlo", "Quenchie", "Dan", "Ben","Darla"];
    
    res.send(arrName);
})

// /api/courses/1 
// app.get('/api/Carlpogi/:year/:month' , (req,res) => {
//     res.send(req.params); //calling by localhost:3000/api/Carlpogi/2016/2?sortByName
// });
app.get('/api/Ngalan/:name', (req, res) => {
    res.send(req.query);
});

app.get('/api/Ngalan/:id', (req,res) => {
    res.send(req.query);
})

// PORT
const port = process.env.PORT || 3000; // if ever 3000 is not available in our hosting
app.listen(port, () => console.log(`Success! View it on port ${port}`));