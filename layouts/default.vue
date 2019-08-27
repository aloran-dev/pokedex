<template>
  <v-app style="background: rgb(36,	36,	36)">
    <v-card
      flat
      style="background: rgb(36,	36,	36)"
    >
      <v-app-bar
        color="primary"
        dark
        extended
        flat
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="title">Pokédex</v-toolbar-title>
      </v-app-bar>

      <v-card
        class="mx-auto pa-3"
        max-width="1200"
        style="margin: -44px 0 80px 0;"
      >
        <nuxt />
      </v-card>
    </v-card>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="route(item.link)"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        hidden: false,
        drawer: null,
        items: [
          { title: 'Lista de pokemones', icon: 'dashboard', link: '/' },
          { title: 'Mis pokemones', icon: 'list_alt', link: '/saved' }
        ],
      }
    },

    methods: {
      route (link) {
        this.$router.push(link)
      }
    }
  }
</script>
