<template>
    <div id="watch-container">

        <div id="watch-container-top">
            <h1>Watch Experiment</h1>
        </div>

        <div id="watch-container-middle">
            <div id="watch-input-container">

                <div id="first-input-group" class="first-group input-group">
                    <v-text-field v-model="id" variant="outlined" label="ID" class="input" />
                </div>

                <div class="input-group">
                    <v-btn v-if="id != ''" :loading="loading" variant="outlined" @click="tryFetchData" class="button">
                        Test
                        <template v-slot:loader>
                            <v-progress-linear indeterminate></v-progress-linear>
                        </template>
                    </v-btn>
                </div>

                <div class="input-group">
                    <p>
                        <a :href="requestUrl">{{ requestUrl }}</a>
                    </p>
                </div>

            </div>

            <div id="watch-result-container">

                <div id="watch-result-first-row" class="row">

                    <div class="first-group result-group">
                        <v-text-field v-model="name" variant="outlined" label="Name" class="input" />
                    </div>

                    <div class="first-group result-group">
                        <v-text-field v-model="followers" variant="outlined" label="Followers" class="input" />
                    </div>

                </div>

                <div id="watch-result-second-row" class="row">

                    <div class="first-group result-group">
                        <v-text-field v-model="country" variant="outlined" label="Country" class="input" />
                    </div>

                    <div class="first-group result-group">
                        <v-text-field v-model="birthdate" variant="outlined" label="Birthdate" class="input" />
                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            id: '',
            name: '',
            followers: '',
            country: '',
            birthdate: '',
            loading: false,
            standardUrl: 'http://192.168.56.56/api/artists/'
        }
    },
    computed: {
        requestUrl: {
            get() {
                return `${this.standardUrl}${this.id}`
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
                    // console.log(`This is not an error!`);
                    this.showData(response.data);

                })
                .catch(error => {
                    this.handleErrors(error.response);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handleErrors(response) {
            console.log(`This is an error!`);
            switch (response.status) {
                case 404:
                    console.log('404');
                    break;
            }
        },
        showData(response) {
            console.log(response);
        }
    }
    // ,
    // watch: {
    //     id() {
    //         this.tryFetchData();
    //     }
    // }
}

</script>

<style scoped>
h1 {
    padding-left: 10px;
}

p {
    font-weight: bolder;
    margin-top: 10px;
}

a {
    color: whitesmoke;
    text-decoration: none;
}

#watch-container {
    background-color: rgb(64, 64, 64);
    border: solid 5px black;
    height: 600px;
    margin: 0 10px;
}

#watch-container-top {
    background-color: black;
    border: solid 5px whitesmoke;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

#watch-container-middle {
    background-color: black;
    border: solid 5px whitesmoke;
    border-top: none;
    display: flex;
    flex-direction: row;
    height: auto;
}

#watch-input-container {
    height: 240px;
    flex-basis: 50%;
}

#watch-result-container {
    height: 240px;
    display: flex;
    flex-basis: 50%;
    flex-direction: column;
}

#watch-result-first-row {}

#watch-result-second-row {}

.row {
    display: flex;
    flex-direction: row;
}

.result-group {
    padding-left: 20px;
}

.first-group {
    padding-top: 20px;
}

/* #first-input-group {
    padding-top: 20px;
} */

.input-group {
    padding-left: 20px;
}

.input {
    font-weight: bolder;
    width: 320px;
}

.button {
    font-weight: bolder;
    width: 320px;
}
</style>