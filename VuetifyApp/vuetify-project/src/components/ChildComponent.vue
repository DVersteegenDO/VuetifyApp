<template>

    <div id="input-container">
        <h1>{{ title }}</h1>
    </div>

</template>

<script>

export default {
    props: ['title']
}
</script>

<style scoped>
#input-container {
    background-color: black;
    border: whitesmoke 5px solid;
    height: 60px;
    margin: 20px;
}

#input-container>h1 {
    text-align: center;
}
</style>