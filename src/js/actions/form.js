import Modal from './modals'
import Vacancy from './vacancies'
import Cities from './cities'

const vacancyForm = document.getElementById('vacancyForm')
const modalTitle = document.getElementById('modalTitle')
const cityAutocomplete = document.getElementById('cityAutocomplete')
const selectCity = document.getElementById('selectCity')
const errorBlock = document.getElementById('formErrors')

class Form {
    constructor(form) {
        this.form = form
    }

    serialize() {
        const data = {}

        this.form.querySelectorAll('[name]').forEach(input => {
            const name = input.attributes.name.value

            if ( name !== 'priceRadio' && !input.disabled ) {

                if ( name.indexOf('[') > 0 ) {
                    const keys = name.split(/[\[\]']/g)
                    if ( typeof data[keys[0]] === 'undefined') data[keys[0]] = {}
                    data[keys[0]][keys[1]] = input.value
                } else {
                    data[name] = input.value
                }
            }
        })

        return data
    }

    async send(data) {

        const url = '/vacancy' + (data.id ? `/${data.id }` : '')
        const vacancy = await fetch(url, {
            method: data.id ? 'PUT' : 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return await vacancy.clone().json()
    }
    load(id) {

        modalTitle.innerText = 'Редактировать вакансию'

        Vacancy.getAll()
            .then(vacancies => {
                const currentVacancy = vacancies.find(item => item.id === id)

                for ( let name in currentVacancy ) {
                    const input = document.querySelector(`[name=${name}]`)

                    if ( input ) {


                        if ( name === 'city' ) {
                            Cities.get()
                                .then(cities => {
                                    for ( let city of cities ) {

                                        if ( city.id === currentVacancy[name] )
                                        selectCity.value = city.name
                                        input.value = currentVacancy[name]
                                    }
                                })
                        } else if ( name === 'price' ) {

                            document.querySelectorAll('[name="priceRadio"]').forEach(radio => radio.checked = false)

                            if ( typeof currentVacancy[name] === 'object' ) {
                                document.querySelector('[name="priceRadio"][value="2"]').checked = true

                                for ( let price in currentVacancy[name] ) {
                                    document.querySelector(`[name="price[${price}]"]`).value = currentVacancy[name][price]
                                }

                            } else if ( typeof currentVacancy[name] !== 'object' && currentVacancy[name] ) {
                                document.querySelector('[name="priceRadio"][value="1"]').checked = true
                            } else {
                                document.querySelector('[name="priceRadio"][value="0"]').checked = true
                            }

                            this.radio('priceRadio')

                        } else {
                            input.value = currentVacancy[name]
                        }

                        Modal.open('formModal')
                    }

                }
            })

    }
    submit() {

        this.validate(() => {

            const data = this.serialize(this.form)

            this.send(data)
                .then(response => {

                    if ( response.code === 200 ) {

                        Modal.close()
                        Vacancy.updateList()
                        this.clear()

                    } else {
                        throw 'Ошибка добавления вакансии'
                    }
                })
        })
    }

    clear() {
        modalTitle.innerText = 'Создать вакансию'
        this.form.querySelectorAll('input').forEach(input => {
            if ( input.type !== 'radio' ) input.value = ''
        })
    }

    radio(name) {
        document.querySelectorAll(`[name="${name}"]`).forEach(radio => {

            radio.closest('.form__radio').querySelectorAll('input[type="text"]')
                .forEach(input => input.disabled = !radio.checked)

        })
    }

    autocomplete(value) {

        Cities.get(value)
            .then(cities => {
                this.autocompleteClear()

                if ( cities.length ) {

                    for ( let city of cities ) {
                        const li = document.createElement('li')
                        li.dataset.id = city.id
                        li.innerText = city.name
                        li.classList.add('autocomplete__item')

                        cityAutocomplete.append(li)
                    }

                    cityAutocomplete.querySelectorAll('.autocomplete__item').forEach(item => {

                        item.addEventListener('click', e => {
                            const cityInput = document.querySelector('[name="city"]')
                            const thisItem = e.target
                            cityInput.value = thisItem.dataset.id
                            selectCity.value = thisItem.innerText

                            this.autocompleteClear()
                        })
                    })
                }
            })


    }

    autocompleteClear() {
        cityAutocomplete.innerHTML = ''
    }

    validate(callback) {
        let errors = 0;
        const rules = [
            {
                name: 'name',
                required: true,
                message: 'Пожалуйста, укажите название должности.'
            },
            {
                name: 'city',
                required: true,
                message: 'Пожалуйста, укажите город работы.'
            },
            {
                name: 'address',
                required: true,
                message: 'Пожалуйста, укажите адрес работы.'
            },
            {
                name: 'price',
                required: true,
                message: 'Пожалуйста, укажите зарплату.'
            },
            {
                name: 'price\[from\]',
                required: true,
                message: 'Пожалуйста, укажите минимальное и максимальное значение зарплаты.'
            },
            {
                name: 'price\[to\]',
                required: true,
                message: 'Пожалуйста, укажите минимальное и максимальное значение зарплаты.'
            }
        ]


        for ( let item of rules ) {
            const field = this.form.querySelector(`[name="${item.name}"]`)
            const parent = field.closest('.form__input__group') || field.closest('.form__row')
            const errorMessage = parent.querySelector('.error')

            if ( !field.value && !field.disabled ) {
                const errorText = document.createElement('p')
                errorText.innerText = item.message
                errorText.classList.add('error')


                if ( !errorMessage ) parent.append(errorText)

                errors++
            } else {
                if ( errorMessage ) errorMessage.remove()
            }
        }

        if ( errors ) {
            errorBlock.classList.add('show')
        } else {
            errorBlock.classList.remove('show')
            callback()
        }

    }
}

export default new Form(vacancyForm)