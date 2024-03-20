<template>

    <div id="pokemon-content">

        <div id="pokemon-container">
            <div id="pokemon-container-top">

                <div id="pokemon-container-top-left">
                    <div class="pokemon-container-top-content">
                        <h1>Search For Pokemon</h1>

                        <!-- <v-text-field v-model="pokemonId" v-on:keyup.enter="tryFetchData" label="Pokemon"
                            variant="outlined" class="text-field"></v-text-field> -->

                        <!-- <v-text-field v-model="enterTest" v-on:keyup.enter="console.log(enterTest)" label="Test" variant="outlined"
                            class="text-field"></v-text-field> -->

                        <!-- <v-btn v-if="pokemonId != ''" :loading="loading" variant="outlined" @click="tryFetchData">
                            Get Pokemon Data
                            <template v-slot:loader>
                                <v-progress-linear indeterminate></v-progress-linear>
                            </template>
</v-btn> -->

                        <!-- <input v-model="enterTest" @keyup.enter="console.log(enterTest)" /> -->

                        <p>{{ requestUrl }}</p>
                        <p>{{ image }}</p>
                    </div>
                </div>

                <!-- <div id="pokemon-container-top-right">
                    <img v-bind:src="image" />
                </div> -->

                <div id="pokemon-container-top-right">
                    <div class="pokemon-container-top-content">
                        <h1>Find Url</h1>

                        <v-btn variant="outlined" @click="getPokemonLinks">Click Me!</v-btn>

                        <v-select v-model="selectedUrl" :items="urls" item-title="name" label="Select" class="select"
                            variant="outlined">
                        </v-select>

                        <!-- <v-select v-model="selectedUrl" :hint="`${selectedUrl.type}, ${selectedUrl.url}`" :items="urls"
                            item-title="type" item-value="url" label="Select" persistent-hint return object single-line
                            class="select" variant="outlined">
                        </v-select> -->

                    </div>
                </div>

            </div>

            <!-- <v-table height="600px" fixed-header class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="url in urls" :key="url.name">
                        <td>{{ url.name }}</td>
                    </tr>
                </tbody>
            </v-table> -->

        </div>
    </div>
</template>

<script>
import axios from 'axios'
// import { useRouter } from 'vue-router'

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
        getPokemonLinks() {

            axios.get('https://pokeapi.co/api/v2')
                .then(response => {

                    var count = 0;
                    for (var item in response.data) {

                        if (count == 0) {
                            this.selectedUrl = response.data[item];
                            count++;
                        }
                        this.urls.push({

                            name: response.data[item],
                        })
                    }
                })
                .catch(error => {
                    // this.handleErrors(error);
                })
        },
    }
    // ,
    // beforeMount() {
    //     this.getPokemonLinks();
    // },
}

</script>

<style scoped>
#pokemon-content {
    height: auto;
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
    border: solid 5px whitesmoke;
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