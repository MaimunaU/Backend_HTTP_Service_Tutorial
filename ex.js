//Install express: npm install express

const express = require('express');
const app = express();
app.use(express.json());
app.get('/', (req,res)=> {
    res.send('BTHS Software catalog courses for students');
});

const courses = [
    {id: 1, name:'Web Development'},
    {id:2, name: 'IT'},
    {id:3, name: 'Cybersecurity'},
];

//HTTP GET Requests code
app.get('/api/courses', (req,res) => {
    res.send(courses);
})

app.get('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send('The course with the given ID was not found');
        return
    }
    res.send(course);
})

// HTTP POST Requests
app.post('/api/courses', (req,res) => {
    if (req.body.name.length < 3) {
        res.status(404).send("Name must be a minimum of 3 characters");
        return
    }
    const course = {
        id: courses.length +1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
    });

// HTTP PUT Requests
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send('The course with the given ID was not found');
        return
    }
    idx = courses.findIndex(x => x.id == course.id);
    courses[idx] = {id: parseInt(req.body.id), name: req.body.name}
    res.send(courses[idx]);
});

// HTTP DELETE Requests
app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        res.status(404).send('The course with the given ID was not found');
        return
    }
    idx = courses.findIndex(x => x.id == course.id);
    res.send(courses.splice(idx, 1));
})
    
app.listen(3000, () => {
    console.log('Listening on port 3000 ...');
})