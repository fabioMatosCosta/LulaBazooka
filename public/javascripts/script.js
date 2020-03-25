
window.onload = function() {
  let $username = document.querySelector("#username")
  let $password = document.querySelector("#password")
  let $usernameValidation = document.querySelector("#username-validation")
  
    $username.addEventListener("blur",(event)=>{
    axios.get(`username-exists/${$username.value}`)
    .then((response)=>{
      if(response.data.exists) $usernameValidation.innerHTML= "Sorry,username is already taken";
      else $usernameValidation.innerHTML = "Rockername Available"
    })
    .catch((err)=> {
  
    })
  })
}