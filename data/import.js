const db = require('../app/database');
const bcrypt = require('bcrypt');

const collection = db.then(db => db.collection('list'));

(async () => {
    const salt = await bcrypt.genSalt(10);
    
    (await collection).insertMany([
        {
            firstname: 'Léon',
            lastname: 'De Bruxelles',
            login: 'MouleMarinière',
            password: await bcrypt.hash('toto1234', salt),
            age: 10,
            species: 'Pangolin géant',
            race: 'Manidae',
            food: ['fourmis', 'termites']
        },
        {
            firstname: 'Bruce',
            lastname: 'Lee',
            login: 'Brulee',
            password: await bcrypt.hash('toto12345', salt),
            age: 8,
            species: 'Pangolin moderne',
            race: 'Smutsiinae',
            food: ['fourmis', 'termites']
        },
        {
            firstname: 'Kame',
            lastname: 'Senin',
            login: 'KameSenindu78',
            password: await bcrypt.hash('toto1234', salt),
            age: 2,
            species: 'Pangolin moderne',
            race: 'Manidae',
            food: ['fourmis', 'termites']
        }
    ]);
})();