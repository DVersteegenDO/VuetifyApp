<template>
    <div id="request-container" class="container div-style">

        <div id="request-input-container" class="request-container">
            <h1>Send {{ requestType }} Request</h1>

            <div class="request-input-group">
                <v-text-field label="ID" variant="outlined" v-model="id" class="text-field"></v-text-field>
            </div>

            <p v-if="!loading">{{ requestUrl }}</p>

            <div class="request-input-group">
                <div class="text-center">
                    <v-btn v-if="id != ''" :loading="loading" @click="tryFetchData">
                        Custom loader

                        <template v-slot:loader>
                            <v-progress-linear indeterminate></v-progress-linear>
                        </template>
                    </v-btn>
                </div>
            </div>


            <p v-if="error!=''">{{ error }}</p>
        </div>


        <div id="request-result-container" class="request-container">
            <h1>Show {{ requestType }} Data</h1>

            <div class="request-input-group">
                <v-text-field label="Name" variant="outlined" v-model="name" class="text-field"></v-text-field>
            </div>

            <div class="request-input-group">
                <v-text-field label="Followers" variant="outlined" v-model="followers" class="text-field"></v-text-field>
            </div>

            <div class="request-input-group">
                <v-text-field label="Country" variant="outlined" v-model="country" class="text-field"></v-text-field>
            </div>

            <div class="request-input-group">
                <v-text-field label="Birthdate" variant="outlined" v-model="birthdate" class="text-field"></v-text-field>
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
            error: '',
            requestType: 'Artist',
            defaultUrl: 'http://192.168.56.56/api/artists/',
            loading: false
        }

    },
    computed: {
        requestUrl: {
            get() {
                return `${this.defaultUrl}${this.id}`
            }
        }
    },

    methods: {
        checkInput() {

        },
        async tryFetchData() {

            try {
                await this.fetchData();
            } catch (error) {
            }
        },
        async fetchData() {

            this.loading = true;
            this.error = '';
            axios.get(this.requestUrl)
                .then(response => {
                    console.log(response);
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
            switch (response.status) {
                case 404:
                    this.error = response.data['Status'];
                    break;
            }
        },
        showData(response) {
            this.name = JSON.parse(JSON.stringify(response.data['name']));
            this.followers = JSON.parse(JSON.stringify(response.data['followers']));
            this.country = JSON.parse(JSON.stringify(response.data['country']));
            this.birthdate = JSON.parse(JSON.stringify(response.data['birthdate']));
        }
    }
}

</script>

<style scoped>
#request-container {
    background-color: rgb(64, 64, 64, 0.2);
}

.container {
    display: inline-flex;
}

.request-container {
    border: black 3px solid;
    display: inline-table;
    width: 400px;
}

.request-container>h1 {
    margin-left: 10px;
}

.request-input-group {
    margin: 0 10px;
    width: 300px;
}

.request-input-group>.text-field {
    font-size: 24px;
    font-weight: bolder;
}

p {
    font-weight: bolder;
    margin-left: 10px;
}

button {
    margin-top: 10px;
}
</style>