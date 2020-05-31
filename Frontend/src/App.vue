
<template>
  <div class="container-fluid" id="menu">
    <nav class="navbar-expand-sm navbar-dark py-1 border-bottom shadow-sm bg-dark fixed-top">
      <div class="navbar-brand pl-2 pr-2 border-0" style="width: 210px; margin-left:15px">
        <a class="mx-5">CoAgendei.</a>
      </div>
    </nav>

    <div id="app">
      <nav class="d-lg-block d-none sidebar border-right border-left">
        <div class="sidebar-sticky">
          <ul class="nav flex-column" style="width:208px">
            <div class="col mb-2 shadow-sm border-0">
              <div class="py-3">
                <span class="fa fa-address-card fa-fw"></span>
                <a class="font-weight-bolder ml-3 badge badge-info text-white p-2">Luandre Bernardi</a>
              </div>
            </div>
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
            <li class="nav-item waves-effect waves-block">
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
    </div>
    <div role="root" style="margin-left: 230px; ">
      <main role="main" class="ml-lg-auto col-auto mt-5 pb-3">
        <div
          class="shadow-sm border rounded pl-4 pr-4 pb-5 pt-2"
          style="border-color: #eee!important"
        >
          <router-view />
        </div>
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

.border-color-light {
  border-color: #eee !important;
}
.font-custom {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  font-size: 0.875rem;
}

@media (max-width: 991px) {
  [role="root"] {
    margin-left: 0 !important;
  }
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

.shadow-custom {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
/*
 * Sidebar
 */

.sidebar {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  text-align: left;
  position: fixed;
  min-width: 210px;
  width: 210px;
  height: 100%;
}

.sidebar-sticky {
  position: fixed;
  top: 0;
  height: calc(80vh - 50px);
  padding-top: 3rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
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
  color: #007bff2f;
}

.nav-link:hover {
  background-color: #17a2b8;
  color: #fff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.8rem;
  text-transform: uppercase;
}

/*
 * Content
 */

[role="main"] {
  padding-top: 35px; /* Space for fixed navbar */
}

@media (min-width: 766px) {
  [role="main"] {
    padding-top: 35px; /* Space for fixed navbar */
  }
}
@media (min-width: 992px) {
  [role="main"] {
    width: 100% !important;
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

input:focus,
button:focus,
select:focus {
  background-color: #fff;
  box-shadow: none !important;
}
</style>


