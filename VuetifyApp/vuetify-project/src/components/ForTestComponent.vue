<template>

    <div id="test-container">

        <h1>{{ openDataApi }}</h1>
        <p>{{ requestUrl }}</p>

        <div id="input-container">

            <div class="input-group" v-for="(p, index) in test">

                <v-text-field v-if="index != 0 && index != test.length - 1" v-model="p.value" :label="p.key"
                    variant="outlined" hide-details="auto" class="input center-input"></v-text-field>

                <v-text-field v-else v-model="p.value" :label="p.key" variant="outlined" hide-details="auto"
                    class="input"></v-text-field>
            </div>

        </div>

        <v-btn :loading="loading" variant="outlined" @click="fetchData">
            Get Data
            <template v-slot:loader>
                <v-progress-linear indeterminate></v-progress-linear>
            </template>
        </v-btn>

        <p v-for="e in errors">{{ e.message }}</p>
        <p v-if="error != ''">{{ error }}</p>

        <div class="input_group" v-for="d in data">

            <v-text-field v-model=d.value :label=d.key variant="outlined" hide-details="auto"
                class="input"></v-text-field>
        </div>

    </div>

</template>

<script>

import axios from 'axios'

export default {
    props: ['url', 'openDataApi', 'parameters'],
    data() {
        return {
            loading: false,
            data: [],
            error: '',
            errors: [],
        }
    },
    computed: {
        test: {
            get() {
                return this.parameters;
            }
        },
        requestUrl: {
            get() {
                var params = '?';

                for (var count = 0; count < this.test.length; count++) {

                    if (this.test[count].value != "") {

                        params = `${params}${this.test[count].key}=${this.test[count].value}&`;
                    }
                }

                params = params.substring(0, params.length - 1);
                return `${this.url}${params}`.toLowerCase();
            }
        }
    },
    methods: {
        fetchData() {

            this.loading = true;
            axios.get(this.requestUrl)
                .then(response => {

                    console.log(response);

                    // KvK
                    for (var r in response.data.entries[0]) {
                        console.log(r);

                        this.data.push({
                            key: r,
                            value: response.data.entries[0][r]
                        });
                    }

                    // Kadaster

                    // console.log(response.data._embedded.adressen[0].huisnummer);
                    // for (var r in response.data._embedded.adressen[0]) {
                    //     console.log(r);

                    //     this.data.push({
                    //         key: r,
                    //         value: response.data._embedded.adressen[0][r]
                    //     });

                    // }
                })
                .catch(error => {
                    this.error = '';
                    this.errors.splice(0);
                    switch (error.response.status) {
                        case 422:

                            var count = 0;
                            for (var r in error.response.data.errors) {

                                this.errors.push({
                                    message: error.response.data.errors[r][0],
                                    type: r
                                })
                                count++
                            }
                            break;

                        case 404:
                            this.error = error.response.data['status'];
                            break;
                    }
                })
                .finally(response => {
                    this.loading = false;
                })
        }
    }
}

</script>

<style scoped>
#test-container {
    background-color: rgb(64, 64, 64);
    border: black solid 3px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 20px);
    margin: 10px;
    padding: 10px 20px;
}

#input-container {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}

.input-group {
    width: 100%;
}

.input {
    background-color: rgb(64, 64, 64);
    border: solid black 3px;
    border-radius: 8px;
    width: auto;
}

.center-input {
    margin: 0 10px;
}

button {
    border: solid black 3px;
    border-radius: 8px;
    margin-top: 20px;
}
</style>