import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import './styles/style.css';
import countryCardTpl from './tamplates/country-cards.hbs';
import counrtyListRpl from './tamplates/country-list.hbs';
import API from './js/fetchCountries';
const debounce = require('debounce');


//REQUIRE REFS

const containerCardRef = document.querySelector('.contries-cards') //element to insert HTML
const inputRef = document.querySelector('.js-form') //inmup to enter text


//LISTENER
inputRef.addEventListener('keyup', debounce(onInputChange, 500)) //add listener with debounce to enter text

function onInputChange(e) {
    const searchQuery = e.target.value;
    API.fetchCountries(searchQuery)
        .then(createCardMarkup)
}//fetch call when listener worked

//CREATE HTML
function createCardMarkup(response) {
    const markupCard = countryCardTpl(response[0]);//create HTML markup with one country in answer through handlebars
    const markupList = counrtyListRpl(response);//create HTML markup with more thaт one country in answer through handlebars
    if (response.length > 10) {
        containerCardRef.innerHTML = "";//clear HTML with error
        API.onError("Too many matches found. Please enter more specific query!");//show error with massege
    }
    else if (response.length > 1) {
        containerCardRef.innerHTML = markupList//insert HTML markup
    } else {containerCardRef.innerHTML = markupCard; }
        
}
 
