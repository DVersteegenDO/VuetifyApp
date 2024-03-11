<template>
  <v-app>
    <v-main>
      <div id="topbar" class="div-style">
        <h1>{{ title }}</h1>
      </div>
      <request-item />
    </v-main>

  </v-app>
</template>

<script>

export default {
  data() {
    return {
      title: 'Vuetify App'
    }
  }
}

</script>

<style>
#topbar>h1 {
  color: whitesmoke;
}

.div-style {
  background-color: rgb(64, 64, 64, 0.8);
  border: solid 3px black;
  margin: 10px;
}

.div-style>h1 {
  margin-left: 10px;
}

</style>
