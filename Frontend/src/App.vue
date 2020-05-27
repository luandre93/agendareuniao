
<template>
  <div class="container-fluid" id="menu">
    <nav class="navbar-expand-sm navbar-dark pb-2 pt-2 border-bottom shadow-sm bg-white fixed-top">
      <a class="navbar-brand bg-dark pl-2 pr-2 ml-2" href="#">CoAgendei.</a>
    </nav>

    <div class="row" id="app">
      <nav class="d-none d-md-block sidebar shadow">
        <div class="sidebar-sticky">
          <ul class="nav flex-column">
            <li class="nav-item waves-effect">
              <a class="nav-link" href="#/dashboard">
                <span class="fa fa-list-alt fa-fw"></span>
                <a class="ml-3">Painel de Reuniões</a>
              </a>
            </li>
            <li class="nav-item waves-effect">
              <a class="nav-link" href="#">
                <span class="fa fa-file-text-o fa-fw"></span>
                <a class="ml-3">Relatórios</a>
              </a>
            </li>
            <li class="nav-item waves-effect">
              <a class="nav-link" href="#">
                <span class="fa fa-users fa-fw"></span>
                <a class="ml-3">Configurações</a>
              </a>
            </li>
            <li class="nav-item waves-effect">
              <a class="nav-link" href="#/users">
                <span class="fa fa-users fa-fw"></span>
                <a class="ml-3">Usuários</a>
              </a>
            </li>
          </ul>
        </div>
        <!-- <div class="fixed mt-md-auto bottom-text-mark border-top">
          <div class="mt-3 text-center">
            <a class="text-muted">© 2020 CoAgendei.</a>
          </div>
        </div>-->
      </nav>

      <main role="main" class="ml-lg-auto col-lg-10 px-5 mt-5">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: left;
  position: fixed;
  min-width: 220px;
  width: 220px;
  height: 100%;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: fixed;
  top: 0;
  height: calc(80vh - 50px);
  padding-top: 5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.nav-link:hover {
  background-color: #f9f9f9;
  color: #343a40;
  border-bottom: 0.5px #dee2e6 !important;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

/*
 * Content
 */

[role="main"] {
  padding-top: 50px; /* Space for fixed navbar */
}

@media (min-width: 768px) {
  [role="main"] {
    padding-top: 50px; /* Space for fixed navbar */
  }
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>


