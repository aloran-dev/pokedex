<template>
  <v-card flat>
    <v-card-title class="mb-5 title">
      Mis pokemons
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        clearable
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Buscar"
      ></v-text-field>
    </v-card-title>

    <v-container fluid>
      <v-data-iterator
        :items="savedPokemons"
        :items-per-page.sync="itemsPerPage"
        :search="search"
        :hide-default-footer="true"
      >
        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item.name"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card>
                <v-card-title>
                  <img :src="item.sprites.front_default">
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content class="align-end">{{ item.name }}</v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        itemsPerPage: 10,
        savedPokemons: [],
        search: ''
      }
    },

    mounted () {
      if (localStorage.getItem('pokemons')) {
        this.savedPokemons = JSON.parse(localStorage.getItem('pokemons'))
      }
    },
  }
</script>
