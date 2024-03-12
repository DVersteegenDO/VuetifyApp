<template>

    <div id="pokemon-content">

        <div id="pokemon-container">
            <div id="pokemon-container-top">

                <div id="pokemon-container-top-left">
                    <div class="pokemon-container-top-content">
                        <h1>Search For Pokemon</h1>

                        <v-text-field v-model="pokemonId" v-on:keyup.enter="tryFetchData" label="Pokemon" variant="outlined"
                            class="text-field"></v-text-field>

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
                    </div>
                </div>

                <div id="pokemon-container-top-right">
                    <div class="pokemon-container-top-content">
                        <h1>Find Url</h1>

                        <v-select v-model="selectedUrl" :hint="`${selectedUrl.type}, ${selectedUrl.url}`" :items="urls"
                            item-title="type" item-value="url" label="Select" persistent-hint return object single-line
                            class="select" variant="outlined">
                        </v-select>

                        <!-- <p>{{ requestUrl }}</p> -->
                    </div>
                </div>

            </div>

            <div id="pokemon-container-middle">
                <v-data-table :items="pokemon"></v-data-table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { reactive, toRaw } from "vue";
export default {
    data() {
        return {
            enterTest: '',
            onPageLoad: true,
            pokemonId: '',
            loading: false,
            pokemon: [],
            selectedUrl: {
                type: 'Base',
                url: 'https://pokeapi.co/api/v2/',
            },
            urls: []
        }
    },
    computed: {
        requestUrl: {
            get() {
                return `${this.selectedUrl.url}${this.pokemonId}`;
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
                        this.updateSelect(response.data);
                        this.onPageLoad = false;
                    } else {
                        console.log(response);
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        updateSelect(response) {

            for (var a in response) {

                this.urls.push({
                    type: a,
                    url: response[a]
                })
            }
        }
    },
    beforeMount() {
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
    /* margin-bottom:10px; */
}

.pokemon-container-top-content {
    margin: 0 auto;
}

#pokemon-container-top-left {
    flex-basis: 50%;
}

#pokemon-container-top-right {
    flex-basis: 50%;
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
</style>