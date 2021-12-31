export default (model, cities) => {

    const city = model.city ? cities.find(city => city.id == model.city) : ''

    const template = document.createElement('li', )

    template.innerHTML = `<div class="vacancy__info">
                                <a class="vacancy__name" href="#">${model.name}</a> 
                                <p class="vacancy__price">
                                    ${
                                    typeof model.price !== 'undefined' && typeof model.price === 'object'
                                          ? model.price.from + ' - ' + model.price.to + ' грн.'
                                          : (model.price ? model.price + ' грн.' : '')
                                    } 
                                    <span class="vacancy__price__comment note">${model.priceComment || ''}</span>
                                </p>
                                <p class="vacancy__city">${city.name || ''}</p>
                            </div>
                            <div class="vacancy__actions">
                               <button type="button" class="vacancy__actions__toggle link button-toggle">Еще</button>
                               <div class="vacancy__actions__menu dropdown">
                                    <a href="#" class="vacancy__actions__button button-action" data-id="${model.id}" data-action="edit">Редактировать</a>
                                    <a href="#" class="vacancy__actions__button button-action" data-id="${model.id}" data-action="remove">Удалить</a>
                               </div>
                            </div>`

      template.classList.add('vacancies-list__item', 'vacancy')
      template.setAttribute('id', 'vacancy_' + model.id)

    return template
}