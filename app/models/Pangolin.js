const db = require('../database');

const { ObjectId } = require('mongodb');

const collection = db.then(db => db.collection('list'));

class Pangolin {
    constructor(data) {
        for(const prop in data){
            this[prop] = data[prop];
        }
    }

    static async findAll() {
        const pangolinsCursor = await (await collection).find();
        const pangolins = await pangolinsCursor.toArray();
        return pangolins.map(pangolin => new Pangolin(pangolin));
    }

    static async findByLogin(login) {
        const pangolin = await (await collection).findOne({ "login": login });
        return new Pangolin(pangolin);
    }

    static async findByEmail(email) {
        const pangolin = await (await collection).findOne({ "email": email });
        return new Pangolin(pangolin);
    }

    static async findById(id) {
        const pangolin = await (await collection).findOne({ "_id": new ObjectId(id) });
        return new Pangolin(pangolin);
    }

    static async findByIdAndUpdate(id, data) {
        const pangolinUpdateResult = await (await collection).updateOne(
            { "_id": new ObjectId(id) },
            { $set: data }
        );

        return pangolinUpdateResult.modifiedCount;
    }
    
    static async findByIdAndUpdateFriend(id, data) {
        const pangolinUpdateResult = await (await collection).updateOne(
            {
                "_id": new ObjectId(id)
            },
            { $push: {
                friends: data
            } }
        );

        return pangolinUpdateResult.modifiedCount;
    }

    static async findByIdAndRemoveFriend(id, data) {
        try {
            const pangolinUpdateResult = await (await collection).updateOne(
            {
                "_id": new ObjectId(id)
            },
            { $pull: { friends: { "id": data.id } } },
            { new: true}
            );

            return pangolinUpdateResult.modifiedCount;
        } catch (e) {
            console.log(e);
        }
    }

    async create() {
        const result = await (await collection).insertOne(this);
        return result.ops[0];
    }
}

module.exports = Pangolin;