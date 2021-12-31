import VacancyActions from './actions/vacancies'
import CitiesActions from './actions/vacancies'
import Modal from './actions/modals'
import Form from './actions/form'

const vacanciesList = document.getElementById('vacanciesList')
const vacancyForm = document.getElementById('vacancyForm')
const radioButtons = document.querySelectorAll('[name="priceRadio"]')
const selectCity = document.getElementById('selectCity')
let valdator = null

window.addEventListener('load', () => {

    VacancyActions.updateList()

})

vacanciesList.addEventListener('click', e => {
    const buttonToggle = e.target.closest('.button-toggle')
    const buttonAction = e.target.closest('.button-action')

    if ( buttonToggle ) {
        e.stopPropagation()
        buttonToggle.nextElementSibling.classList.add('open')
    }

    if ( buttonAction ) {
        e.preventDefault()
        const data = buttonAction.dataset
        VacancyActions[data.action](data.id)
    }

})

//Modal
document.querySelectorAll('[data-modal]').forEach(button => {
    button.addEventListener('click', e => {
        const button = e.target.closest('.button')
        Modal.open(button.dataset.modal)
    })
})
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', Modal.close)
})

//Document click
document.addEventListener('click', e =>{

    if ( e.target.closest('.dropdown') ) return false

    const dropdowns = document.querySelectorAll('.dropdown')
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('open')
    })
})

//Form

radioButtons.forEach(radio => {
    radio.addEventListener('change', e => {
        Form.radio(e.target.attributes.name.value)
    })
})

vacancyForm.addEventListener('submit', e => {
    e.preventDefault()

    Form.submit()
})

selectCity.addEventListener('keyup', e => {

    if ( !e.target.value.length ) {
        Form.autocompleteClear()
        return false
    }

    Form.autocomplete(e.target.value)

})


