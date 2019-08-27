<template>

  <v-card flat>
    <v-card-title class="mb-5 title">
      Elige 10 pokémons
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

    <v-data-table
      v-model="selected"
      item-key="name"
      show-select
      :headers="headers"
      :items="pokemons"
      :loading="loading"
      :search="search"
      :item-selected="show()"
      :items-per-page="5"
      dense
    >
      <template v-slot:item.sprites="props">
        <img
          class="sprite"
          :src="props.item.sprites.front_default"
          :alt="props.item.sprites.front_default"
        >
      </template>

      <template v-slot:item.moves="props">
        {{ props.item.moves.length }}
      </template>
    </v-data-table>

    <v-snackbar
      dark
      v-model="snackbar.status"
      :color="snackbar.color"
    >
      {{ snackbar.text }}
      <v-btn
        text
        @click="snackbar.status = false"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          v-on="on"
          dark
          fixed
          bottom
          right
          fab
          :disabled="fab"
        >
          <v-icon>archive</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">Guardar pokemons</v-card-title>
        <v-card-text>¿Estas seguro que quieres guardar estos pokemons?</v-card-text>

        <v-list>
          <v-list-item
            v-for="item in pokemons"
            :key="item.name"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-img
                class="sprite"
                :src="item.sprites.front_default"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >Cancelar</v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="save()"
          >Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>

</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Table',
    data () {
      return {
        loading: true,
        fab: true,
        search: '',
        dialog: false,
        snackbar: {
          text: '',
          status: false,
          color: ''
        },
        selected: [],
        headers: [
          { text: 'Sprite', sortable: false, value: 'sprites' },
          { text: 'Nombre', value: 'name' },
          { text: 'Altura', value: 'height' },
          { text: 'Peso', value: 'weight' },
          { text: 'Movimientos', value: 'moves' },
        ],
        pokemons: [
        ],
      }
    },

    mounted () {
      axios.get(`${this.$axios.defaults.baseURL}pokemon?offset=20&limit=50`)
        .then(res => {
          let list = res.data.results

          list.forEach(pokemon => {
            axios.get(`${this.$axios.defaults.baseURL}pokemon/${pokemon.name}`)
              .then(res => {
                this.pokemons.push(res.data)
              })
          });

          this.loading = false
        })
    },

    methods: {
      show () {
        if (this.selected.length == 10) {
          this.fab = false
        } else {
          this.fab = true
        }
      },

      save () {
        localStorage.setItem('pokemons', JSON.stringify(this.selected))
        this.dialog = false
        this.snackbar.text = 'Pokemones guardados correctamente'
        this.snackbar.color = 'success'
        this.snackbar.status = true
      }
    }
  }
</script>

<style lang="scss" scoped>
.sprite {
  height: 50px;
  object-fit: contain;
}
</style>
