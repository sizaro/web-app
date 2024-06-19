const express = require('express');
const mongoDb = require('../database/mongoDB');
const { ObjectId } = require('mongodb');

const router = require('../route/test')

const getInfo = {}

getInfo.getAll = async function (req, res) {
     //#swagger.tags=['Users']
    const results = await mongoDb.getDb().db().collection('food').find();
    results.toArray().then((objects) => {
        console.log(objects)
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(objects);
    })
}

getInfo.getSingle = async function (req, res) {
         //#swagger.tags=['Users']
    const product_id = req.params.id;
    const userId = ObjectId.createFromHexString(product_id);
    console.log(userId)
    const results = await mongoDb.getDb().db().collection('food').find({ _id: userId });
    if (!results) {
        return res.status(404).json({ error: "results not found" });
    }
    console.log(results);
    results.toArray().then((objects) => {
        console.log(objects)
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(objects);
    }
    )
}

getInfo.createItem = async function (req, res) {
         //#swagger.tags=['Users']
    const item = {
        drinks : req.body.drinks,
        spices : req.body.spices,
        email : req.body.email
    };
    const results = await mongoDb.getDb().db().collection('food').insertOne(item);
   if(results.acknowledged){
    res.status(204).send();
   } else{
    res.status(500).json(response.error || 'some error occurred while updating the user')
   }
   
}

getInfo.updateItem = async function (req, res) {
         //#swagger.tags=['Users']
    const product_id = req.params.id;
    const userId = ObjectId.createFromHexString(product_id);
    console.log(userId)

    const item = {
        drinks : req.body.drinkName,
        email : req.body.email,
        spices : req.body.spiceName
    }
    const results = await mongoDb.getDb().db().collection('food').replaceOne({_id:userId},item);
    if(results.modifiedCount > 0){
        res.status(204).send();
       } else{
        res.status(500).json(response.error || 'some error occurred while updating the user')
       }
}

getInfo.deleteItem = async function (req, res) {
         //#swagger.tags=['Users']
    const product_id = req.params.id;
    const userId = ObjectId.createFromHexString(product_id);
    console.log(userId)
    const results = await mongoDb.getDb().db().collection('food').deleteOne({_id:userId});
    if(results.modifiedCount > 0){
        res.status(204).send();
       } else{
        res.status(500).json(results.error || 'some error occurred while deleting the user')
       }
}

module.exports = getInfo