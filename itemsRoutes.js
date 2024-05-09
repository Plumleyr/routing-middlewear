const express = require('express')
const router = new express.Router()
const items = require('./fakeDb')
const ExpressError = require('./expressError')

router.get('/', (req, res) =>{
    res.send({items});
});

router.get('/:name', (req, res, next) => {
    const item = items.find(item => item.name === req.params.name);
    try{
        if(item === undefined){
            throw new ExpressError('Item not found', 400);
        };
        res.send({item})
    } catch (e) {
        return next(e);
    };
})

router.post('/', (req, res, next) =>{
    try{
        if(!req.body.name || !req.body.price){
            throw new ExpressError('Name and Price required', 400);
        };

        const newItem = {
            'name': req.body.name,
            'price': req.body.price
        };

        items.push(newItem);
        res.status(201).json({added: newItem});
    } catch (e){
        return next (e);
    };
});

router.patch('/:name', (req, res, next) =>{
    const item = items.find(item => item.name === req.params.name);
    try{
        if(item === undefined){
            throw new ExpressError('Item not found', 400);
        };

        Object.assign(item, {'name': req.body.name, 'price': req.body.price});
        res.status(200).send({updated: item});
    } catch (e) {
        return next(e);
    };
});

router.delete('/:name', (req,res,next) =>{
    const item = items.findIndex(item => item.name === req.params.item);
    try{
        if(item === undefined){
            throw new ExpressError('Item not found', 400);
        };

        items.splice(item, 1);
        res.send({message: 'Deleted'});
    } catch (e){
        return next(e);
    };
});

module.exports = router;