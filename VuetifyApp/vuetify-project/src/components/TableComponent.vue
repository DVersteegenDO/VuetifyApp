<template>

    <div id="test-content">

        <div id="test-container">

            <div id="test-table-container">
                <v-table height="600px" fixed-header class="table" @click="getPokemonData($event)">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th class="th">Image</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pokemon in pokemons" :key="pokemon.name">
                            <td>{{ pokemon.id }}</td>
                            <td>{{ pokemon.name }}</td>
                            <td><img v-bind:src="pokemon.image" /></td>
                            <td>{{ pokemon.url }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </div>

            <div id="test-input-container">

                <div class="input-group">
                    <v-text-field v-model="currentUrl" variant="outlined" label="URL" class="input" readonly>

                    </v-text-field>
                </div>

                <div class="input-group">
                    <v-text-field v-model="currentPokemonId" variant="outlined" label="ID" class="input" readonly>

                    </v-text-field>
                </div>

                <div class="input-group">
                    <v-text-field v-model="currentPokemonFirstType" variant="outlined" label="Type One"
                        class="input type-input" readonly>

                    </v-text-field>

                    <v-text-field v-model="currentPokemonSecondType" variant="outlined" label="Type Two"
                        class="input type-input" readonly>

                    </v-text-field>
                </div>

                <div class="input-group">
                    <v-select variant="outlined" class="input"></v-select>
                </div>

                <div class="input-group">
                    <div class="image-container">
                        <img v-bind:src="defaultBackImage" class="image" />
                    </div>

                    <div class="image-container">
                        <img v-bind:src="shinyBackImage" class="image" />
                    </div>

                    <div class="image-container">
                        <img v-bind:src="defaultFrontImage" class="image" />
                    </div>

                    <div class="image-container">
                        <img v-bind:src="shinyImage" class="image" />
                    </div>
                </div>

                <div class="input_group">
                    <v-btn variant="outlined" @click="test" class="input">Click Me!</v-btn>
                </div>

            </div>

        </div>

    </div>

</template>

<script>

import axios from 'axios'
// import { useRouter } from 'vue-router'

export default {
    data() {
        return {
            currentUrl: 'https://pokeapi.co/api/v2/pokemon/1',
            pokemons: [],
            currentPokemonFirstType: 'Grass',
            currentPokemonSecondType: 'Poison'
        }
    },
    computed: {
        currentPokemonId: {
            get() {

                if (this.currentUrl.charAt(this.currentUrl.length - 1) == '/') {
                    this.currentUrl = this.currentUrl.substring(0, this.currentUrl.length - 1);
                }

                return this.currentUrl.substring(34);
            }
        },
        defaultBackImage: { get() { return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${this.currentPokemonId}.png` } },
        shinyBackImage: { get() { return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${this.currentPokemonId}.png` } },
        defaultFrontImage: { get() { return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.currentPokemonId}.png` } },
        shinyImage: { get() { return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${this.currentPokemonId}.png` } }
    },
    methods: {
        test() {

            // const routeData = this.$router.resolve({ name: 'routeName', query: { data: "someData" } });
            window.open('https://pokeapi.co/api/v2/pokemon/4', '_blank');
        },
        getPokemonData(response) {

            // console.log(response.target.localName == 'th');
            if (response.target.cellIndex == 3 && response.target.localName != 'th') {

                this.currentUrl = response.originalTarget.innerText;
                axios.get(this.currentUrl)
                    .then(response => {

                        this.updateTypingData(response.data.types);
                    })
                    .catch(error => {
                        this.handleErrors(error);
                    })
            }
        },
        updateTypingData(response) {

            this.currentPokemonFirstType = this.getFirstLetterCapitalized(response[0].type.name);
            this.currentPokemonSecondType = 'None';

            if (response.length > 1) {

                this.currentPokemonSecondType = this.getFirstLetterCapitalized(response[1].type.name);
            }
        },
        fetchData() {
            axios.get('https://pokeapi.co/api/v2/pokemon?limit=1090')
                .then(response => {
                    this.updateList(response.data.results);
                })
                .catch(error => {
                    this.handleErrors(error);
                })
                .finally(response => {
                    // this.getPokemon();
                })
        },
        handleErrors(error) {

            console.log(error);
            switch (error.response.status) {
                case 404:
                    console.log("Not found");
            }
        },
        updateList(response) {

            var index = 1;
            var indexTooHigh = false;

            for (var item in response) {

                this.pokemons.push({

                    id: index,
                    name: response[item].name,
                    // image: !indexTooHigh ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png` : ``,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`,
                    url: response[item].url
                })
                index++;

                if (index == 1026) {
                    index = 10001;
                }
            }
            this.pokemons.forEach(pokemon => {
                pokemon.name = this.getFirstLetterCapitalized(pokemon.name);
            })
        },
        getFirstLetterCapitalized(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },
    beforeMount() {

        this.fetchData();
    },
}
</script>

<style scoped>
#test-content {
    background-color: rgb(64, 64, 64);
    border: whitesmoke 5px solid;
    display: flex;
    flex-direction: column;
    height: auto;
    width: calc(100% -20px);
    margin: 10px;
}

#test-container {
    border: black 5px solid;
    display: flex;
    flex-direction: row;
    margin: 10px;
}

#test-table-container {
    border: whitesmoke 5px solid;
    flex-basis: 50%;
    height: calc(100% - 20px);
    width: calc(100% -20px);
}

#test-input-container {
    background-color: rgb(128, 128, 128);
    border: whitesmoke 5px solid;
    border-left: none;
    flex-basis: 50%;
    width: 100%;
}

.table {
    width: auto;
}

.th {
    text-align: center !important;
}

.input-group {
    display: flex;
    flex-direction: row;
    width: calc(100% - 20px);
    margin: 10px 0 0 10px;
}

.input {
    background-color: rgb(64, 64, 64);
    border: solid black 3px;
    border-radius: 8px;
    width: calc(100% - 50px);
}

.v-input__details {
    display: none;
}

.v-field-label--floating {
    font-weight: bolder;
    color: whitesmoke;
    opacity: 1;
}

.image-container {
    border: solid 3px black;
    border-radius: 10px;
    height: 100px;
    width: 100px;
    margin-right: 10px;
}

.image {
    height: 96px;
    width: 96px;
}
</style>