function changeLocation(event)
{
    var clickedLocation = event.target.parentElement.getAttribute("id");

    var location = document.getElementById("displayLocation");
    location.value = event.target.getAttribute("value");
    location.innerHTML = event.target.innerHTML;
}

const postRegistration = async ()=>{



    var name = document.getElementById("studentName").value;
    var email = document.getElementById("studentEmail").value;
    var location = document.getElementById("displayLocation").value;

    console.log(`Post Registration Name ${name} Email ${email} Location ${location}`);

    const rawResponse = await fetch('/register', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, name: name, location: location})
    });
        const content = await rawResponse.json()
        //const content = await rawResponse;
    
    
    if(rawResponse.status == 200)
    {
        console.log(`Status 200`);
        showRegistrationMessage(`Congratulations! ${name} you are now a developer stream candidate!`);
    }
    else
    {
        console.log(content.errorMsg)
        showRegistrationMessage("Did you add all the required fields? Did you already sign up?");
    }

}

const showRegistrationMessage = (message) =>{
    var msgP = document.getElementById("registrationMsg");
    msgP.style = "visibility: visible;";
    msgP.innerHTML = message;
    setTimeout(() => {
        msgP.style = "visibility: hidden;";
    }, 5000);
}


window.onload = function(){
    console.log("loaded")
    let submitButton = document.getElementById("joinBtn");

    submitButton.addEventListener("click", postRegistration);
}



