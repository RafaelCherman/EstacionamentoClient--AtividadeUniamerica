<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <p class="titulo">Nova Marca</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <form>
                    <div class="form-group">
                        <label for="inputNome">Nome</label>
                        <input type="text" class="form-control" id="inputNome">
                    </div>
                    <button type="submit" class="btn btn-success">Cadastrar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
//router :to="{ name{ },query{}}"
//computed: id (){ return
//this.$router.query.id}

//v-disabled  >  :disabled    <



//<input type="text" class="form-control" id="inputNome" v-model="marca.nome">
//<button type="submit" class="btn btn-success" @click="onClickCadastrar()">Cadastrar</button>

</script>

<style scoped lang="scss">

    .container
    {
      margin: 50px;
    }
    
    form{
        display: flex;
        flex-direction: column;
        align-items: space-between;
    }
    form .btn{
        margin-top: 20px;
        width: 100px;
    }

    form .form-group
    {
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    .titulo
    {
      font-weight: bold;
      font-size: 30px;
    }

    

</style>