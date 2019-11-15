module.exports = function (application) {

    application.get('/compra/get/', function (request, response) {
        application.server.controllers.filial.getCompra(application, request, response);
    });

    application.get('/produtos/get/', function (request, response) {
        application.server.controllers.filial.getProdutos(application, request, response);
    });

    application.get('/estoque/get/', function (request, response) {
        application.server.controllers.filial.getEstoque(application, request, response);
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
