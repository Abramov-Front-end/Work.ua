import VacancyTemplate from "../templates/vacancy";
import CitiesActions from "./cities";
import Form from "./form";

const vacanciesList = document.getElementById('vacanciesList')
const firstButton = document.querySelector('.title-wrapper .button_action')

class Vacancy {

    constructor(list) {
        this.cities = []
        this.list = list
    }

    async getAll() {
        const response = await fetch('/vacancies' )
        return await response.json()
    }

    print(vacancies) {

        if ( !vacancies.length ) {
            this.list.innerHTML = '<li class="vacancies__list__item no-vacancies">Нет вакансий.</li>'
            firstButton.classList.add('hidden')
            return false
        }
        firstButton.classList.remove('hidden')
        this.list.innerHTML = ''

        if ( this.cities.length ) {

            for ( const vacancy of vacancies ) {
                this.list.append( VacancyTemplate(vacancy, this.cities) )
            }
        } else {

            CitiesActions.get()
                .then( citiesList => {
                    for ( const vacancy of vacancies ) {
                        this.list.append( VacancyTemplate(vacancy, citiesList) )
                    }
                    this.cities = citiesList
                })
        }
    }

    updateList() {
        this.getAll()
            .then( vacancies => this.print(vacancies) )
    }

    edit(id) {
        Form.load(id)
    }

    async remove(id) {
        await fetch('/vacancy/' + id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(response => {

                if ( response.code === 200 ) {
                    document.getElementById('vacancy_' + response.id).remove()
                    this.updateList()
                } else {
                    throw 'Произошла ошибка при удалении'
                }
            })
    }
}

export default new Vacancy(vacanciesList)