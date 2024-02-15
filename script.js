const searchBtn = document.getElementById("searchBtn");




async function myCountries() {
    try{
    const res = await fetch(`https://restcountries.com/v3.1/all`)
    const data = await res.json()
    console.log(data)
  
    }
    catch{(err)=>console.log(err)}
}
myCountries()

   
searchBtn.addEventListener ('click', async function(){
   
  const inputCountry = document.getElementById('inputCountry').value;
    
try{
    const countryData = await myCountries(country);
   
    console.log(countryData);

        
}
catch(error){
    console.error(error);
    
}

   
});