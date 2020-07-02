 <template>
  <nav class="d-lg-block d-none sidebar border-right border-left">
    <div class="sidebar-sticky">
      <ul class="nav flex-column" style="width:208px" id="menu">
        <div class="col mb-2 shadow-sm border-0">
          <div class="py-3">
            <span class="fa fa-address-card fa-fw"></span>
            <a class="font-weight-bolder ml-3 badge badge-info text-white p-2">Luandre Bernardi</a>
          </div>
        </div>
        <li class="nav-item waves-effect waves-block">
          <router-link class="nav-link" to="/dashboard" active-class="active-nav-link">
            <span class="fa fa-list-alt fa-fw"></span>
            <a class="ml-3">Painel de Reuniões</a>
          </router-link>
        </li>
        <li class="nav-item waves-effect">
          <router-link class="nav-link" to="/">
            <span class="fa fa-file-text-o fa-fw"></span>
            <a class="ml-3">Relatórios</a>
          </router-link>
        </li>
        <li class="nav-item waves-effect">
          <router-link class="nav-link" to="/">
            <span class="fa fa-exchange fa-fw"></span>
            <a class="ml-3">Configurações</a>
          </router-link>
        </li>
        <li class="nav-item waves-effect waves-block">
          <router-link class="nav-link" to="/users" active-class="alert-info">
            <span class="fa fa-users fa-fw"></span>
            <a class="ml-3">Usuários</a>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- <div class="fixed mt-md-auto bottom-text-mark border-top">
          <div class="mt-3 text-center">
            <a class="text-muted">© 2020 CoAgendei.</a>
          </div>
    </div>-->
  </nav>
</template>

