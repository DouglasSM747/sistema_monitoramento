
module.exports = function(application) {
  
  application.post('/usuario/auth', function(request, response) {
    application.server.controllers.usuario.authUsuario(application, request, response);
  });

  application.get('/usuarios/get', function(request, response) {
    application.server.controllers.usuario.getUsuarios(application, request, response);
  });

  application.post('/usuario/role/create', function(request, response) {
    application.server.controllers.usuario.createRole(application, request, response);
  });

  application.post('/usuario/role/delete', function(request, response) {
    application.server.controllers.usuario.deleteRole(application, request, response);
  });

  application.get('/usuario/roles/get', function(request, response) {
    application.server.controllers.usuario.getRoles(application, request, response);
  });

  application.post('/usuario/create', function(request, response) {
    application.server.controllers.usuario.createUsuario(application, request, response);
  });

  application.post('/usuario/update', function(request, response) {
    application.server.controllers.usuario.updateUsuario(application, request, response);
  });

  application.post('/usuario/update/password', function(request, response) {
    application.server.controllers.usuario.updateSenha(application, request, response);
  });

  application.post('/usuario/delete', function(request, response) {
    application.server.controllers.usuario.deleteUsuario(application, request, response);
  });

}
