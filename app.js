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

// create an edit button for the appointment
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  listItem.appendChild(editBtn);

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
 // Send POST request to the API
axios.post('https://crudcrud.com/api/6718ea8d86e54f7bbc28ee49eb037a68/appointments', appointment)
  .then(response => {
    console.log(response.data);
   
  })
  .catch(error => {
    console.error(error);
  });
// const appointments = JSON.parse(localStorage.getItem("appointments")) || [] ;

// appointments.push(appointment);

// localStorage.setItem("appointments", JSON.stringify(appointments));
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

  if (event.target.classList.contains("edit-btn")) {
    const listItem = event.target.parentElement;
    const appointmentId = listItem.textContent;
    const [name, email, date, time] = appointmentId.split(" - ");
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;

    listItem.remove();

    // get the appointment details from the UI for localStorage
    const appointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    const updateAppointemnet = appointments.filter(
      (appointment) =>
        `${appointment.name} - ${appointment.email} - ${appointment.date} - ${appointment.time}` !== appointmentId
    );

    localStorage.setItem(
      "appointments",
      JSON.stringify(updateAppointemnet)
    );
  }
  
});
