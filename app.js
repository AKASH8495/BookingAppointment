// get the form element

const bookingForm = document.getElementById("bookingForm");

// get the list element for display booked appointment

const appointmentList = document.getElementById("appointments");

// add submit event listner form

bookingForm.addEventListener("submit", (event) =>{
  event.preventDefault();  // prevent form for submission

  // get form data

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const date = document.getElementById("date").value;
const time = document.getElementById("time").value;

// Validate form data


if(!name || !email || !date || !time){
  alert("Please fill in all fields.");
  return ;
}

//creat a new list item for the appointment 

const listItem = document.createElement("li");
listItem.textContent = `${name} - ${email} - ${date} - ${time}`;


// creat  a delete button for appointment

const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.classList.add("delete-btn");
listItem.appendChild(deleteBtn);

// add list itme to the list appointment

appointmentList.appendChild(listItem);

// reset the form

bookingForm.reset();


// Store user details in local storage


const appointment = {
  name : name,
  email : email,
  date  : date,
  time : time,
};


const appointments = JSON.parse(localStorage.getItem("appointments")) || [] ;

appointments.push(appointment);

localStorage.setItem("appointments", JSON.stringify(appointments));
});



// add eventListner on Delete button

appointmentList.addEventListener("click", (event) =>{
  if(event.target.classList.contains("delete-btn")){
    const listItem = event.target.parentElement;
    listItem.remove();

    //get the appointemnet delete as the UI for localStorage
    const appointmentId = listItem.textContent;

    const appointemnets = JSON.parse(localStorage.getItem("appointemnets"))|| [];

    const updateAppointemnet = appointemnets.filter(
      (appointemnet) => `${appointemnet.name} - ${appointemnet.email} - ${appointemnet.date}- ${appointemnet.time}` !== appointmentId
    );

    localStorage.setItem("appointemnets", JSON.stringify(updateAppointemnet))
  
  }
  
});
