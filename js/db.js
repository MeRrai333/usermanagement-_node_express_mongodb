const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

var dbName = 'myDB';

async function insertData(obj_data) {
    await client.connect();
    console.log('Insert');
    const db = client.db(dbName);
    const collection = db.collection('users');
    try {
        await collection.insertOne(obj_data);
    } catch (error) {
        if (error instanceof MongoServerError) {
            console.log(`Error : ${error}`);
        }
        throw error;
    }
    client.close()
    return 'done.';
}

async function findAll() {
    await client.connect();
    console.log('Find all');
    const db = client.db(dbName);
    const collection = db.collection('users');
    const Result = await collection.find({}).toArray();
    client.close()
    return Result;
}

async function find(id) {
    await client.connect();
    console.log('Find');
    const db = client.db(dbName);
    const collection = db.collection('users');
    const Result = await collection.find({_id: ObjectId(id)}).toArray();
    client.close()
    return Result;
}

async function update(id, data) {
    await client.connect();
    console.log('Update');
    const db = client.db(dbName);
    const collection = db.collection('users');
    const Result = await collection.updateOne({ _id: ObjectId(id) }, { $set: {Fname: data.Fname, Lname: data.Lname, Age: data.Age, DoB: data.DoB, DoB_Format: data.DoB_Format} });
    client.close()
    return Result;
}

async function remove(id) {
    await client.connect();
    console.log('Delete');
    const db = client.db(dbName);
    const collection = db.collection('users');
    const Result = await collection.deleteOne({ _id: ObjectId(id) })
    client.close()
    return Result;
}

module.exports = { insertData, findAll, find, update, remove }