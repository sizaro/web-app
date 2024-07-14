// controllers/userController.js
const { getDb } = require('../database/mongoDB');
const { ObjectId } = require('mongodb');

const getInfo = {}
const userCollection = 'users';

const oauthUserCollection = `oauthusers`

getInfo.getAllUsers = async (req, res) => {
    const results = await getDb().db().collection(userCollection).find();
    results.toArray().then((objects) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(objects);
    });
};

getInfo.getUserById = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const results = await getDb().collection(userCollection).findOne({ _id: userId });
    if (!results) {
        return res.status(404).json({ error: "User not found" });
    }
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(results);
};

getInfo.createUserFromForm = async (req, res) => {
    const user = {
        username:req.body.username,
        email: req.body.email,
        password:req.body.password
    };
    const results = await getDb().db().collection(userCollection).insertOne(user);
    if(results.acknowledged){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while creating the user');
    }
};

getInfo.updateUser = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        password:req.body.password
    };
    const results = await getDb().collection(userCollection).replaceOne({_id: userId}, user);
    if(results.modifiedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
};

getInfo.deleteUser = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const results = await getDb().collection(userCollection).deleteOne({_id: userId});
    if(results.deletedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(results.error || 'Some error occurred while deleting the user');
    }
};


//oauth user collection 
getInfo.getAllUsersOauth = async (req, res) => {
    const results = await getDb().collection(oauthUserCollection).find();
    results.toArray().then((objects) => {
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(objects);
    });
};

getInfo.getUserByIdOauth = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const results = await getDb().collection(oauthUserCollection).findOne({ _id: userId });
    if (!results) {
        return res.status(404).json({ error: "User not found" });
    }
    res.setHeader("Content-Type", "application/json")
    res.status(200).json(results);
};

getInfo.createUserFromFormOauth = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const results = await getDb().collection(oauthUserCollection).insertOne(user);
    if(results.acknowledged){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while creating the user');
    }
};

getInfo.updateUserOauth = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const user = {
        username: req.body.username,
        email: req.body.email,
        password:req.body.password
    };
    const results = await getDb().collection(oauthUserCollection).replaceOne({_id: userId}, user);
    if(results.modifiedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(response.error || 'Some error occurred while updating the user');
    }
};

getInfo.deleteUserOauth = async (req, res) => {
    const userId = ObjectId.createFromHexString(req.params.id);
    const results = await getDb().collection(oauthUserCollection).deleteOne({_id: userId});
    if(results.deletedCount > 0){
        res.status(204).send();
    } else{
        res.status(500).json(results.error || 'Some error occurred while deleting the user');
    }
};


module.exports = getInfo
