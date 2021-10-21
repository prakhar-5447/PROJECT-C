<template>
  <div>
    <!-- Header -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#ntoggle"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="ntoggle">
          <a class="navbar-brand" href="/">
            <img
              src="https://cdn.discordapp.com/avatars/155149108183695360/19a5ee4114b47195fcecc6646f2380b1.png?size=80"
              class="d-inline-block align-top"
              alt="<%= bot.name %>"
              width="30"
              height="30"
            />
            <b>COE BOT</b>
          </a>

          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a href="/commands" class="nav-link">Commands</a>
            </li>
            <li class="nav-item">
              <a href="<%= bot.invite %>" class="nav-link">Invite</a>
            </li>
          </ul>

          <form action="" class="d-flex">
            <button class="btn" type="button">
              <b>Login</b>
            </button>
          </form>
        </div>
      </div>
    </nav>
    <Nuxt />
  </div>
</template>
<style scoped>
/* Background of the Navbar */
.navbar-dark {
  background-color: #212529;
}

/* Colour of Login Button */
form.d-flex button {
  background-color: rgb(121, 145, 246);
  color: white;
  outline: none;
  border: none;
}

/* Colour of Login Button on hover */
form.d-flex button:hover {
  background-color: rgb(166, 168, 253);
}
</style>
