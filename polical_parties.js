
const partyData = require('./data/political_parties'); 


const PoliticalParty = {

	create(req, res) {
		if (!req.body.name || !req.body.hqAddress || !req.body.logoUrl) {
			return res.status(404).json({
				status: 404,
				error: 'All fields are required' 
			});
		}
		const politicalParty = partyData.create(req.body);
		return res.status(200).json({
			status: 200,
			data: politicalParty
		});
	},

	getAll(req,res) {
		const politicalParties = partyData.getAll();
		return res.status(200).json({
			status: 200,
			data: politicalParties
		});
  },
  
  getOne(request,res) {
    const politicalParty = partyData.getOne(request.params.id);
    console.log(request.params);
    
    if (!politicalParty) {
      return res.status(404).json({
        status: 404,
        message: "Party not found"
      });
    } 

    return res.status(200).json({
      status: 200,
      data: politicalParty
    });
    
    
  }

};

module.exports = PoliticalParty;