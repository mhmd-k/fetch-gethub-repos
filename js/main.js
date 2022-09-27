const input = document.querySelector(".form input");
const getReposBtn = document.querySelector(".form button#get-repos");

getReposBtn.addEventListener("click", () => {
  getRepos(input.value);
});
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getRepos(input.value);
  }
});
let s = 0;
let f = 0;
function getRepos(username) {
  if (input.value === "" || input.value === null) {
    console.log("empty");
  } else {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then((respons) => {
        return respons.json();
      })
      .then((r) => {
        console.log(r);
        if (r.length === 0) {
          console.log("empty");
          return;
        } else {
          // remove form and display container
          document.querySelector(".form").style.display = "none";
          document.querySelector(".container").classList.remove("none");
          // end remove form and display container
          document.querySelector(".repos").innerHTML = "";
          input.value = "";
          for (let i in r) {
            s += r[i].stargazers_count;
            f += r[i].forks;
            let box = document.createElement("div");
            box.classList.add("box");
            let repoName = document.createElement("h3");
            repoName.innerText = r[i].name;
            let ul = document.createElement("ul");
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
            ul.append(visibility, watchers, language, forks, url);
            box.append(repoName, ul);
          }
          // profile
          document
            .querySelector(".container .profile img")
            .setAttribute("src", `${r[0].owner.avatar_url}`);
          console.log(r[0].owner.url);
          fetch(`https://api.github.com/users/${username}`)
            .then((url) => {
              return url.json();
            })
            .then((url) => {
              document.querySelector(".container .profile h2.name").innerHTML =
                url.name;
              document.querySelector(
                ".container .profile .info .followers .num"
              ).innerText = url.followers;
              document.querySelector(
                ".container .profile .info .following .num"
              ).innerText = url.following;
            });
          document.querySelector(
            ".container .profile h2 a"
          ).innerHTML = `@${username}`;
          document
            .querySelector(".container .profile h2 a")
            .setAttribute("href", r[0].owner.html_url);
          document.querySelector(
            ".container .profile .icon .stars"
          ).innerHTML = `<i class="fa-solid fa-star"></i> ${s}`;
          document.querySelector(
            ".container .profile .icon .forks"
          ).innerHTML = `<i class="fa-solid fa-code-fork"></i> ${f}`;
          document.querySelector(
            ".container .profile .info .repositories .num"
          ).innerText = r.length;
          // end profile
        }
      });
  }
}

// back button
const backBtn = document.querySelector(".refresh");
backBtn.addEventListener("click", () => {
  window.location.reload();
});
