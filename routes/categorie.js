const express = require('express')
const router = express.Router()
const Categorie = require('../models/categorie')

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
        cat = new Categorie(data)
        cat.image = filename
        savecat = await cat.save()
        filename = ''
        res.status(200).send(savecat)
    }catch(error){
        res.status(400).send(error)
    }
})

router.get('/get',async(req,res)=>{
    try{
        categories = await Categorie.find()

        res.status(200).send(categories)
    }catch(error){
        res.status(400).send(error)
    }
})
router.get('/get/:id',async(req,res)=>{
    try{
        id = req.params.id
        categorie = await Categorie.findById({_id:id})
        
        res.status(200).send(categorie)
    }catch(error){
        res.status(400).send(error)
    }
})

router.delete('/delete/:id',async(req,res)=>{
    try{
        id = req.params.id
        deletedcat = await Recipe.findByIdAndDelete({_id:id})

        res.status(200).send(deletedcat)
        
    }catch(error){
        res.status(400).send(error)
    }
})

router.put('/update/:id',async(req,res)=>{
    try{
        id = req.params.id
        newcat = req.body
        updatedcat = await Recipe.findByIdAndUpdate({_id:id},newcat)

        res.status(200).send(updatedcat)
    }catch(error){
        res.status(400).send(error)
    }
})

module.exports = router