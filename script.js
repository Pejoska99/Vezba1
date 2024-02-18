const searchBtn = document.getElementById("searchBtn");


async function fetchCountryByName(country) {
    
    try{
    const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
   const data = await response.json();
   return data ;
}
catch(error){
console.error(error);
throw error;
}

}

searchBtn.addEventListener ('click', async function(){
  
  const inputCountry = document.getElementById('inputCountry').value;
    
try{
    const data = await fetchCountryByName(inputCountry);
    console.log(data);
    
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = '';
    data.forEach((country) => {            
    createCountryTable(country);
       
});
}catch(error){
    console.error(error);
        
}
   
});
  
  function createCountryTable(country) {
    const tableContainer = document.getElementById("tableContainer")
    let languages = "" ;
    let currencies = "" ;
    if (country.languages) {
      languages = Object.values(country.languages).join(", ");

    console.log("lang,",languages)
    if (country.currencies) {
      currencies = Object.values(country.currencies).map(currency => currency.name).join(", ");
  }
    console.log("curr:",currencies)
    const googleMapsUrl = country.maps.googleMaps;
   
    tableContainer.innerHTML += `
    <div class="col">
        <div class="card">
            <img src="${country.flags.png}" class="card-img-top" alt="${country.name.common}">
            <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <p class="card-text">Population: ${country.population}</p>
                <p class="card-text">Capital: ${country.capital} </p>
                <p class="card-text">Area: ${country.area} sq. meters</p>
                <p class="card-text">Languages: ${languages}</p>
                <p class="card-text">Currencies: ${currencies}</p>
                <a href="${googleMapsUrl}" target="_blank" class="btn btn-primary">Map</a>
            </div>
        </div>
    </div>
`;
    
    }
  }
  
async function fetchAllCountries() {
    
  try{
  const response = await fetch(`https://restcountries.com/v3.1/all`);
 
 const data = await response.json();
 console.log(data)
 return data ;
}
catch(error){
console.error(error);
throw error;
}

}

async function displayFilteredCountries(filterLetter) {
  try {
    const allCountries = await fetchAllCountries();
    const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().startsWith(filterLetter.toLowerCase()));

    const tableContainer = document.getElementById("tableContainer")

    tableContainer.innerHTML = '';
filteredCountries.forEach((country) => {
  createCountryTable(country);
    });
  } catch (error) {
    console.error(error);
  
  }
}

const inputCountry = document.getElementById('inputCountry');

inputCountry.addEventListener("input", async function(){
    const filterLetter = inputCountry.value;
   
    try {
        await displayFilteredCountries(filterLetter);
    } catch (error) {
        console.error(error);
     
    }
});


const countriesBtn = document.getElementById("countriesBtn");

async function fetchCountriesUsingEur() {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/currency/eur`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

countriesBtn.addEventListener('click', async function () {
    try {
        const euroCountries = await fetchCountriesUsingEur();
        displayCountries(euroCountries);
    } catch (error) {
        console.error(error);
    }
});

const englishBtn = document.getElementById("englishBtn");

async function fetchCountriesEnglish() {
  try {
      const response = await fetch(`https://restcountries.com/v3.1/lang/english`);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error(error);
      throw error;
  }
}

englishBtn.addEventListener('click', async function () {
  try {
      const englishLangCountries = await fetchCountriesEnglish();
      displayCountries(englishLangCountries);
  } catch (error) {
      console.error(error);
  }
});

function displayCountries(countries) {
    const tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = '';
    countries.forEach(country => {
        createCountryTable(country);
    });
}