<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <p class="titulo">Novo Condutor</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <form>
                    <div class="form-group">
                        <label for="inputNome">Nome</label>
                        <input type="text" class="form-control" id="inputNome">
                    </div>
                    <div class="form-group">
                        <label for="inputCpf">CPF</label>
                        <input type="text" class="form-control" id="inputCpf">
                    </div>
                    <div class="form-group">
                        <label for="inputTelefone">Telefone</label>
                        <input type="text" class="form-control" id="inputTelefone">
                    </div>
                    <button type="submit" class="btn btn-success">Cadastrar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

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