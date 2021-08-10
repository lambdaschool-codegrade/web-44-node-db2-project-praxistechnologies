const router = require('express').Router()
const Cars = require('./cars-model')
const { checkCarId, 
        checkCarPayload, 
        checkVinNumberValid, 
        checkVinNumberUnique }
        = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    try{
        const cars = await Cars.getAll()
        res.status(200).json(cars)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, (req, res) => {
    const car = req.car
    res.status(200).json(car)
})

router.post('/', 
    checkCarPayload, 
    checkVinNumberValid, 
    checkVinNumberUnique, 
    async (req, res, next) => {
        try{
            const carInfo = req.body
            const newCar = await Cars.create(carInfo)
            res.status(201).json(newCar)
        } catch(err) {
            next(err)
        }
})

module.exports = router