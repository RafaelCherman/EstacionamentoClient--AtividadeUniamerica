<template>
    <div class="container">
        <div class="row">
            <div class="col-md-4 offset-md-4">
                <p class="titulo">Novo Veiculo</p>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <form>
                    <div class="form-group">
                        <label for="inputPlaca">Placa</label>
                        <input type="text" class="form-control" id="inputPlaca">
                    </div>
                    <div class="form-group">
                        <label for="inputModelo">Modelo</label>
                        <input type="text" class="form-control" id="inputModelo">
                    </div>
                    <div class="form-group">
                        <label for="inputCor">Cor</label>
                        <input type="text" class="form-control" id="inputCor">
                    </div>
                    <div class="form-group">
                        <label for="inputAno">Ano</label>
                        <input type="text" class="form-control" id="inputAno">
                    </div>
                    <div class="form-group">
                        <label for="inputTipo">Tipo</label>
                        <input type="text" class="form-control" id="inputTipo">
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