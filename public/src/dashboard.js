/*const icon = document.getElementById('mode');

function toggleTheme() {
    const body = document.getElementsByTagName("body")[0];
    const menuBar = document.getElementsByClassName("menu-bar")[0];
    const menuLinks = document.querySelectorAll(".menu-bar a");
    const profileName = document.querySelectorAll(".profile .user-name");
    const content = document.querySelector(".content");

    if (localStorage.getItem('theme') === 'dark') {
        // Dark mode
        body.style.backgroundColor = "#252525";
        body.style.color = "white"; // Text color for dark mode

        // Menu bar styles for dark mode
        menuBar.style.backgroundColor = "#444444";
        menuLinks.forEach(link => {
            link.style.color = "white"; // Menu links text color for dark mode
            link.style.transition = "background-color 0.3s ease";
        });

        // Menu bar hover effect for dark mode
        menuLinks.forEach(link => {
            link.addEventListener("mouseover", () => {
                link.style.backgroundColor = "#343434"; // Darker background on hover
            });
            link.addEventListener("mouseout", () => {
                link.style.backgroundColor = ""; // Reset background when not hovered
            });
        });

        // Profile section for dark mode
        profileName.forEach(name => {
            name.style.color = "white"; // Profile name color
        });

        // Content section for dark mode
        content.style.color = "white"; // Text color for content in dark mode

        // Scrollbar for dark mode
        document.documentElement.style.scrollbarColor = "#555 #222"; // Dark theme scrollbar
        document.documentElement.style.scrollbarWidth = "thin";

        console.log("SWITCHED TO DARK");
        localStorage.setItem('theme', 'dark');
    } else {
        // Light mode
        body.style.backgroundColor = "#FFFFFF";
        body.style.color = "black"; // Text color for light mode

        // Menu bar styles for light mode
        menuBar.style.backgroundColor = "#f1f1f1";
        menuLinks.forEach(link => {
            link.style.color = "black"; // Menu links text color for light mode
            link.style.transition = "background-color 0.3s ease";
        });

        // Menu bar hover effect for light mode
        menuLinks.forEach(link => {
            link.addEventListener("mouseover", () => {
                link.style.backgroundColor = "#e2e2e2"; // Light background on hover
            });
            link.addEventListener("mouseout", () => {
                link.style.backgroundColor = ""; // Reset background when not hovered
            });
        });

        // Profile section for light mode
        profileName.forEach(name => {
            name.style.color = "black"; // Profile name color
        });

        // Content section for light mode
        content.style.color = "black"; // Text color for content in light mode

        // Scrollbar for light mode
        document.documentElement.style.scrollbarColor = "#888 #ccc"; // Light theme scrollbar
        document.documentElement.style.scrollbarWidth = "thin";

        console.log("SWITCHED TO LIGHT");
        localStorage.setItem('theme', 'light');
    }
}*/

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

           /* if (localStorage.getItem('theme') === 'dark') {
                if (icon.classList.contains("fa-sun")) icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                if (icon.classList.contains("fa-moon")) icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }

            toggleTheme();*/
        })
        .catch((error) => {
            console.log(error);
        });
};

/*icon.addEventListener('click', (event) => {
    event.preventDefault();

    if (localStorage.getItem('theme') === 'dark') {
        if (icon.classList.contains("fa-moon")) icon.classList.remove('fa-moon');
        localStorage.setItem('theme', 'light');
        icon.classList.add('fa-sun');
    } else {
        if (icon.classList.contains("fa-sun")) icon.classList.remove('fa-sun');
        localStorage.setItem('theme', 'dark');
        icon.classList.add('fa-moon');
    }

    toggleTheme();
});*/

//modal

const settingsLink = document.getElementById('settings-link');
  const settingsModal = document.getElementById('settings-modal');
  const closeBtn = document.querySelector('.close-btn');
  const themeSelect = document.getElementById('theme-select');
  const notificationsCheckbox = document.getElementById('notifications');

  // Function to open the settings modal
  settingsLink.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default action (e.g., link navigation)
    settingsModal.style.display = 'block'; // Show the modal
  });

  // Close the settings modal
  closeBtn.addEventListener('click', function() {
    settingsModal.style.display = 'none'; // Hide the modal
  });

  // Close the modal if the user clicks outside of it
  window.addEventListener('click', function(e) {
    if (e.target === settingsModal) {
      settingsModal.style.display = 'none'; // Hide the modal if clicked outside
    }
  });

  // Listen for theme change and apply it
  themeSelect.addEventListener('change', function() {
    const selectedTheme = themeSelect.value;
    document.body.classList.remove('dark-mode', 'light-mode');
    document.body.classList.add(selectedTheme + '-mode');
    localStorage.setItem('theme', selectedTheme); // Save to localStorage for persistence
  });

  // Load saved theme from localStorage on page load
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.add(savedTheme + '-mode');
  themeSelect.value = savedTheme;

  // Optional: Listen for notifications toggle
  notificationsCheckbox.addEventListener('change', function() {
    if (notificationsCheckbox.checked) {
      console.log('Notifications enabled');
    } else {
      console.log('Notifications disabled');
    }
  });
  
  //modal end

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