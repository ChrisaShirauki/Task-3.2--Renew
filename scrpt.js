// The nominatim API for search is the url : https://nominatim.openstreetmap.org/reverse?
// Infos : zoom=18&addressdetails=1 returns the required json format for these coordinates


/* LOCAT*/
//Creating function that uses Nominatim Search API : 

function searchMap(){
    const lat = parseFloat(document.getElementById("lat").value);
    const lon = parseFloat(document.getElementById("lon").value);

    //Regular expressions for LAT & LON
    const latRegexp = /^([+-]?([1-8]?\d(\.\d+)?|90(\.0+)?))$/; 
    const apiReverse = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    if(isNaN(lat) || isNaN(lon)){
        document.getElementById("warn").innerHTML="Invalid Input";
    }
    

   fetch(apiReverse,{   //Request from nominatim API to query the endpoit ( users location).
       method: 'GET',  //Search operatior that is used for data gaining.
       headers: {      // Expecting that the response will arrive in JSON format.
           'Accept' : 'application/json'
       }
   })
   .then(response=> {
    if(!response.ok){
        if (response.status === 404) {
            throw new Error('404: Not Found');
        } else if (response.status === 500) {
            throw new Error('500: Internal Server Error');
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    }
    return response.json()}) //Return the json response
   .then(data =>{                                                          //Pass json data into the modal
      document.getElementById("result").innerHTML = JSON.stringify (data, null, 4);  //Make the Json format more readable
   })
   .catch(error=>{
     console.error ('ERROR', error); // In case any error may happen
     document.getElementById("result").innerHTML = error.message;
   })

   //open modal
   document.querySelector('.msg').style.display='flex'
   
}

 //close modal 
 function closeModal(){
  document.querySelector('.msg').style.display='none';
 }


