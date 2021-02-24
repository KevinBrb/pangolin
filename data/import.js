const db = require('../app/database');
const bcrypt = require('bcrypt');

const collection = db.then(db => db.collection('list'));

(async () => {
    const salt = await bcrypt.genSalt(10);
    
    (await collection).insertMany([
        {
            login: 'MouleMarinière',
            description: 'Coucou moi j\'ai une passion pour les moules !',
            password: await bcrypt.hash('toto1234', salt),
            email: 'fan2moule@hotmail.fr',
            age: 10,
            species: 'Pangolin géant',
            race: 'Manidae',
            food: ['fourmis', 'termites'],
            friends: [],
        },
        {
            login: 'Brulee',
            description: 'The worthy son of broly and Bruce Lee, don\'t ask me if it\'s possible...',
            password: await bcrypt.hash('toto12345', salt),
            email: 'kamehabigboss@outlook.fr',
            age: 8,
            species: 'Pangolin moderne',
            race: 'Smutsiinae',
            food: ['fourmis', 'termites'],
            friends: [],
        },
        {
            login: 'KameSenindu78',
            description: 'Alone on my Island, searching for some company',
            password: await bcrypt.hash('toto1234', salt),
            email: 'kamesenindu78@gmail.com',
            age: 2,
            species: 'Pangolin moderne',
            race: 'Manidae',
            food: ['fourmis', 'termites'],
            friends: [],
        }
    ]);
})();