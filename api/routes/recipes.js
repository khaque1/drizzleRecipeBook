const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype ==='image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Recipe = require('../models/recipe_model');

router.get('/', (req, res, next) => {
    Recipe.find()
        // .select('_id name price')
        .select('-__v')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                recipes: docs.map(doc => {
                    return {
                        recipe: doc,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/recipes/" + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', upload.single('inputfile'),(req, res, next) => {
    console.log(req.file);
    const recipe = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        foodtitle: req.body.foodtitle,
        description: req.body.description,
        inputfile: req.file.path,
        category: req.body.category,
        //time: req.body.time1,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
    });
    recipe
        .save()
        .then(result => {
            res.status(201).json({
                message: 'Created recipe successfully',
                createdRecipe: {
                    foodtitle: result.foodtitle,
                    description: result.description,
                    inputfile: result.inputfile,
                    category: result.category,
                    //time: result.time1,
                    ingredients: result.ingredients,
                    instructions: result.instructions,
                    _id: result._id
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/recipes/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:recipeID', (req, res, next) => {
    const id = req.params.recipeID;
    Recipe.findById(id)
        .select('-__v')
        .exec()
        .then(doc => {
            res.status(200).json({
                recipe: doc,
                request: {
                    type: 'GET',
                    description: 'Get all recipes',
                    url: 'http://localhost:3000/recipes/'
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.patch('/:recipeID', (req, res, next) => {
    const id = req.params.recipeID;
    //const updateOps = {};
    //for (const ops of req.body) {
      //  updateOps[ops.propName] = ops.value;
    //}
    //instead of $set:updateOps, replaced with $set:req.body
    Recipe.updateOne({ _id: id}, {$set: req.body })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Recipe updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/recipes/' + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

router.delete('/:recipeID', (req, res, next) => {
    const id = req.params.recipeID;
    Recipe.deleteOne({ _id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Recipe deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/recipes/',
                    body: {
                        foodtitle: 'String',
                        description: 'String',
                        inputfile: 'String',
                        category: 'String',
                        //time: 'Number',
                        ingredients: 'String',
                        instructions: 'String',
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;
