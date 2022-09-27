const input = document.querySelector(".form input");
const getReposBtn = document.querySelector(".form button#get-repos");
const fieldEmpty = document.querySelector(".form span");

getReposBtn.addEventListener("click", () => {
  getRepos(input.value);
});
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getRepos(input.value);
  }
});

function getRepos(username) {
  if (input.value === "" || input.value === null) {
    fieldEmpty.classList.add("empty");
    fieldEmpty.innerHTML = `username is empty`;
  } else {
    document.querySelector(".form").style.display = "none";
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((respons) => {
        return respons.json();
      })
      .then((r) => {
        console.log(r);
        if (r.length === 0) {
          fieldEmpty.classList.add("empty");
          fieldEmpty.innerHTML = "username not valid";
          return;
        } else {
          if (r.length > 15) {
            r.length = 15;
          }
          document.querySelector(
            ".container h2"
          ).innerHTML = `${input.value} Repositories`;
          document.querySelector(".repos").innerHTML = "";
          input.value = "";
          fieldEmpty.classList.remove("empty");
          for (let i in r) {
            let box = document.createElement("div");
            box.classList.add("box");
            let repoName = document.createElement("h3");
            repoName.innerText = r[i].name;
            let ul = document.createElement("ul");
            let id = document.createElement("li");
            id.innerText = `id: ${r[i].id}`;
            let visibility = document.createElement("li");
            visibility.innerText = `visibility: ${r[i].visibility}`;
            let watchers = document.createElement("li");
            watchers.innerText = `watchers: ${r[i].watchers}`;
            let language = document.createElement("li");
            if (r[i].language === null) {
              r[i].language = "unknown";
            }
            language.innerText = `language: ${r[i].language}`;
            let forks = document.createElement("li");
            forks.innerText = `Forks: ${r[i].forks}`;
            let url = document.createElement("li");
            url.innerHTML = `link: <a href="${r[i].svn_url}">${r[i].svn_url}</a>`;
            document.querySelector(".repos").append(box);
            ul.append(id, visibility, watchers, language, forks, url);
            box.append(repoName, ul);
          }
        }
      });
  }
}
