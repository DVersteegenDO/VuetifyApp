<template>
    <div class="container div-style">
        <h1>Select Experiment</h1>
        <v-select v-model="select" :hint="`${select.state}, ${select.abbr}`" :items="items" item-title="state"
            item-value="abbr" label="Select" persistent-hint return-object single-line></v-select>

        <v-select v-model="selectedArtist" :hint="`${selectedArtist.artistName}, ${selectedArtist.album}`"
            :items="artists" item-title="artistName" item-value="album" label="Select" persistent-hint return-object
            single-line></v-select>

        <!-- <pre>{{ selectedArtist }}</pre> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            select: { state: 'Florida', abbr: 'FL' },
            items: [
                { state: 'Florida', abbr: 'FL' },
                { state: 'Georgia', abbr: 'GA' },
                { state: 'Nebraska', abbr: 'NE' },
                { state: 'California', abbr: 'CA' },
                { state: 'New York', abbr: 'NY' },
            ]
            ,
            selectedArtist: {
                artistName: 'ArtistOne', album: 'AlbumOne'
            },
            artists: [
                { artistName: 'ArtistOne', album: 'AlbumOne' },
                { artistName: 'ArtistTwo', album: 'AlbumTwo' },
                { artistName: 'ArtistThree', album: 'AlbumThree' },
                { artistName: 'ArtistFour', album: 'AlbumFour' },
                { artistName: 'ArtistFive', album: 'AlbumFive' }
            ]
        }
    }
}
</script>

<style scoped>
.v-field__input {
    margin-left: 10px !important;
}
</style>