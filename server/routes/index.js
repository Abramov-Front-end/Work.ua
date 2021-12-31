const path = require('path')
const { Router } = require('express')
const router = Router()
const { v4: uuid_v4 } = require('uuid')

let vacancies = require('../models/vacancies')
const cities = require('../models/cities')

//Index
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
})

//Vacancies
router.get('/vacancies', (req, res) => {
    res.send(vacancies)
})

//Create vacancy
router.post('/vacancy', (req, res) => {
    req.body.id = uuid_v4()

    vacancies.push(req.body)
    res.send({ code: 200 })
})

router.put('/vacancy/:id', (req, res) => {

    vacancies = vacancies.map(vacancy => {

        if ( vacancy.id === req.params.id ) {
            for ( let param in req.body ) {
                vacancy[param] = req.body[param]
            }
        }

        return vacancy
    })
    res.send({ code: 200 })
})

//Delete vacancy
router.delete('/vacancy/:id', (req, res) => {

    const vacancyIndex = vacancies.findIndex(i => i.id === req.params.id);

    if (vacancyIndex !== -1) {

        if ( vacancies.splice(vacancyIndex, 1) ) {
            res.send({
                ...req.params,
                code: 200,
                vacancies
            })
        }

    } else {
        res.send({
            code: 500
        })
    }

})

//Create vacancy
router.get('/cities', (req, res) => {

    if ( req.query.search ) {

        const findCity = cities.filter(city => city.name.toLowerCase().includes(req.query.search.toLowerCase()))
        res.send(findCity)
    } else {
        res.send(cities)
    }
})

module.exports = router