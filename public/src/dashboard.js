window.onload = async () => {
    await fetch("/check-login", {
        method: "POST",
        credentials: "same-origin",
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.message == "Not logged in") {
                window.location.href = "/";
                return;
            }

            document.getElementsByTagName("body")[0].style.display = "flex";
            document.getElementsByClassName("user-name")[0].textContent = data.message;
        })
        .catch((error) => {
            console.log(error);
        });
};

// calendar start

document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const currentMonthEl = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    let currentDate = new Date();

    function renderCalendar(date) {
        const month = date.getMonth();
        const year = date.getFullYear();

        currentMonthEl.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });

        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);

        const firstDayWeekday = firstDayOfMonth.getDay(); // 0 - sunday, 6 - saturday
        const totalDaysInMonth = lastDayOfMonth.getDate();

        calendarEl.innerHTML = '';

        for (let i = 0; i < firstDayWeekday; i++) {
            calendarEl.appendChild(document.createElement('div'));
        }

        for (let i = 1; i <= totalDaysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.textContent = i;
            dayEl.addEventListener('click', function () {
                const selectedDay = document.querySelector('.selected-day');
                if (selectedDay) selectedDay.classList.remove('selected-day');
                dayEl.classList.add('selected-day');
                console.log('Selected date:', `${month + 1}-${i}-${year}`);
            });

            calendarEl.appendChild(dayEl);
        }
    }

    renderCalendar(currentDate);

    prevMonthBtn.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });
});

// calendar end

document.getElementById('home').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/dashboard';
});

document.getElementById('logout-link').addEventListener('click', (event) => {
    event.preventDefault();

    fetch('/logout', {
        method: 'POST',
        credentials: "same-origin",
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '/';
            } else {
                console.error('Logout failed:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});