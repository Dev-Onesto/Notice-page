const form = document.getElementById('event-form');
const eventsContainer = document.getElementById('eventsContainer');


const role = localStorage.getItem("role"); 

// Load events from local storage
function loadEvents() {
   return JSON.parse(localStorage.getItem('events')) || [];
}

// Save events to local storage
function saveEvents(events) {
   localStorage.setItem('events', JSON.stringify(events));
}


function renderEvents() {
   if (!eventsContainer) return;
   const events = loadEvents();
   eventsContainer.innerHTML = '';

   if (events.length === 0) {
      eventsContainer.innerHTML = '<p class="no-event" style="color:red;">No Events Available...</p>';
      return;
   }

   events.forEach((event, index) => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
         <h4 class="main-title">${event.title.toUpperCase()}</h4>
         <p>${event.description}</p>
         <p><strong>Date:</strong><span class="date-style"> ${event.date}</span></p>
         <p><strong>Category:</strong> ${event.category}</p>
         ${role === "eventAdmin" ? 
            `<div class="delete-btn-box"><button class="delete-btn" onclick="deleteEvent(${index})">Delete</button></div>` 
            : ""
         }
      `;
      eventsContainer.appendChild(card);
   });
}

function deleteEvent(index) {
   if (role !== "eventAdmin") {
      alert("Only Event Admin can delete events!");
      return;
   }

   const confirmDelete = confirm('Are you sure you want to delete this event?');
   if (!confirmDelete) return;

   const events = loadEvents();
   events.splice(index, 1);
   saveEvents(events);
   renderEvents();
}

if (form) {
   if (role === "student") {
      form.style.display = "none"; 
   } else {
      form.addEventListener('submit', (event) => {
         event.preventDefault();

         const title = document.querySelector('.event-title').value.trim();
         const description = document.getElementById('event-desc').value.trim();
         const date = document.getElementById('event-date').value;
         const category = document.getElementById('event-category').value;

         if (!title || !description || !date || !category) {
            alert('Please fill out the form.');
            return;
         }

         const newEvent = { title, description, date, category };
         const events = loadEvents();
         events.push(newEvent);
         saveEvents(events);

         alert('Event Successfully Added!');
         form.reset();
         renderEvents();
      });
   }
}


renderEvents();
