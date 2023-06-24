<template>
    
    <router-link type="button" class="btn btn-sm" id="opc"
        :to="{name: `${url}-cadastra-${modo}`, query: {id: id, form: `${modo}`}}">
            {{botao}}
    </router-link>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue';


    export default defineComponent({
        name: "OpcsComponente",
        props:{
            url: String,
            modo: String,
            botao: String,
            id: Number
        }
    })


</script>