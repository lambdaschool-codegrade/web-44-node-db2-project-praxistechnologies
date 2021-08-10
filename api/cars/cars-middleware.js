require('express')
var vinValidator = require('vin-validator')
const Cars = require('./cars-model')

const checkCarId = async (req, res, next) => {
  try{
    const { id } = req.params
    const car = await Cars.getById(id)
    if(!car){
      next({
        status: 404,
        message: `car with id ${id} is not found`
      })
    } else {
      req.car = car
      next()
    }
  }
  catch(err){
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  if(!vin){
    next({
      status: 400,
      message: 'vin is missing'
    })
  }
  if(!make){
    next({
      status: 400,
      message: 'make is missing'
    })
  }
  if(!model){
    next({
      status: 400,
      message: 'model is missing'
    })
  }
  if(!mileage){
    next({
      status: 400,
      message: 'mileage is missing'
    })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body
  const isValidVin = vinValidator.validate(vin)
  if(!isValidVin) {
    next({
      status: 400,
      message: `vin ${vin} is invalid`
    })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body
  const isTaken = await Cars.getByVin(vin)
  if(isTaken){
    next({
      status: 400,
      message: `vin ${vin} already exists`
    })
  } else {
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
