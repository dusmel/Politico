const express = require('express');
const app = express();
const PoliticalParty = require('./polical_parties');
const PoliticalOffice = require('./political_offices');

app.use(express.json());

app.get('/', (req, res) => {
	res.status(200).send('Welcome to POLITICO');
});

const port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('Listening on port 3000...');
});



// political party routes
app.post('/api/v1/parties', PoliticalParty.create);
app.get('/api/v1/parties', PoliticalParty.getAll);
app.get('/api/v1/parties/:id', PoliticalParty.getOne);
app.put('/api/v1/parties/:id', PoliticalParty.update);
app.delete('/api/v1/parties/:id', PoliticalParty.delete);


// political offices routes
app.post('/api/v1/offices', PoliticalOffice.create);
app.get('/api/v1/offices', PoliticalOffice.getAll);
app.get('/api/v1/offices/:id', PoliticalOffice.getOne);
app.put('/api/v1/offices/:id', PoliticalOffice.update);
app.delete('/api/v1/offices/:id', PoliticalOffice.delete);




module.exports = app;