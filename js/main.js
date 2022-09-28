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
            let boxLink = document.createElement("a");
            box.classList.add("box");
            let repoName = document.createElement("h3");
            repoName.innerHTML = `<i class="fa-regular fa-folder-open"></i> ${r[i].name}`;
            let ul = document.createElement("ul");
            let language = document.createElement("li");
            // Readme
            let p = document.createElement("p");
            p.innerHTML = r[i].description;
            if (p.innerHTML === "") {
              p.innerHTML = '"no description"';
            }
            // end Readme
            if (r[i].language === null) {
              r[i].language = "unknown";
            }
            language.innerHTML = `<i class="fa-solid fa-circle"></i> ${r[i].language}`;
            if (r[i].language.toLowerCase() === "javascript") {
              language.firstChild.style.color = "#f5e98b";
            } else if (r[i].language.toLowerCase() === "css") {
              language.firstChild.style.color = "#8877a3";
            } else if (r[i].language.toLowerCase() === "scss") {
              language.firstChild.style.color = "#d786ae";
            } else if (r[i].language.toLowerCase() === "html") {
              language.firstChild.style.color = "#eb8167";
            } else if (r[i].language.toLowerCase() === "vue") {
              language.firstChild.style.color = "#7acda8";
            } else {
              language.firstChild.style.color = "#dbdbdb";
            }
            let forks = document.createElement("li");
            forks.innerHTML = `<i class="fa-solid fa-code-fork"></i> ${r[i].forks}`;
            let stars = document.createElement("li");
            stars.innerHTML = `<i class="fa-solid fa-star"></i> ${r[i].stargazers_count}`;
            let sizeLi = document.createElement("li");
            let size = [...parseInt(r[i].size).toString()];
            if (size.length > 3) {
              size[size.length - 4] = `${size[size.length - 4]},`;
              size = size.join("");
            }
            sizeLi.innerHTML = `${size} KB`;
            document.querySelector(".repos").append(box);
            box.append(boxLink);
            ul.append(language, stars, forks, sizeLi);
            boxLink.append(repoName, p, ul);
            boxLink.setAttribute("href", r[i].svn_url);
            boxLink.setAttribute("target", "_blanck");
          }
          // profile
          document
            .querySelector(".container .profile img")
            .setAttribute("src", `${r[0].owner.avatar_url}`);
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
