export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;

    const route = this.routes[pathname] || this.routes[404];
    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
        let navHome = document.querySelector("#home");
        let navUniverse = document.querySelector("#universe");
        let navExplore = document.querySelector("#explore");

        if (route == "/pages/home.html") {
          navHome.classList.add("active");
          navUniverse.classList.remove("active");
          navExplore.classList.remove("active");
        } else if (route == "/pages/universe.html") {
          navUniverse.classList.add("active");
          navHome.classList.remove("active");
          navExplore.classList.remove("active");
        } else {
          navExplore.classList.add("active");
          navUniverse.classList.remove("active");
          navHome.classList.remove("active");
        }
      });
  }
}
