const router = require('express').Router()
const Pin = require('../models/Pin')


//Craete pin
router.post('/', async (req, res) => {
    try{
    const newlyCreatedPin = new Pin(req.body)
    let createdPin = await newlyCreatedPin.save()
    res.status(201).json(createdPin)
    }catch(err){
        res.status(400).send({
            message: err.message
        })
    }
})

//Get all pins for
router.get('/', async (req, res) => {
    try{
        const pins = await Pin.find()
        res.status(200).json(pins)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

module.exports = router