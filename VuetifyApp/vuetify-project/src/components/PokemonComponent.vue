<template>

    <div id="pokemon-content">

        <div id="pokemon-container">
            <div id="pokemon-container-top">

                <div id="pokemon-container-top-left">
                    <div class="pokemon-container-top-content">
                        <h1>Search For Pokemon</h1>

                        <v-text-field v-model="pokemonId" v-on:keyup.enter="tryFetchData" label="Pokemon"
                            variant="outlined" class="text-field"></v-text-field>

                        <!-- <v-text-field v-model="enterTest" v-on:keyup.enter="console.log(enterTest)" label="Test" variant="outlined"
                            class="text-field"></v-text-field> -->

                        <v-btn v-if="pokemonId != ''" :loading="loading" variant="outlined" @click="tryFetchData">
                            Get Pokemon Data
                            <template v-slot:loader>
                                <v-progress-linear indeterminate></v-progress-linear>
                            </template>
                        </v-btn>

                        <!-- <input v-model="enterTest" @keyup.enter="console.log(enterTest)" /> -->

                        <p>{{ requestUrl }}</p>
                        <p>{{ image }}</p>
                    </div>
                </div>

                <div id="pokemon-container-top-right">
                    <img v-bind:src="image" />
                </div>

                <div id="pokemon-container-top-right">
                    <div class="pokemon-container-top-content">
                        <h1>Find Url</h1>

                        <v-select v-model="selectedUrl" :hint="`${selectedUrl.type}, ${selectedUrl.url}`" :items="urls"
                            item-title="type" item-value="url" label="Select" persistent-hint return object single-line
                            class="select" variant="outlined">
                        </v-select>

                    </div>
                </div>

            </div>

            <div id="pokemon-container-middle">
                <v-data-table :items="pokemons"></v-data-table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            enterTest: '',
            onPageLoad: true,
            pokemonId: '',
            loading: false,
            pokemon: [],
            image: './src/assets/logo.png',
            pokemonName: '',
            pokemons: [],
            pokemon: null,
            selectedUrl: '',
            images: [],
            // selectedUrl: {
            //     type: 'Base',
            //     url: ''
            //     // url: 'https://pokeapi.co/api/v2/pokemon/',
            //     // url: 'https://pokeapi.co/api/v2/pokemon?limit=1090'
            // },
            basicUrls: {
                getAllPokemonUrl: 'https://pokeapi.co/api/v2/pokemon?limit=1090',
                getOnePokemonUrl: 'https://pokeapi.co/api/v2/pokemon/'
            },
            urls: []
        }
    },
    computed: {
        requestUrl: {
            get() {
                return `${this.selectedUrl}${this.pokemonId}`;
            }
        },
        pokemonForUrl: {
            get() {
                return this.pokemonId.toLowerCase();
            }
        }
    },
    methods: {
        async tryFetchData() {
            try {
                await this.fetchData();
            } catch (error) {

            }
        },
        async fetchData() {

            this.loading = true;
            axios.get(this.requestUrl)
                .then(response => {
                    if (this.onPageLoad) {
                        this.updateTable(response.data.results);
                        this.onPageLoad = false;
                    } else {
                        this.showPokemonData(response.data)
                    }
                })
                .catch(error => {
                    this.handleErrors(error.response);
                })
                .finally(() => {
                    this.loading = false;
                    this.selectedUrl = this.basicUrls.getOnePokemonUrl;
                    this.addImages();
                });
        },
        getImage(name) {

            axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(response => {

                    var count = 0;

                    for (var i in response.data.sprites) {
                        if (count == 4) {
                            return response.data.sprites[i];
                        }
                        count++
                    }
                })
        },
        updateSelect(response) {
            for (var a in response) {

                this.urls.push({
                    type: a
                })
            }
        },
        updateTable(response) {
            for (var a in response) {

                this.pokemons.push({

                    name: response[a].name,
                })
            }
            this.pokemons.forEach(pokemon => {
                pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            })
        },
        async addImages() {

            console.log('Add');
            let promises = [];
            for (i = 0; i < this.pokemons.length; i++) {
                promises.push(
                    axios.get('https://pokeapi.co/api/v2/pokemon/' + this.pokemons[i].name).then(response => {

                        console.log(response.sprites[5]);
                        this.pokemons.push({
                            image: response.sprites[5]
                        });
                    })
                )
            }

            Promise.all(promises).then(() => console.log(this.pokemons));

            // this.pokemons.forEach(pokemon => {
            //    pokemon.image = await getImages();
            // })
        },
        async getImages() {

            axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then(response => {

                    var count = 0;

                    for (var i in response.data.sprites) {
                        if (count == 4) {
                            return response.data.sprites[i];
                        }
                        count++
                    }
                })
        },
        handleErrors(response) {
            switch (response.status) {
                case 404:
                    console.log('404');
                    break;
            }
        },
        showPokemonData(response) {

            var count = 0;
            console.log(response.sprites);
            for (var i in response.sprites) {
                if (count == 4) {
                    this.image = response.sprites[i];
                }
                count++
            }
        }
    },
    beforeMount() {
        this.selectedUrl = this.basicUrls.getAllPokemonUrl;
        this.tryFetchData();
    }
}

</script>

<style scoped>
#pokemon-content {
    height: 100%;
    width: 100%;
}

h1 {
    padding: 10px 0 0 20px;
}

p {
    padding: 0px 20px 20px 20px;
    font-weight: bolder;
}

button {
    margin: 0px 0px 20px 20px;
}

#pokemon-container {
    background-color: transparent;
    margin: 10px;
}

#pokemon-container-top {
    background-color: rgb(64, 64, 64);
    border: solid 5px black;
    display: flex;
}

.pokemon-container-top-content {
    margin: 0 auto;
}

#pokemon-container-top-left {
    flex-basis: 50%;
}

#pokemon-container-top-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#pokemon-container-middle {
    border: black solid 5px;
    margin-top: 10px;
}

.text-field {
    color: whitesmoke;
    font-size: 12px;
    font-weight: bolder;
    width: 360px;
    margin: 0 20px;
}

.select {
    width: 360px;
    margin: 0 20px;
}

.v-field__input {
    height: 36px !important;
}

img {
    height: 120px;
}
</style>