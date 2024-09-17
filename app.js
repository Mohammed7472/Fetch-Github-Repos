let input = document.querySelector(".get-repos input");
let getBtn = document.querySelector(".get-repos .btn");
let dataBox = document.querySelector(".data-box");

getBtn.onclick = function () {
  if (input.value === "") {
    dataBox.style.textAlign = "center";
    dataBox.innerHTML = `<span>Please Enter Github Username.</span>`;
  } else {
    dataBox.innerHTML = "";
    getRepos(input.value);
  }
};

async function getRepos(username) {
  try {
    let response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    if (!response.ok) {
      throw new Error("Invalid Response From Github");
    }
    let repos = await response.json();
    if (repos.length === 0) {
      dataBox.style.textAlign = "center";
      dataBox.innerHTML = `<span>No Repos Found For This User.</span>`;
      return;
    }
    repos.forEach((repo) => {
      dataBox.innerHTML += `<div class="repo">
          <p>${repo.name}</p>
          <div class="info">
            <span class="stars">Stars ${repo.stargazers_count}</span>
            <a href = "${repo.svn_url}" target = "_blank">Visit</a>
          </div>
        </div>`;
    });
  } catch (error) {
    dataBox.style.textAlign = "center";
    dataBox.innerHTML = `<span>Error: ${error.message}, Check the GitHub username or your network connection.</span>`;
  }
}