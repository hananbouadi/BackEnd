const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipe')

const multer = require('multer')

filename = ''

const mystorage = multer.diskStorage({
    destination: './uploads',
    filename:(req, file,redirect)=>{
        let date = Date.now()

        let f1 = date + "." + file.mimetype.split('/')[1]
        redirect(null , f1)
        filename = f1
    }
})
//middleware
const upload = multer({storage: mystorage})

router.post('/create',upload.any('image'),async (req,res)=>{
    try{
        data = req.body
        reci = new Recipe(data)
        reci.image = filename
        saverecipe = await reci.save()
        filename = ''
        res.status(200).send(saverecipe)
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/get',async(req,res)=>{
    try{
        recipes = await Recipe.find()

        res.status(200).send(recipes)
    }catch(error){
        res.status(400).send(error)
    }
})
router.get('/get/:id',async(req,res)=>{
    try{
        id = req.params.id
        recipe = await Recipe.findById({_id:id})
        
        res.status(200).send(recipe)
    }catch(error){
        res.status(400).send(error)
    }
})

router.delete('/delete/:id',async(req,res)=>{
    try{
        id = req.params.id
        deletedrecipe = await Recipe.findByIdAndDelete({_id:id})

        res.status(200).send(deletedrecipe)
        
    }catch(error){
        res.status(400).send(error)
    }
})

router.put('/update/:id',async(req,res)=>{
    try{
        id = req.params.id
        newreci = req.body
        updatedreci = await Recipe.findByIdAndUpdate({_id:id},newreci)

        res.status(200).send(updatedreci)
    }catch(error){
        res.status(400).send(error)
    }
})

module.exports = router