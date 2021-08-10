const db = require('../../data/db-config')

const getAll = async () => {
  const cars = await db('cars').orderBy('id')
  return cars
}

const getById = async id => {
  const [car] = await db('cars')
    .where('id', id)
  return car
}

const getByVin = async vin => {
  const [car] = await db('cars')
    .where('vin', vin)
  return car
}

const create = async (carInfo) => {
  const [id] = await db('cars')
    .insert(carInfo)
  const newCar = await getById(id)
  return newCar
}

module.exports = {
  getAll,
  getById,
  getByVin,
  create
}