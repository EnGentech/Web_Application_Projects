document.addEventListener('DOMContentLoaded', (event) => {
    const modal = document.getElementById("eventModal");
    const btn = document.getElementById("openModalBtn");
    const span = document.getElementsByClassName("close")[0];
    let events = [];
    let currentIndex = -1;

    btn.addEventListener('click', () => {
        modal.style.display = "block";
    });

    span.addEventListener('click', () => {
        modal.style.display = "none";
        clearForm();
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            clearForm();
        }
    });

    document.getElementById('saveEventBtn').addEventListener('click', saveEvent);
    document.getElementById('deleteEventBtn').addEventListener('click', deleteEvent);

    function saveEvent() {
        const eventDate = document.getElementById("event-date").value;
        const eventTitle = document.getElementById("event-title").value;
        const eventDescription = document.getElementById("event-description").value;

        if (currentIndex === -1) {
            events.push({ date: eventDate, title: eventTitle, description: eventDescription });
        } else {
            events[currentIndex] = { date: eventDate, title: eventTitle, description: eventDescription };
            currentIndex = -1;
        }

        renderEvents();
        clearForm();
        modal.style.display = "none";
    }

    function deleteEvent() {
        if (currentIndex !== -1) {
            events.splice(currentIndex, 1);
            renderEvents();
            clearForm();
            modal.style.display = "none";
            currentIndex = -1;
        }
    }

    function editEvent(index) {
        currentIndex = index;
        const event = events[index];
        document.getElementById("event-date").value = event.date;
        document.getElementById("event-title").value = event.title;
        document.getElementById("event-description").value = event.description;
        modal.style.display = "block";
    }

    function renderEvents() {
        const eventsList = document.getElementById("eventsList");
        eventsList.innerHTML = '<h2>Saved Events</h2>';
        events.forEach((event, index) => {
            const eventItem = document.createElement("div");
            eventItem.className = "event-item";
            eventItem.innerHTML = `<h3>${event.title}</h3>
                                   <p><strong>Date:</strong> ${event.date}</p>
                                   <p>${event.description}</p>
                                   <button onclick="editEvent(${index})">Edit</button>`;
            eventsList.appendChild(eventItem);
        });
    }

    function clearForm() {
        document.getElementById("eventForm").reset();
    }
});
