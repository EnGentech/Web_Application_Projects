document.addEventListener('DOMContentLoaded', (event) => {

    const csrftoken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    const auth = document.getElementById("form-wrapper");
    const btn = document.getElementById("openModalBtn");
    const error_message = document.getElementById("error-message");
    const event_error_message = document.getElementById("event-error-message");
    const event_spinner = document.getElementById("event-spinner");
    const delete_event = document.querySelector(".delete_container");
    // const save = document.getElementById("saveEventBtn")

    btn.addEventListener('click', () => {
        auth.style.display = "block";
    });

    document.getElementById('saveEventBtn').addEventListener('click', (event) =>
    {
        event.preventDefault()
        event_error_message.style.display = 'none';
        event_spinner.style.display = 'block';
        setTimeout(() => {
            const retired = saveEvent();
            if (retired === "success") {
                document.getElementById("eventForm").submit(); 
            }
        }, 1000);
    });

    const formContainer = document.getElementById('form-wrapper');
    const closeButton = document.getElementById('form-close-btn');
    const cancelButton = document.getElementById('form-cancel-btn');
    const submitButton = document.querySelector('.form-submit-btn');
    const spinner = document.getElementById('spinner');

    closeButton.addEventListener('click', () => {
        formContainer.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (!formContainer.contains(event.target) && event.target !== btn) {
            formContainer.style.display = 'none';
        }
    });

    cancelButton.addEventListener('click', () => {
        document.getElementById('login-form').reset();
        spinner.style.display = 'none';
        error_message.style.display = 'none';
    });

    let events = [];
    let currentIndex = -1;
    let modal = null;

    // Functions definition
    function saveEvent() {
        event_spinner.style.display = 'none';
        event_error_message.style.display = 'none';
        const eventDate = document.getElementById("event-date").value;
        const end_eventDate = document.getElementById("end-event-date").value;
        const eventTitle = document.getElementById("event-title").value;    
        const eventDescription = document.getElementById("event-description").value;

        if (!eventDate || !end_eventDate || !eventTitle || !eventDescription) {
            event_error_message.style.display = 'block';
            event_error_message.innerText = "All fields are required.";
            return;
        }
    
        if (eventTitle.length < 3) {
            event_error_message.style.display = 'block';
            event_error_message.innerText = "The event title must be at least 3 characters long.";
            return;
        }
    
        if (eventDescription.length < 5) {
            event_error_message.style.display = 'block';
            event_error_message.innerText = "The event description must be at least 5 characters long.";
            return;
        }

        if (new Date(end_eventDate) < new Date(eventDate)) {
            event_error_message.style.display = 'block';
            event_error_message.innerText = "The end event date cannot be earlier than the start event date.";
            return;
        }
        return "success"
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

    submitButton.addEventListener('click', (event) => {
        error_message.style.display = 'none';
        event_error_message.style.display = 'none';
        event.preventDefault();
        spinner.style.display = 'block';

        setTimeout(() => {
            const data = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            };

            const url = '/SEMS-admin/auth_validation/';

            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(response => {
                const status_code = response.status_code;
                if (status_code === 200) {
                    spinner.style.display = 'none';
                    auth.style.display = 'none';

                    // Initialize modal after successful authentication
                    modal = document.getElementById("eventModal");
                    const span = document.getElementsByClassName("close")[0];

                    modal.style.display = "block";

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

                    // document.getElementById('deleteEventBtn').addEventListener('click', deleteEvent);

                } else if (status_code == 400) {
                    spinner.style.display = 'none';
                    error_message.style.display = 'block';
                    error_message.innerText = "Invalid PassCode";
                } else if (status_code == 401) {
                    spinner.style.display = 'none';
                    error_message.style.display = 'block';
                    error_message.innerText = "Invalid Credentials";
                }
            })
            .catch(error => {
                console.log(error);
            });
        }, 1000);
    });

    // Delete Event call
    document.getElementById('deleteEventBtn').addEventListener('click', (event) => {
        event.preventDefault();
        let modal = document.getElementById("eventModal");
        modal.style.display = "none";
        delete_event.style.display = 'block';
    });
});
