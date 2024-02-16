const searchBtn = document.getElementById("searchBtn");
const tBody = document.getElementById("tBody")


async function fetchCountry(country) {
    
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
    const data = await fetchCountry(inputCountry);
    console.log(data);
    tBody.innerHTML = '';
    data.forEach((country) => {            
    createCountryTable(country);
       
});
}catch(error){
    console.error(error);
        
}
   
});
  
  function createCountryTable(country) {
    tBody.innerHTML += `<tr>
    <td><img src="${country.flags.png}" width="70" height="40"></td>
    <td>${country.name.common}</td>
    <td>${country.population}</td>
    <td>${country.capital}</td>
    <td>${country.area}</td>
    </tr>`;
  }
    






