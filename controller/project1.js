const express = require('express');
const mongoDb = require('../database/mongoDB');
const { ObjectId } = require('mongodb');

const router = require('../route/test')

const getInfo = {}

getInfo.getAll = async function (req, res) {
    const results = await mongoDb.getDb().db().collection('food').find();
    results.toArray().then((objects) => {
        console.log(objects)
        res.setHeader("Content-Type", "application/json")
        res.status(200).json(objects);
    })
}

getInfo.getSingle = async function (req, res) {
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
        res.status(200).json(objects[0]);
    }
    )
}

module.exports = getInfo