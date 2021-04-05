const express = require('express')
const router = express.Router()
const Person = require('../modules/person')

//GET ALL
router.get('/', async (req, res) => {
    try {
        const people = await Person.find() 
        res.status(200).json(people)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
//GET ONE
router.get('/:id', getPerson, (req, res) => {
    res.send(res.person)
})
//POST
router.post('/', async (req, res) => {
    const person = new Person({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    })

    try {
        const newPerson = await person.save()
        res.status(201).json(newPerson)
    } catch(err) {
        res.status(400).json(err.message)
    }
})
//PATCH
router.patch('/:id', getPerson, async (req, res) => {
    if(req.body.first_name != null) {
        res.person.first_name = req.body.first_name
    }
    if(req.body.last_name != null) {
        res.person.last_name = req.body.last_name
    }
    try {
        const updatedPerson = await res.person.save()
        res.json(updatedPerson)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})
//DELETE
router.delete('/:id', getPerson, async (req, res) => {
    try {
        await res.person.remove()
        res.json({message : 'Delelted person'})
    } 
    catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getPerson(req, res, next) {
    let person
    try {
        person = await Person.findById(req.params.id)
        if(person==null) {
            return res.status(404).json({message : 'Cannot find person'})
        }
    } catch(err) {
        return res.status(500).json({message : err.message})
    }
    res.person = person
    next()
}

module.exports = router