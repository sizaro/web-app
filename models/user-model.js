const { getDb } = require('../database/mongoDB');
const { ObjectId } = require('mongodb');

const userCollection = 'oauthusers';
const userModel = {}

const userSchema = {
    username: 'string',
    googleId: 'string'
};


const validateUser = (user) => {
    for (const key in userSchema) {
        if (userSchema.hasOwnProperty(key)) {
            if (typeof user[key] !== userSchema[key]) {
                throw new Error(`Invalid type for ${key}. Expected ${userSchema[key]}`);
            }
        }
    }
};

const createUserOauth = async (user) => {
    // Validate the user object
    validateUser(user);
    
    // Insert the user object into the collection
    const result = await getDb().db().collection(userCollection).insertOne(user);
    
    // Check if the insertion was acknowledged
    if (result.acknowledged) {
        console.log(`User has been created: ${user}`);
        
        // Ensure the returned user object has the _id field assigned by MongoDB
        user._id = result.insertedId;
    } else {
        console.log(`Some error occurred while creating the user: ${user}`);
    }
    
    // Log the result object for debugging
    console.log(result);
    
    // Return the user object including the _id field
    return user;
};


const findUserByIdOauth = async (id) => {
    try {
       
        const userId = id
        const user = await getDb().db().collection(userCollection).findOne({ _id: id });
        return user;
    } catch (error) {
        console.error('Error retrieving user:', error);
        throw error; // Propagate the error for higher-level handling
    }
};


const findUserByGoogleIdOauth = async (googleId) => {

    console.log(googleId)
    const user = await getDb().db().collection(userCollection).findOne({ googleId:googleId });
    if (!user) {
        console.log( `user with google id ${googleId} not found!`)
    }
    console.log(user);
    return user
    
};

module.exports = { createUserOauth, findUserByGoogleIdOauth, findUserByIdOauth };

