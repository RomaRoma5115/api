const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Tariff = require('../models/tariff');

router.get('/', (req,res,next)=> {
    Tariff.find()
    .select('_id name description countSms packageInternet countMinutes')
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

// get tariff by tariff id
router.post('/id/:tariffId',(req,res,next)=> {
    const id = req.params.tariffId
    Tariff.findById(id)
    .select('_id name description countSms packageInternet countMinutes')
    .exec()
    .then(result => {
        console.log(result)
        if(result){
            res.status(200).json({
                _id: result._id,
                name: result.name,
                description: result.description,
                countSms: result.countSms,
                countMinutes: result.countMinutes,
                packageInternet: result.packageInternet
            })
        } else {
            res.status(404).json({
                message: "Not found"
            })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err})
    })
})

// create tariff
router.post('/',(req,res,next)=>{
    const newTariff = new Tariff({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        countSms: req.body.countSms,
        packageInternet: req.body.packageInternet,
        countMinutes: req.body.countMinutes
    })
    newTariff
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Tariff created',
            created: newTariff
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

//delete
router.post('/delete/:tariffId', (req,res,next)=> {
    const id = req.params.tariffId
    Tariff.findByIdAndRemove(id)
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Tariff deleted"
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

//update
router.post('/update/:tariffId', (req,res,next)=>{
    const id = req.params.tariffId
    Tariff.findByIdAndUpdate(id, {$set : req.body}, {new: true})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json(
            result
            )
        })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})


module.exports = router;
