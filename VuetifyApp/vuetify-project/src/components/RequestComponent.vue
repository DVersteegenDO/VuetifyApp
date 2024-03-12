<template>
    <div id="request-container" class="container div-style">

        <div id="request-input-container" class="request-container">
            <h1>Send {{ requestType }} Request</h1>

            <div class="request-input-group">
                <v-select label="Columns" :items="['ID', 'Name', 'Followers', 'Country', 'Birthdate']" v-model="column"
                    variant="outlined"></v-select>
            </div>

            <div class="request-input-group">
                <v-text-field v-bind:label=column variant="outlined" v-model="columnValue"
                    class="text-field"></v-text-field>
            </div>

            <div class="request-input-group">
                <p v-if="!loading">{{ requestUrl }}</p>
            </div>

            <div class="request-input-group">
                <div class="text-center">
                    <v-btn v-if="columnValue != ''" :loading="loading" variant="outlined" @click="tryFetchData">
                        Get {{ requestType }} Data

                        <template v-slot:loader>
                            <v-progress-linear indeterminate></v-progress-linear>
                        </template>
                    </v-btn>
                </div>
            </div>

            <div class="request-input-group">
                <p v-if="error != ''">{{ error }}</p>
            </div>

        </div>

        <div v-if="holding == true" id="request-items-container" class="request-container">
            <h1>Current Artist Data</h1>

            <div class="request-input-group">

                <!-- <v-select v-model="selectedArtist" :items="artists" item-text="artistName" return-object
                    filled></v-select> -->

                <v-select v-model="selectedArtist" :hint="`${selectedArtist.artistName}, ${selectedArtist.id}`"
                    :items="artists" item-title="artistName" item-value="album" label="Select" persistent-hint
                    return-object single-line @change="onChange(console.log('Banaan'))"></v-select>

                <!-- <v-select label="Select" :item-props="itemProps" :items="items" variant="outlined">
                </v-select> -->
                <!-- <p>{{ items[0].value }}</p> -->
            </div>
        </div>

        <div id="request-result-container" class="request-container">
            <h1>Show {{ requestType }} Data</h1>

            <div class="request-input-group">
                <v-text-field label="ID" variant="outlined" v-model="id" class="text-field"></v-text-field>
            </div>

            <div class="request-input-group">
                <v-text-field label="Name" variant="outlined" v-model="name" class="text-field"></v-text-field>
            </div>

            <div class="request-input-group">
                <v-text-field label="Followers" variant="outlined" v-model="followers"
                    class="text-field"></v-text-field>
            </div>

            <div class="request-input-group">
                <v-text-field label="Country" variant="outlined" v-model="country" class="text-field"></v-text-field>
            </div>

            <div class="request-input-group">
                <v-text-field label="Birthdate" variant="outlined" v-model="birthdate"
                    class="text-field"></v-text-field>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            column: 'ID',
            columnValue: '',
            id: 0,
            name: '',
            followers: '',
            country: '',
            birthdate: '',
            error: '',
            requestType: 'Artist',
            defaultUrl: 'http://192.168.56.56/api/artists',
            loading: false,
            holding: true,
            selectedArtist: {
                artistName: "Imagine Dragons",
                id: 0
                // album: "Origins"
            },
            artists: [
                {
                    artistName: "Imagine Dragons",
                    id: 0
                    // album: "Origins"
                },
                {
                    artistName: "The Weeknd",
                    id: 1
                    // album: "The Highlights"
                },
                {
                    artistName: "Ed Sheeran",
                    id: 2
                    // album: "÷"
                }
            ]
        }

    },
    computed: {
        requestUrl: {
            get() {
                // if (this.column != 'ID') {
                //     return `${this.defaultUrl}?${this.column.toLowerCase()}=${this.columnValue}`
                // } else {
                //     return `${this.defaultUrl}/${this.columnValue}`
                // }
                switch (this.column) {
                    case "ID":
                        return `${this.defaultUrl}/${this.columnValue}`

                    case "Name":
                        return `${this.defaultUrl}?artist_name=${this.columnValue}`

                    case "Country":
                        return `${this.defaultUrl}?country=${this.columnValue}`;
                }

            }
        },
    },

    methods: {
        itemProps(item) {
            return {
                titl: item.value,
                subtitle: item.label
            }
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
                    // console.log(response);
                    if (this.column == "ID") {
                        this.showSingleData(response.data);
                    } else {
                        this.showData(response.data);
                    }

                })
                .catch(error => {
                    // this.handleErrors(error.response);
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

            JSON.parse(JSON.stringify(response.data)).forEach((item, index) => {

                this.artists.push({
                    artistName: item.name,
                    id: item.id
                })
            })
        },
        showSingleData(response) {
            this.id = JSON.parse(JSON.stringify(response.data['id']));
            this.name = JSON.parse(JSON.stringify(response.data['name']));
            this.followers = JSON.parse(JSON.stringify(response.data['followers']));
            this.country = JSON.parse(JSON.stringify(response.data['country']));
            this.birthdate = JSON.parse(JSON.stringify(response.data['birthdate']));
        },
    },
    watch: {
        selectedArtist(val) {
            console.log(toRaw(val));
            if (this.selectedArtist != val) {
                console.log(this.selectedArtist);
            }
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
    width: 360px;
}

.request-container>h1 {
    margin-left: 10px;
}

.request-input-group {
    margin: 0 10px;
    width: 300px;
    margin: 0 auto;
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
    width: 100%;
    margin-top: 10px;
}
</style>