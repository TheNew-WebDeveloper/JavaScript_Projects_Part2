let text = document.querySelector("#usernameInput");
let profileContainer = document.querySelector("#profileContainer");
profileContainer.setAttribute("hidden", "true");

document.querySelector("#searchBtn").addEventListener("click", function(event) {
    document.querySelector("#loader").classList.remove("hidden");
    if(text.value.length < 3) {
        let found = text.value.trim().contains(" ");
        console.log(found);
        
        if(found) {
             profileContainer.innerHTML = `<p style="color:red;">Invalid Username</p>`;
        return
        }
    } else {
        profileContainer.removeAttribute("hidden");
        fetchProfile();
    }
})

async function fetchProfile() {
    let user = text.value.trim();

    try {

        let response = await fetch(`https://api.github.com/users/${user}`);

        if (!response.ok) {
            throw new Error(response.status === 404 ? "User not found" : "Server error");
        }

        let data = await response.json();
        console.log("Data generation successed");

        document.querySelector("#loader").classList.add("hidden");

        updateUI(data);

    } catch (error) {
        document.querySelector("#loader").classList.add("hidden");

        profileContainer.innerHTML = `<p style="color:red; padding:20px;">${error.message}</p>`
    }
    
}

function updateUI(data) {
    profileContainer.innerHTML = "";
    console.log(data);
    
    let div = document.createElement("div");
    div.setAttribute("id", "github-profile");
    div.setAttribute("class", "profile-container");

    div.innerHTML = `
    <div class="profile-header">
        <img src="${data.avatar_url}" alt="GitHub Avatar" class="profile-avatar" />
        <div class="profile-info">
            <h2 class="profile-name">${data.name}</h2>
            <p class="profile-username">@${data.login}</p>
            <p class="profile-bio">${data.bio}</p>
        </div>
    </div>

    <div class="profile-stats">
        <div class="stat">
            <span class="stat-number">${data.public_repos}</span>
            <span class="stat-label">Repositories</span>
        </div>
        <div class="stat">
            <span class="stat-number">${data.followers}</span>
            <span class="stat-label">Followers</span>
        </div>
        <div class="stat">
            <span class="stat-number">${data.following}</span>
            <span class="stat-label">Following</span>
        </div>
    </div>

    <div class="profile-links">
        <a href="${data.html_url}" target="_blank">View Profile</a>
        <a href="https://github.com/${data.login}?tab=repositories" target="_blank">Repositories</a>
    </div>
    `;

    profileContainer.appendChild(div);
}
