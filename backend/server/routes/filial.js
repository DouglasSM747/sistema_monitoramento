module.exports = function (application) {

    application.get('/compra/get/', function (request, response) {
        application.server.controllers.filial.getCompra(application, request, response);
    });

    application.get('/vendedor/get/', function (request, response) {
        application.server.controllers.filial.getFuncionario(application, request, response);
    });

    application.get('/infoempresa/vendedor/get', function (request, response) {
        application.server.controllers.filial.getInfoEmpresaFuncionario(application, request, response);
    });

    application.get('/login/get/', function (request, response) {
        application.server.controllers.filial.Login(application, request, response);
    });

    application.get('/pdv/info/', function (request, response) {
        application.server.controllers.filial.getInfo(application, request, response);
    });

    application.post('/pdv/saveinfo/', function (request, response) {
        application.server.controllers.filial.saveInfo(application, request, response);
    });

    application.post('/cadastrar/vendedor/', function (request, response) {
        application.server.controllers.filial.cadastrarFuncionario(application, request, response);
    });

    application.post('/infoempresa/vendedor/post/', function (request, response) {
        application.server.controllers.filial.salvarInfoEmpresaVendedor(application, request, response);
    });

    application.post('/infoempresa/salvar/vendedor/post/', function (request, response) {
        application.server.controllers.filial.CadastraInfoVendedorEmpresa(application, request, response);
    });

    application.get('/produtos/get/', function (request, response) {
        application.server.controllers.filial.getProdutos(application, request, response);
    });

    application.get('/estoque/get/', function (request, response) {
        application.server.controllers.filial.getEstoque(application, request, response);
    });

    application.post('/estoque/deleteL/', function (request, response) {
        application.server.controllers.filial.deleteProdutoL(application, request, response);
    });

    application.post('/realizar/compra/produto', function (request, response) {
        application.server.controllers.filial.addProdutoCompra(application, request, response);
    });

    application.post('/estoque/deleteF/', function (request, response) {
        application.server.controllers.filial.deleteProdutoF(application, request, response);
    });

    application.post('/realizar/compra/', function (request, response) {
        application.server.controllers.filial.realizarCompra(application, request, response);
    });

    application.post('/estoque/addproduto/', function (request, response) {
        application.server.controllers.filial.addProduto(application, request, response);
    });

    application.post('/estoque/updateproduto/', function (request, response) {
        application.server.controllers.filial.updateProduto(application, request, response);
    });

    application.post('/filial/post/', function (request, response) {
        application.server.controllers.filial.saveFilial(application, request, response);
    });

    application.post('/filial/delete/', function (request, response) {
        application.server.controllers.filial.deleteFilial(application, request, response);
    });

    application.post('/filial/update/', function (request, response) {
        application.server.controllers.filial.updateFilial(application, request, response);
    });

    application.get('/filial/simple/search/', function (request, response) {
        application.server.controllers.filial.simpleSearchFilial(application, request, response);
    });

    application.get('/filial/advanced/search/', function (request, response) {
        application.server.controllers.filial.advancedSearchFilial(application, request, response);
    });

}
