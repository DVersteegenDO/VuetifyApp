<template>
    <div id="request-container" class="container div-style">

        <!--First Container-->
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
                <v-radio-group v-model="dataType">
                    <v-radio label="Add items to dropdown" name="dataType" value="select" class="radiobutton"></v-radio>
                    <v-radio label="Show items in a table" name="dataType" value="table" class="radiobutton"></v-radio>
                </v-radio-group>
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

        <!--Second Container-->
        <div v-if="artists.length > 0 && dataType === 'select'" id="request-select-container" class="request-container">
            <h1>Current Artist Data</h1>

            <div class="request-input-group">

                <v-select v-model="selectedArtist" :hint="`${selectedArtist.artistName}, ${selectedArtist.id}`"
                    :items="artists" item-title="artistName" item-value="album" label="Select" persistent-hint
                    return-object single-line @change="console.log('Banaan')"></v-select>

            </div>
        </div>

        <!--Third Container-->
        <div v-if="artists.length > 0 && dataType === 'table'" id="request-table-container" class="request-container">
            <h1>Retrieved Artist Data</h1>

            <div>

                <v-data-table :items="artists">

                </v-data-table>

            </div>

        </div>

        <!--Fourth Container-->
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
            id: '',
            name: '',
            followers: '',
            country: '',
            birthdate: '',
            dataType: "select",
            error: '',
            requestType: 'Artist',
            defaultUrl: 'http://192.168.56.56/api/artists',
            loading: false,
            dataType: 'table',
            selectedArtist: {
                id: '',
                artistName: '',
                followers: '',
                country: '',
                birthdate: ''
            },
            artists: [
                //     {
                //     artistName: 'Imagine Dragons',
                //     id: 1
                // }, {
                //     artistName: 'The Weeknd',
                //     id: 2
                // }
            ]
        }

    },
    computed: {
        requestUrl: {
            get() {

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
            console.log("Banaan");
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
                        // console.log(response.data);
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

                if (index == false) {
                    this.selectedArtist['id'] = item.id;
                    this.selectedArtist['artistName'] = item.name;
                    this.selectedArtist['country'] = item.country;
                    this.selectedArtist['followers'] = item.followers;
                    this.selectedArtist['birthdate'] = item.birthdate;
                }

                this.artists.push({
                    id: item.id,
                    artistName: item.name,
                    followers: item.followers,
                    country: item.country,
                    birthdate: item.birthdate
                })
            })
        },
        showSingleData(response) {
            // console.log("Banaan");
            // console.log(response);
            this.id = JSON.parse(JSON.stringify(response.data['id']));
            this.name = JSON.parse(JSON.stringify(response.data['name']));
            this.followers = JSON.parse(JSON.stringify(response.data['followers']));
            this.country = JSON.parse(JSON.stringify(response.data['country']));
            this.birthdate = JSON.parse(JSON.stringify(response.data['birthdate']));
        },
    },
    watch: {
        // selectedArtist(val) {
        //     this.columnValue = JSON.parse(JSON.stringify(val['id']));
        //     this.column = "ID";
        //     this.tryFetchData();
        // }
        id() {
            this.tryFetchData();
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

.radiobutton {
    font-weight: bolder;
    font-size: 24px;
}

.radiobutton>label {
    margin-left: 10px;
}

#request-table-container {
    width: 800px;
}

#request-table-container>table {
    margin: 10px;
}
</style>