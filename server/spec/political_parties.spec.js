// const partyData = require('../data/political_parties.js');
import server from '../../index';

const Request = require('request');


describe('Political party', () => {
  const error_data = {
    name: 'OPO',
  };

  const data1 = {
    name: 'OPOL',
    hqAddress: 'KK 23 Ave',
    logoUrl: 'http://localhost:3000/img/1',
  };
  const data2 = {
    name: 'NAME2',
    hqAddress: 'KK 23 Ave',
    logoUrl: 'http://localhost:3000/img/1',
  };


  describe('Create party', () => {
    const URL = 'http://localhost:3000/api/v1/parties/';
    it('should return a status code of 400 and error_message on error', (done) => {
      Request.post(URL, { json: true, body: error_data }, (err, res, body) => {
        expect(res.statusCode).toBe(400);
        expect(body.error).toMatch('All fields are required');
        done();
      });
    });

    it('should retun a status code of 201 and data created', (done) => {
      Request.post(URL, { json: true, body: data1 }, (err, res, body) => {
        expect(res.statusCode).toBe(201);
        expect(body.data.name).toMatch(data1.name);
        done();
      });
    });
  });


  describe('Get all parties', () => {
    const URL = 'http://localhost:3000/api/v1/parties/';
    it('should return all parties', (done) => {
      Request.get(URL, (err, res, body) => {
        expect(res.statusCode).toEqual(200);
        done();
      });
    });
  });


  describe('Get one party', () => {
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/parties/', { json: true, body: data1 }, (err, res, body) => {
        done();
      });
    });

    it('should return a not found', (done) => {
      const URL = 'http://localhost:3000/api/v1/parties/50';
      Request.get(URL, (err, res, body) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
    });

    it('should return a specific party', (done) => {
      const URL = 'http://localhost:3000/api/v1/parties/1';
      Request.get(URL, (err, res, body) => {
        body = JSON.parse(body);
        expect(res.statusCode).toBe(200);
        done();
      });
    });
  });


  describe('edit a specific party', () => {
    beforeAll((done) => {
      Request.post('http://localhost:3000/api/v1/parties/', { json: true, body: data1 }, (err, res, body) => {
        done();
      });
    });

    it('should return a not found', (done) => {
      const URL = 'http://localhost:3000/api/v1/parties/50';
      Request.patch(URL, { json: true, body: data1 }, (err, res, body) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
    });


    it('should return updated party', (done) => {
      const URL = 'http://localhost:3000/api/v1/parties/1';
      Request.get(URL, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
        Request.patch(URL, { json: true, body: data2 }, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(body.data.name).toEqual(data2.name);
        });
        done();
      });
    });
  });


  describe('delete a specific party', () => {
    const URL = 'http://localhost:3000/api/v1/parties/';
    let id = 0;
    beforeAll((done) => {
      Request.post(URL, { json: true, body: data1 }, (err, res, body) => {
        id = body.data.id;
        done();
      });
    });


    // it('should return a specific party', (done) => {
    //   const URL = "http://localhost:3000/api/v1/parties/";
    // 	Request.get(URL,(err,res,body) => {
    // 		console.log(URL+id);
    // 		console.log(body);

    //     body = JSON.parse(body);
    // 		expect(res.statusCode).toBe(200);

    // 		done();
    // 	});
    // 	console.log("##done");

    // });

    it('should delete the specified party', (done) => {
      Request.delete(URL + id, (err, res, body) => {
        expect(res.statusCode).toBe(204);
        done();
        Request.get(URL + id, (err, res, body) => {
          expect(res.statusCode).toBe(404);
          done();
        });
      });
    });
  });
});
