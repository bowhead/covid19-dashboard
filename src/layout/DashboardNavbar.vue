<template>
  <base-nav class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand>
    <div class="d-none d-md-flex mr-lg-auto ml-lg-5">
     <!-- <base-button outline pill type="secondary">Dashboard</base-button> -->

     <!-- <base-dropdown>
        <base-button outline pill slot="title" type="secondary" class="dropdown-toggle">
        Download raw data
        </base-button>
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Separated link</a>
      </base-dropdown>

     <base-dropdown>
        <base-button outline pill slot="title" type="secondary" class="dropdown-toggle">
        Downlaod raw data
        </base-button>
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Separated link</a>
      </base-dropdown> -->

     <!-- <base-dropdown>
        <base-button outline pill slot="title" type="secondary" class="dropdown-toggle">
        Edit current study
        </base-button>
        <router-link to="/profile" class="dropdown-item">
          <i class="ni ni-single-02"></i>
          <span>My profile</span>
        </router-link>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Separated link</a>
      </base-dropdown> -->

    </div>

    <div class="align-items-center d-none d-md-flex">
      <!-- <base-dropdown class="nav-link pr-0">
        <div class="media align-items-center" slot="title">
          <span class="avatar avatar-sm rounded-circle bg-primary">
            <i class="fa fa-user" aria-hidden="true"></i>
          </span>
        </div>

        <template>
            <div class=" dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <router-link to="/profile" class="dropdown-item">
                <i class="ni ni-single-02"></i>
                <span>My profile</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
                <i class="ni ni-settings-gear-65"></i>
                <span>Settings</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
                <i class="ni ni-calendar-grid-58"></i>
                <span>Activity</span>
            </router-link>
            <router-link to="/profile" class="dropdown-item">
                <i class="ni ni-support-16"></i>
                <span>Support</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link to="/profile" class="dropdown-item">
                <i class="ni ni-user-run"></i>
                <span>Logout</span>
            </router-link>
        </template>
      </base-dropdown> -->

      <base-dropdown class="nav-link pr-0" position="right">
        <div class="media align-items-center" slot="title">
          <span class="avatar avatar-sm rounded-circle bg-default">
            <i class="fa fa-window-restore"></i>
          </span>
        </div>

        <template>
          <a class="dropdown-item" @click="logout">
            <i class="ni ni-user-run"></i>
            <span>Logout</span>
          </a>
        </template>
      </base-dropdown>
    </div>
  </base-nav>
</template>

<script>
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },
    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      logout() {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push({ name: 'login' })
          })
      }
    }
  };
</script>
