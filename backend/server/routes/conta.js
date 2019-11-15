module.exports = function(application) {
  
	application.get('/contas/get/', function(request, response) {
		application.server.controllers.conta.getContas(application, request, response);
	});

	application.post('/contas/create/', function(request, response) {
		application.server.controllers.conta.createConta(application, request, response);
	});
	application.post('/contas/delete/', function(request, response) {
		application.server.controllers.conta.deleteConta(application, request, response);
	});
	application.post('/contas/edit/', function(request, response) {
		application.server.controllers.conta.editConta(application, request, response);
	});
}
  