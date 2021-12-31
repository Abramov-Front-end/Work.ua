/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/actions/cities.js":
/*!**********************************!*\
  !*** ./src/js/actions/cities.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Cities {\r\n    async get(city = '') {\r\n        const cities = await fetch(decodeURI('/cities?search=' + city) )\r\n\r\n        return await cities.json()\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Cities());\n\n//# sourceURL=webpack://default/./src/js/actions/cities.js?");

/***/ }),

/***/ "./src/js/actions/form.js":
/*!********************************!*\
  !*** ./src/js/actions/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _modals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modals */ \"./src/js/actions/modals.js\");\n/* harmony import */ var _vacancies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vacancies */ \"./src/js/actions/vacancies.js\");\n/* harmony import */ var _cities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cities */ \"./src/js/actions/cities.js\");\n\r\n\r\n\r\n\r\nconst vacancyForm = document.getElementById('vacancyForm')\r\nconst modalTitle = document.getElementById('modalTitle')\r\nconst cityAutocomplete = document.getElementById('cityAutocomplete')\r\nconst selectCity = document.getElementById('selectCity')\r\nconst errorBlock = document.getElementById('formErrors')\r\n\r\nclass Form {\r\n    constructor(form) {\r\n        this.form = form\r\n    }\r\n\r\n    serialize() {\r\n        const data = {}\r\n\r\n        this.form.querySelectorAll('[name]').forEach(input => {\r\n            const name = input.attributes.name.value\r\n\r\n            if ( name !== 'priceRadio' && !input.disabled ) {\r\n\r\n                if ( name.indexOf('[') > 0 ) {\r\n                    const keys = name.split(/[\\[\\]']/g)\r\n                    if ( typeof data[keys[0]] === 'undefined') data[keys[0]] = {}\r\n                    data[keys[0]][keys[1]] = input.value\r\n                } else {\r\n                    data[name] = input.value\r\n                }\r\n            }\r\n        })\r\n\r\n        return data\r\n    }\r\n\r\n    async send(data) {\r\n\r\n        const url = '/vacancy' + (data.id ? `/${data.id }` : '')\r\n        const vacancy = await fetch(url, {\r\n            method: data.id ? 'PUT' : 'POST',\r\n            body: JSON.stringify(data),\r\n            headers: {\r\n                'Content-Type': 'application/json'\r\n            }\r\n        })\r\n\r\n        return await vacancy.clone().json()\r\n    }\r\n    load(id) {\r\n\r\n        modalTitle.innerText = 'Редактировать вакансию'\r\n\r\n        _vacancies__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getAll()\r\n            .then(vacancies => {\r\n                const currentVacancy = vacancies.find(item => item.id === id)\r\n\r\n                for ( let name in currentVacancy ) {\r\n                    const input = document.querySelector(`[name=${name}]`)\r\n\r\n                    if ( input ) {\r\n\r\n\r\n                        if ( name === 'city' ) {\r\n                            _cities__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get()\r\n                                .then(cities => {\r\n                                    for ( let city of cities ) {\r\n\r\n                                        if ( city.id === currentVacancy[name] )\r\n                                        selectCity.value = city.name\r\n                                        input.value = currentVacancy[name]\r\n                                    }\r\n                                })\r\n                        } else if ( name === 'price' ) {\r\n\r\n                            document.querySelectorAll('[name=\"priceRadio\"]').forEach(radio => radio.checked = false)\r\n\r\n                            if ( typeof currentVacancy[name] === 'object' ) {\r\n                                document.querySelector('[name=\"priceRadio\"][value=\"2\"]').checked = true\r\n\r\n                                for ( let price in currentVacancy[name] ) {\r\n                                    document.querySelector(`[name=\"price[${price}]\"]`).value = currentVacancy[name][price]\r\n                                }\r\n\r\n                            } else if ( typeof currentVacancy[name] !== 'object' && currentVacancy[name] ) {\r\n                                document.querySelector('[name=\"priceRadio\"][value=\"1\"]').checked = true\r\n                            } else {\r\n                                document.querySelector('[name=\"priceRadio\"][value=\"0\"]').checked = true\r\n                            }\r\n\r\n                            this.radio('priceRadio')\r\n\r\n                        } else {\r\n                            input.value = currentVacancy[name]\r\n                        }\r\n\r\n                        _modals__WEBPACK_IMPORTED_MODULE_0__[\"default\"].open('formModal')\r\n                    }\r\n\r\n                }\r\n            })\r\n\r\n    }\r\n    submit() {\r\n\r\n        this.validate(() => {\r\n\r\n            const data = this.serialize(this.form)\r\n\r\n            this.send(data)\r\n                .then(response => {\r\n\r\n                    if ( response.code === 200 ) {\r\n\r\n                        _modals__WEBPACK_IMPORTED_MODULE_0__[\"default\"].close()\r\n                        _vacancies__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateList()\r\n                        this.clear()\r\n\r\n                    } else {\r\n                        throw 'Ошибка добавления вакансии'\r\n                    }\r\n                })\r\n        })\r\n    }\r\n\r\n    clear() {\r\n        modalTitle.innerText = 'Создать вакансию'\r\n        this.form.querySelectorAll('input').forEach(input => {\r\n            if ( input.type !== 'radio' ) input.value = ''\r\n        })\r\n    }\r\n\r\n    radio(name) {\r\n        document.querySelectorAll(`[name=\"${name}\"]`).forEach(radio => {\r\n\r\n            radio.closest('.form__radio').querySelectorAll('input[type=\"text\"]')\r\n                .forEach(input => input.disabled = !radio.checked)\r\n\r\n        })\r\n    }\r\n\r\n    autocomplete(value) {\r\n\r\n        _cities__WEBPACK_IMPORTED_MODULE_2__[\"default\"].get(value)\r\n            .then(cities => {\r\n                this.autocompleteClear()\r\n\r\n                if ( cities.length ) {\r\n\r\n                    for ( let city of cities ) {\r\n                        const li = document.createElement('li')\r\n                        li.dataset.id = city.id\r\n                        li.innerText = city.name\r\n                        li.classList.add('autocomplete__item')\r\n\r\n                        cityAutocomplete.append(li)\r\n                    }\r\n\r\n                    cityAutocomplete.querySelectorAll('.autocomplete__item').forEach(item => {\r\n\r\n                        item.addEventListener('click', e => {\r\n                            const cityInput = document.querySelector('[name=\"city\"]')\r\n                            const thisItem = e.target\r\n                            cityInput.value = thisItem.dataset.id\r\n                            selectCity.value = thisItem.innerText\r\n\r\n                            this.autocompleteClear()\r\n                        })\r\n                    })\r\n                }\r\n            })\r\n\r\n\r\n    }\r\n\r\n    autocompleteClear() {\r\n        cityAutocomplete.innerHTML = ''\r\n    }\r\n\r\n    validate(callback) {\r\n        let errors = 0;\r\n        const rules = [\r\n            {\r\n                name: 'name',\r\n                required: true,\r\n                message: 'Пожалуйста, укажите название должности.'\r\n            },\r\n            {\r\n                name: 'city',\r\n                required: true,\r\n                message: 'Пожалуйста, укажите город работы.'\r\n            },\r\n            {\r\n                name: 'address',\r\n                required: true,\r\n                message: 'Пожалуйста, укажите адрес работы.'\r\n            },\r\n            {\r\n                name: 'price',\r\n                required: true,\r\n                message: 'Пожалуйста, укажите зарплату.'\r\n            },\r\n            {\r\n                name: 'price\\[from\\]',\r\n                required: true,\r\n                message: 'Пожалуйста, укажите минимальное и максимальное значение зарплаты.'\r\n            },\r\n            {\r\n                name: 'price\\[to\\]',\r\n                required: true,\r\n                message: 'Пожалуйста, укажите минимальное и максимальное значение зарплаты.'\r\n            }\r\n        ]\r\n\r\n\r\n        for ( let item of rules ) {\r\n            const field = this.form.querySelector(`[name=\"${item.name}\"]`)\r\n            const parent = field.closest('.form__input__group') || field.closest('.form__row')\r\n            const errorMessage = parent.querySelector('.error')\r\n\r\n            if ( !field.value && !field.disabled ) {\r\n                const errorText = document.createElement('p')\r\n                errorText.innerText = item.message\r\n                errorText.classList.add('error')\r\n\r\n\r\n                if ( !errorMessage ) parent.append(errorText)\r\n\r\n                errors++\r\n            } else {\r\n                if ( errorMessage ) errorMessage.remove()\r\n            }\r\n        }\r\n\r\n        if ( errors ) {\r\n            errorBlock.classList.add('show')\r\n        } else {\r\n            errorBlock.classList.remove('show')\r\n            callback()\r\n        }\r\n\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Form(vacancyForm));\n\n//# sourceURL=webpack://default/./src/js/actions/form.js?");

