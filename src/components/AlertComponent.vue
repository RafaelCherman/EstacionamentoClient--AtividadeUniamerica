<template>
    
    <div :class="estilo" role="alert" v-if="ativo">
        <span><strong>{{titulo}}</strong>{{ mensagem }}</span>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';


export default defineComponent({
    name: "AlertComponent",
    props:{
        mensagem: String,
        titulo: String,
        estilo: String,
        ativo: Boolean
    }
})

</script>

<style scoped lang="scss">

</style>