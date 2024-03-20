<template></template>

<script>

import { RepositoryFactory } from '@/Repositories/RepositoryFactory';
const KadasterRepository = RepositoryFactory.get('kadaster')

export default {
    data() {
        return {
            isLoading: false,
        }
    },
    created() {
        this.fetch()
    },
    methods: {
        async fetch() {
            this.loading = true
            // console.log(KadasterRepository.get())
            const { data } = await KadasterRepository.get()
            console.log(data)
            this.loading = false
        }
    },
}

</script>

<style></style>