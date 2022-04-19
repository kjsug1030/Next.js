import Geocode from 'react-geocode'
const API_KEY='AIzaSyAYsO2CGL0YCjMoLk29eyitFC2PIJnJbYE'

Geocode.setApiKey(API_KEY)
Geocode.setLanguage('ko')
Geocode.setRegion('kr')
Geocode.enableDebug()

const GoogleMap = async (currentAddr) => {
  return Geocode.fromAddress(currentAddr)
    .then( response => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(lat,lng)
      return {lat, lng}
    })
    .catch(err => console.log(err))
}

export default GoogleMap 