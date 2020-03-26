
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

document.addEventListener("DOMContentLoaded", function() {
    var elements = document.getElementsByTagName("INPUT");
    for (var i = 0; i < elements.length; i++) {
        elements[i].oninvalid = function(e) {
            e.target.setCustomValidity("");
            if (!e.target.validity.valid) {
                e.target.setCustomValidity("Bro...you think i'm a joke?Fill me up Dude!With the correct patterns!");
            }
        };
        elements[i].oninput = function(e) {
            e.target.setCustomValidity("");
        };
    }
})