/***/ }),

/***/ "./src/js/actions/modals.js":
/*!**********************************!*\
  !*** ./src/js/actions/modals.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form */ \"./src/js/actions/form.js\");\n\r\n\r\nclass Modal {\r\n    open(id) {\r\n        document.getElementById(id).classList.add('show')\r\n        document.body.style.overflow = 'hidden'\r\n    }\r\n    close() {\r\n        _form__WEBPACK_IMPORTED_MODULE_0__[\"default\"].clear()\r\n        document.querySelectorAll('.modal').forEach(modal => {\r\n            modal.classList.remove('show')\r\n        })\r\n        document.body.style = ''\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Modal());\n\n//# sourceURL=webpack://default/./src/js/actions/modals.js?");

/***/ }),

/***/ "./src/js/actions/vacancies.js":
/*!*************************************!*\
  !*** ./src/js/actions/vacancies.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _templates_vacancy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates/vacancy */ \"./src/js/templates/vacancy.js\");\n/* harmony import */ var _cities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cities */ \"./src/js/actions/cities.js\");\n/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form */ \"./src/js/actions/form.js\");\n\r\n\r\n\r\n\r\nconst vacanciesList = document.getElementById('vacanciesList')\r\nconst firstButton = document.querySelector('.title-wrapper .button_action')\r\n\r\nclass Vacancy {\r\n\r\n    constructor(list) {\r\n        this.cities = []\r\n        this.list = list\r\n    }\r\n\r\n    async getAll() {\r\n        const response = await fetch('/vacancies' )\r\n        return await response.json()\r\n    }\r\n\r\n    print(vacancies) {\r\n\r\n        if ( !vacancies.length ) {\r\n            this.list.innerHTML = '<li class=\"vacancies__list__item no-vacancies\">Нет вакансий.</li>'\r\n            firstButton.classList.add('hidden')\r\n            return false\r\n        }\r\n        firstButton.classList.remove('hidden')\r\n        this.list.innerHTML = ''\r\n\r\n        if ( this.cities.length ) {\r\n\r\n            for ( const vacancy of vacancies ) {\r\n                this.list.append( (0,_templates_vacancy__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(vacancy, this.cities) )\r\n            }\r\n        } else {\r\n\r\n            _cities__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get()\r\n                .then( citiesList => {\r\n                    for ( const vacancy of vacancies ) {\r\n                        this.list.append( (0,_templates_vacancy__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(vacancy, citiesList) )\r\n                    }\r\n                    this.cities = citiesList\r\n                })\r\n        }\r\n    }\r\n\r\n    updateList() {\r\n        this.getAll()\r\n            .then( vacancies => this.print(vacancies) )\r\n    }\r\n\r\n    edit(id) {\r\n        _form__WEBPACK_IMPORTED_MODULE_2__[\"default\"].load(id)\r\n    }\r\n\r\n    async remove(id) {\r\n        await fetch('/vacancy/' + id, {\r\n            method: 'DELETE'\r\n        })\r\n            .then(response => response.json())\r\n            .then(response => {\r\n\r\n                if ( response.code === 200 ) {\r\n                    document.getElementById('vacancy_' + response.id).remove()\r\n                    this.updateList()\r\n                } else {\r\n                    throw 'Произошла ошибка при удалении'\r\n                }\r\n            })\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Vacancy(vacanciesList));\n\n//# sourceURL=webpack://default/./src/js/actions/vacancies.js?");

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_vacancies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions/vacancies */ \"./src/js/actions/vacancies.js\");\n/* harmony import */ var _actions_modals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions/modals */ \"./src/js/actions/modals.js\");\n/* harmony import */ var _actions_form__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions/form */ \"./src/js/actions/form.js\");\n\r\n\r\n\r\n\r\n\r\nconst vacanciesList = document.getElementById('vacanciesList')\r\nconst vacancyForm = document.getElementById('vacancyForm')\r\nconst radioButtons = document.querySelectorAll('[name=\"priceRadio\"]')\r\nconst selectCity = document.getElementById('selectCity')\r\nlet valdator = null\r\n\r\nwindow.addEventListener('load', () => {\r\n\r\n    _actions_vacancies__WEBPACK_IMPORTED_MODULE_0__[\"default\"].updateList()\r\n\r\n})\r\n\r\nvacanciesList.addEventListener('click', e => {\r\n    const buttonToggle = e.target.closest('.button-toggle')\r\n    const buttonAction = e.target.closest('.button-action')\r\n\r\n    if ( buttonToggle ) {\r\n        e.stopPropagation()\r\n        buttonToggle.nextElementSibling.classList.add('open')\r\n    }\r\n\r\n    if ( buttonAction ) {\r\n        e.preventDefault()\r\n        const data = buttonAction.dataset\r\n        _actions_vacancies__WEBPACK_IMPORTED_MODULE_0__[\"default\"][data.action](data.id)\r\n    }\r\n\r\n})\r\n\r\n//Modal\r\ndocument.querySelectorAll('[data-modal]').forEach(button => {\r\n    button.addEventListener('click', e => {\r\n        const button = e.target.closest('.button')\r\n        _actions_modals__WEBPACK_IMPORTED_MODULE_1__[\"default\"].open(button.dataset.modal)\r\n    })\r\n})\r\ndocument.querySelectorAll('.close-modal').forEach(button => {\r\n    button.addEventListener('click', _actions_modals__WEBPACK_IMPORTED_MODULE_1__[\"default\"].close)\r\n})\r\n\r\n//Document click\r\ndocument.addEventListener('click', e =>{\r\n\r\n    if ( e.target.closest('.dropdown') ) return false\r\n\r\n    const dropdowns = document.querySelectorAll('.dropdown')\r\n    dropdowns.forEach(dropdown => {\r\n        dropdown.classList.remove('open')\r\n    })\r\n})\r\n\r\n//Form\r\n\r\nradioButtons.forEach(radio => {\r\n    radio.addEventListener('change', e => {\r\n        _actions_form__WEBPACK_IMPORTED_MODULE_2__[\"default\"].radio(e.target.attributes.name.value)\r\n    })\r\n})\r\n\r\nvacancyForm.addEventListener('submit', e => {\r\n    e.preventDefault()\r\n\r\n    _actions_form__WEBPACK_IMPORTED_MODULE_2__[\"default\"].submit()\r\n})\r\n\r\nselectCity.addEventListener('keyup', e => {\r\n\r\n    if ( !e.target.value.length ) {\r\n        _actions_form__WEBPACK_IMPORTED_MODULE_2__[\"default\"].autocompleteClear()\r\n        return false\r\n    }\r\n\r\n    _actions_form__WEBPACK_IMPORTED_MODULE_2__[\"default\"].autocomplete(e.target.value)\r\n\r\n})\r\n\r\n\r\n\n\n//# sourceURL=webpack://default/./src/js/main.js?");

