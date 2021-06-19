<script>
  import { LogOut } from "../firebaseAPI";
  function logOut() {
    LogOut();
  }
</script>

<nav class="navbar" style="left: 0; z-index: 9;">
  <ul class="navbar-nav">
    <li class="logo">
      <a href="/#" class="nav-link">
        <span class="link-text logo-text">Grouting BO</span>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="angle-double-right"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          class="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
        >
          <g class="fa-group">
            <path
              fill="currentColor"
              d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
              class="fa-secondary"
            />
            <path
              fill="currentColor"
              d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
              class="fa-primary"
            />
          </g>
        </svg>
      </a>
    </li>
    <!-- Productos Link -->
    <li class="nav-item">
      <a href="/#/Productos" class="nav-link">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="warehouse-alt"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          class="svg-inline--fa fa-warehouse-alt fa-w-20 fa-5x"
        >
          <g class="fa-group">
            <path
              fill="currentColor"
              d="M304 416H144a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-128H144a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm192 128H368a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16z"
              class="fa-secondary"
            />
            <path
              fill="currentColor"
              d="M640 161.28V504a8 8 0 0 1-8 8h-48a8 8 0 0 1-8-8V208a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v296a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V161.28A48.11 48.11 0 0 1 29.5 117l272-113.3a48.06 48.06 0 0 1 36.9 0L610.5 117a48.11 48.11 0 0 1 29.5 44.28z"
              class="fa-primary"
            />
          </g>
        </svg>
        <span class="link-text">Productos</span>
      </a>
    </li>
    <!-- Ventas Link -->
    <li class="nav-item">
      <a href="/#/Ventas" class="nav-link">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="cash-register"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="svg-inline--fa fa-cash-register fa-w-16 fa-7x"
        >
          <g class="fa-group">
            <path
              fill="currentColor"
              d="M296.1 232a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm-48 128h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16h-16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16zm-16-112a16 16 0 0 0-16-16h-16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16zm-96 0a16 16 0 0 0-16-16h-16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16zm48 96v-16a16 16 0 0 0-16-16h-16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16zm160 88h-176a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h176a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm16-120h-16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zm48-80h-16a16 16 0 0 0-16 16v16a16 16 0 0 0 16 16h16a16 16 0 0 0 16-16v-16a16 16 0 0 0-16-16zM144 192l64 .1v-64h96a16 16 0 0 0 16-16V16a16 16 0 0 0-16-16H48a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h96zM82 84V44h188v40z"
              class="fa-secondary"
            />
            <path
              fill="currentColor"
              d="M511.2 378.8l-26.7-160a32 32 0 0 0-31.6-26.7L208 192v.06l-47.54-.06H59.2a32.09 32.09 0 0 0-31.6 26.7L.9 378.7a62 62 0 0 0-.9 10.5V480a32 32 0 0 0 32 32h448a32 32 0 0 0 32-32v-90.7a53.09 53.09 0 0 0-.8-10.5zM280.1 248a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16zm-32 64h16a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16zm-64-64a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16zm-64 32h-16a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16zm16 64v-16a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16v16a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16zm216 112a8 8 0 0 1-8 8h-176a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8zm24-112a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16zm48-80a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16z"
              class="fa-primary"
            />
          </g>
        </svg>
        <span class="link-text">Ventas</span>
      </a>
    </li>
    <!-- GAstos Link -->
    <li class="nav-item">
      <a href="#/Gastos" class="nav-link">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="money-check-alt"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          class="svg-inline--fa fa-money-check-alt fa-w-20 fa-5x"
        >
          <g class="fa-group">
            <path
              fill="currentColor"
              d="M608 32H32A32 32 0 0 0 0 64v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V64a32 32 0 0 0-32-32zM176 327.88V344a8 8 0 0 1-8 8h-16a8 8 0 0 1-8-8v-16.29a57.26 57.26 0 0 1-31.37-11.35 8 8 0 0 1-.57-12.14L123.81 293a8.21 8.21 0 0 1 10.13-.73 24.08 24.08 0 0 0 12.82 3.73h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V152a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8v16.29a57.18 57.18 0 0 1 31.37 11.35 8 8 0 0 1 .57 12.14L196.18 203a8.21 8.21 0 0 1-10.13.73 24 24 0 0 0-12.82-3.73h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07zM416 312a8 8 0 0 1-8 8H296a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8zm160 0a8 8 0 0 1-8 8h-80a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8zm0-96a8 8 0 0 1-8 8H296a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h272a8 8 0 0 1 8 8z"
              class="fa-secondary"
            />
            <path
              fill="currentColor"
              d="M144 168.12V152a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8v16.29a57.18 57.18 0 0 1 31.37 11.35 8 8 0 0 1 .57 12.14L196.18 203a8.21 8.21 0 0 1-10.13.73 24 24 0 0 0-12.82-3.73h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19 44.44-42.67 45.07V344a8 8 0 0 1-8 8h-16a8 8 0 0 1-8-8v-16.29a57.26 57.26 0 0 1-31.37-11.35 8 8 0 0 1-.57-12.14L123.81 293a8.21 8.21 0 0 1 10.13-.73 24.08 24.08 0 0 0 12.82 3.73h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.68-45.07z"
              class="fa-primary"
            />
          </g>
        </svg>
        <span class="link-text">Gastos</span>
      </a>
    </li>
    <!-- Usuarios -->
    <li class="nav-item">
      <a href="#/Usuarios" class="nav-link">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="users-crown"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          class="svg-inline--fa fa-users-crown fa-w-20 fa-5x"
        >
          <g class="fa-group">
            <path
              fill="currentColor"
              d="M96 224a64 64 0 1 0-64-64 64 64 0 0 0 64 64zm448 0a64 64 0 1 0-64-64 64 64 0 0 0 64 64zm32 32h-64a63.78 63.78 0 0 0-45.07 18.59A146.54 146.54 0 0 1 542.06 384H608a32 32 0 0 0 32-32v-32a64 64 0 0 0-64-64zm-512 0a64 64 0 0 0-64 64v32a32 32 0 0 0 32 32h65.94a146.54 146.54 0 0 1 75.13-109.41A63.78 63.78 0 0 0 128 256zM320 32l-48 24-48-24v80h192V32l-48 24z"
              class="fa-secondary"
            />
            <path
              fill="currentColor"
              d="M320 256a96 96 0 0 0 96-96v-16H224v16a96 96 0 0 0 96 96zm76.8 32h-8.31c-20.84 10-43.89 16-68.49 16s-47.64-6-68.49-16h-8.31A115.2 115.2 0 0 0 128 403.2V432a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-28.8A115.2 115.2 0 0 0 396.8 288z"
              class="fa-primary"
            />
          </g>
        </svg>
        <span class="link-text">Usuarios</span>
      </a>
    </li>
    <!-- Clientes Link -->
    <li class="nav-item">
      <a href="#/Clientes" class="nav-link">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="users"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          class="svg-inline--fa fa-users fa-w-20 fa-5x"
        >
          <g class="fa-group">
            <path
              fill="currentColor"
              d="M96 224a64 64 0 1 0-64-64 64.06 64.06 0 0 0 64 64zm480 32h-64a63.81 63.81 0 0 0-45.1 18.6A146.27 146.27 0 0 1 542 384h66a32 32 0 0 0 32-32v-32a64.06 64.06 0 0 0-64-64zm-512 0a64.06 64.06 0 0 0-64 64v32a32 32 0 0 0 32 32h65.9a146.64 146.64 0 0 1 75.2-109.4A63.81 63.81 0 0 0 128 256zm480-32a64 64 0 1 0-64-64 64.06 64.06 0 0 0 64 64z"
              class="fa-secondary"
            />
            <path
              fill="currentColor"
              d="M396.8 288h-8.3a157.53 157.53 0 0 1-68.5 16c-24.6 0-47.6-6-68.5-16h-8.3A115.23 115.23 0 0 0 128 403.2V432a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-28.8A115.23 115.23 0 0 0 396.8 288zM320 256a112 112 0 1 0-112-112 111.94 111.94 0 0 0 112 112z"
              class="fa-primary"
            />
          </g>
        </svg>
        <span class="link-text">Clientes</span>
      </a>
    </li>
    <!-- Facturas Link-->
    <li class="nav-item">
      <a href="#/Facturas" class="nav-link">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="file-invoice"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          class="svg-inline--fa fa-file-invoice fa-w-12 fa-5x"
        >
          <g class="fa-group">
            <path
              fill="currentColor"
              d="M96 320h192v-64H96zm288-192H272a16 16 0 0 1-16-16V0H24A23.94 23.94 0 0 0 0 23.88V488a23.94 23.94 0 0 0 23.88 24H360a23.94 23.94 0 0 0 24-23.88V128zM64 72a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8zm0 64a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v16a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8zm256 304a8 8 0 0 1-8 8h-80a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8zm0-104a16 16 0 0 1-16 16H80a16 16 0 0 1-16-16v-96a16 16 0 0 1 16-16h224a16 16 0 0 1 16 16z"
              class="fa-secondary"
            />
            <path
              fill="currentColor"
              d="M377 105L279.1 7a24 24 0 0 0-17-7H256v112a16 16 0 0 0 16 16h112v-6.1a23.9 23.9 0 0 0-7-16.9zm-73 119H80a16 16 0 0 0-16 16v96a16 16 0 0 0 16 16h224a16 16 0 0 0 16-16v-96a16 16 0 0 0-16-16zm-16 96H96v-64h192zm24 96h-80a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h80a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"
              class="fa-primary"
            />
          </g>
        </svg>
        <span class="link-text">Facturas</span>
      </a>
    </li>
    <!-- Despachos Link 
        <li class="nav-item">
            <a href="#/Despachos" class="nav-link">
                <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="truck-loading" role="img"
                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"
                     class="svg-inline--fa fa-truck-loading fa-w-20 fa-5x">
                    <g class="fa-group">
                        <path fill="currentColor"
                              d="M247.8 123.8a16 16 0 0 0-19.6-11.3L151 133.3l24.8 92.7-61.8 16.5-24.8-92.7-77.3 20.7A16 16 0 0 0 .6 190.1l49.6 185.5a16 16 0 0 0 19.6 11.3l216.4-58a16 16 0 0 0 11.3-19.6zM544 320a96 96 0 1 0 96 96 96 96 0 0 0-96-96z"
                              class="fa-secondary"></path>
                        <path fill="currentColor"
                              d="M384 0a32 32 0 0 0-32 32v323.6L5.9 450a8 8 0 0 0-5.6 9.8l12.6 46.3a8 8 0 0 0 9.8 5.6l393.7-107.4c0 .33 0 .66.05 1C421.91 339.7 477 288 544 288a127.71 127.71 0 0 1 96 43.44V0zM175.8 226L151 133.3l-61.8 16.5 24.8 92.7z"
                              class="fa-primary"></path>
                    </g>
                </svg>
                <span class="link-text">Despachos</span>
            </a>
        </li-->
    <!--Creditos Link -->
    <li class="nav-item">
      <a href="#/Creditos" class="nav-link">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="receipt"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          class="svg-inline--fa fa-receipt fa-w-12 fa-5x"
        >
          <g class="fa-group">
            <path
              fill="currentColor"
              d="M358.4 3.23L320 48 265.6 3.23a15.9 15.9 0 0 0-19.2 0L192 48 137.6 3.23a15.9 15.9 0 0 0-19.2 0L64 48 25.6 3.23A16 16 0 0 0 0 16v480a16 16 0 0 0 25.6 12.8L64 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L192 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L320 464l38.4 44.8A16 16 0 0 0 384 496V16a16 16 0 0 0-25.6-12.77zM320 360a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h240a8 8 0 0 1 8 8zm0-96a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h240a8 8 0 0 1 8 8zm0-96a8 8 0 0 1-8 8H72a8 8 0 0 1-8-8v-16a8 8 0 0 1 8-8h240a8 8 0 0 1 8 8z"
              class="fa-secondary"
            />
            <path
              fill="currentColor"
              d="M312 144H72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h240a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0 96H72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h240a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8zm0 96H72a8 8 0 0 0-8 8v16a8 8 0 0 0 8 8h240a8 8 0 0 0 8-8v-16a8 8 0 0 0-8-8z"
              class="fa-primary"
            />
          </g>
        </svg>
        <span class="link-text">Creditos</span>
      </a>
    </li>

    <!-- Almacenes LKink-->
    <li class="nav-item">
      <a href="#/Almacenes" class="nav-link">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="exchange-alt"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="svg-inline--fa fa-exchange-alt fa-w-16 fa-7x"
        >
          <g class="fa-group">
            <path
              fill="currentColor"
              d="M128 272v48h360a24 24 0 0 1 24 24v16a24 24 0 0 1-24 24H128v48c0 21.44-25.94 32-41 17L7 369a24 24 0 0 1 0-33.94l80-80c15.14-15.12 41-4.35 41 16.94z"
              class="fa-secondary"
            />
            <path
              fill="currentColor"
              d="M505 143.05a24 24 0 0 1 0 33.95l-80 80c-15 15-41 4.49-41-17v-48H24a24 24 0 0 1-24-24v-16a24 24 0 0 1 24-24h360V80c0-21.36 25.9-32 41-17z"
              class="fa-primary"
            />
          </g>
        </svg>
        <span class="link-text">Almacenes</span>
      </a>
    </li>
    <!-- Template
        <li class="nav-item">
            <a href="#" class="nav-link">

                <span class="link-text">Gastos</span>
            </a>
        </li>
       Logout Link -->
    <li class="nav-item" on:click={logOut}>
      <a href="/#/" class="nav-link">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fad"
          data-icon="sign-out"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="svg-inline--fa fa-sign-out fa-w-16 fa-2x"
        >
          <g class="fa-group">
            <path
              fill="currentColor"
              d="M180 448H96a96 96 0 0 1-96-96V160a96 96 0 0 1 96-96h84a12 12 0 0 1 12 12v40a12 12 0 0 1-12 12H96a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h84a12 12 0 0 1 12 12v40a12 12 0 0 1-12 12z"
              class="fa-secondary"
            />
            <path
              fill="currentColor"
              d="M353 88.3l151.9 150.6a24 24 0 0 1 0 34.1l-152 150.8a24.08 24.08 0 0 1-33.9-.1l-21.9-21.9a24.07 24.07 0 0 1 .8-34.7l77.6-71.1H184a23.94 23.94 0 0 1-24-24v-32a23.94 23.94 0 0 1 24-24h191.5l-77.6-71.1a24 24 0 0 1-.7-34.6l21.9-21.9a24 24 0 0 1 33.9-.1z"
              class="fa-primary"
            />
          </g>
        </svg>
        <span class="link-text">Cerrar Sesion</span>
      </a>
    </li>
  </ul>
