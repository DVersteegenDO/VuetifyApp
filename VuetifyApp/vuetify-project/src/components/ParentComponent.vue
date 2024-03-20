<template>
    <div id="parent-container">
        <h1>Parent-Container</h1>

        <!-- <div v-for="n in fruits.length">
            <ChildComponent :title=fruits[n - 1].name></ChildComponent>
        </div> -->
    </div>
</template>

<script>

import ChildComponent from './ChildComponent.vue'

export default {
    data() {
        return {
            fruits: [
                {
                    name: "Apple"
                },
                {
                    name: "Banana"
                },
                {
                    name: "Coconut"
                }
            ]
        }
    }
}

</script>

<style>
#parent-container {
    background-color: rgb(64, 64, 64);
    border: solid 5px whitesmoke;
    height: 300px;
    width: calc(100% - 20px);
    margin: 10px;
}
</style>