/***/ }),

/***/ "./src/js/templates/vacancy.js":
/*!*************************************!*\
  !*** ./src/js/templates/vacancy.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((model, cities) => {\r\n\r\n    const city = model.city ? cities.find(city => city.id == model.city) : ''\r\n\r\n    const template = document.createElement('li', )\r\n\r\n    template.innerHTML = `<div class=\"vacancy__info\">\r\n                                <a class=\"vacancy__name\" href=\"#\">${model.name}</a> \r\n                                <p class=\"vacancy__price\">\r\n                                    ${\r\n                                    typeof model.price !== 'undefined' && typeof model.price === 'object'\r\n                                          ? model.price.from + ' - ' + model.price.to + ' грн.'\r\n                                          : (model.price ? model.price + ' грн.' : '')\r\n                                    } \r\n                                    <span class=\"vacancy__price__comment note\">${model.priceComment || ''}</span>\r\n                                </p>\r\n                                <p class=\"vacancy__city\">${city.name || ''}</p>\r\n                            </div>\r\n                            <div class=\"vacancy__actions\">\r\n                               <button type=\"button\" class=\"vacancy__actions__toggle link button-toggle\">Еще</button>\r\n                               <div class=\"vacancy__actions__menu dropdown\">\r\n                                    <a href=\"#\" class=\"vacancy__actions__button button-action\" data-id=\"${model.id}\" data-action=\"edit\">Редактировать</a>\r\n                                    <a href=\"#\" class=\"vacancy__actions__button button-action\" data-id=\"${model.id}\" data-action=\"remove\">Удалить</a>\r\n                               </div>\r\n                            </div>`\r\n\r\n      template.classList.add('vacancies-list__item', 'vacancy')\r\n      template.setAttribute('id', 'vacancy_' + model.id)\r\n\r\n    return template\r\n});\n\n//# sourceURL=webpack://default/./src/js/templates/vacancy.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/main.js");
/******/ 	
/******/ })()
;