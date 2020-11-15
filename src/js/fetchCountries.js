import { error } from '@pnotify/core';



function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
        .then(response => { 
            if (response.ok) { return response.json() };
            if (response.status === 404) {
                onError("There is no country with that name!");
                throw new Error('Not found');
            }
            onError("Something went wrong. Please try again!");
            throw new Error('Error fetching data');
            }
         );
};
 
function onError(message) { 
    const errorMassege = error({
            text: `${message}`,
    });
    return errorMassege
}

export default { fetchCountries, onError };