</nav>

<style>
  .navbar {
    position: fixed;
    background-color: var(--bg-primary);
    transition: width 600ms ease;
    overflow: auto;
    left: 0;
  }

  .navbar-nav {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }

  .nav-item {
    width: 100%;
  }

  .nav-item:last-child {
    margin-top: auto;
  }

  .nav-link {
    display: flex;
    align-items: center;
    height: 5rem;
    color: var(--text-prymary);
    text-decoration: none;
    filter: grayscale(100%) opacity(0.7);
    transition: var(--nav-transition-speed);
  }

  .nav-link:hover {
    filter: grayscale(0%) opacity(1);
    background: var(--bgsecondary);
    color: var(--text-secondary);
  }

  .link-text {
    display: none;
    margin-left: 1rem;
  }

  .nav-link svg {
    width: 2rem;
    min-width: 2rem;
    margin: 0 1.5rem;
  }

  :global(.fa-primary) {
    color: #ff7eee;
  }

  :global(.fa-secondary) {
    color: #df49a6;
  }

  .fa-primary,
  .fa-secondary {
    transition: var(--nav-transition-speed);
  }

  .logo {
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 1rem;
    text-align: center;
    color: var(--text-secondary);
    background: var(--bgsecondary);
    font-size: 1.5rem;
    letter-spacing: 0.3ch;
    width: 100%;
  }

  .logo svg {
    transform: rotate(0deg);
    transition: var(--nav-transition-speed);
  }

  .logo-text {
    display: inline;
    position: absolute;
    opacity: 0;
    transition: var(--nav-transition-speed);
  }

  .navbar:hover .logo-text {
    opacity: 1;
  }

  .navbar:hover .logo svg {
    transform: rotate(-180deg);
  }

  /* Small screens */
  @media only screen and (max-width: 600px) {
    .navbar {
      left: 0;
      bottom: 0;
      width: 100vw;
      height: 5rem;
      overflow: scroll;
    }

    .logo {
      display: none;
    }

    .navbar-nav {
      flex-direction: row;
    }

    .nav-link {
      justify-content: center;
    }
  }

  /* Large screens */
  @media only screen and (min-width: 600px) {
    .navbar {
      top: 0;
      left: 0;
      width: 5rem;
      height: 100vh;
    }

    .navbar:hover {
      width: 17.5rem;
    }

    .navbar:hover .link-text {
      display: inline;
    }

    .navbar:hover .logo svg {
      margin-left: 14.5rem;
    }

    .navbar:hover .logo-text {
      left: 0;
    }
  }
</style>
