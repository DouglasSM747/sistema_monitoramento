function UsuarioDAO(connection) {
  this._connection = connection;
}

UsuarioDAO.prototype.authUsuario = function(params, callback) {
  const { email } = params;
  this._connection.query('SELECT * FROM elg_usuario WHERE ativo = TRUE AND nome_usuario = \"' + email + '\"', callback);
};

UsuarioDAO.prototype.getUser = function(id, callback) {
  this._connection.query('SELECT * FROM elg_usuario WHERE id = ' + id, callback);
};

UsuarioDAO.prototype.getUsuarios = function(callback) {
  this._connection.query('SELECT usuario.id, usuario.nome_usuario, role.descricao, usuario.ativo, usuario.conta_id \
                          FROM elg_usuario AS usuario \
                          INNER JOIN elg_usuario_role AS role ON usuario.usuario_role_id = role.id \
                          WHERE usuario.ativo = 1', callback);
};

UsuarioDAO.prototype.createUsuario = function(params, callback) {
  this._connection.query('INSERT INTO elg_usuario SET ?', params, callback);
};

UsuarioDAO.prototype.updateUsuario = function(params, callback) {
  let query = 'UPDATE elg_usuario SET';
  
  for (let param in params.update_fields) {
    query += ', ' + param + ' = ' + params.update_fields[param]; 
  }

  query = query.replace('SET,', 'SET');
  query += ' WHERE id = ' + params.usuarioId;

  this._connection.query(query, params, callback);
};

UsuarioDAO.prototype.updateSenha = function(params, callback) {
  this._connection.query('UPDATE elg_usuario SET senha_hash = \"' + params.senha + '\" WHERE id = ' + params.usuarioId, callback);
};

UsuarioDAO.prototype.deleteUsuario = function(usuarioId, callback) {
  this._connection.query('UPDATE elg_usuario SET ativo = 0 WHERE id = ' + usuarioId, callback);  
};

UsuarioDAO.prototype.createRole = function(params, callback) {
  this._connection.query('INSERT INTO elg_usuario_role SET ?', params, callback);
};

UsuarioDAO.prototype.deleteRole = function(roleId, callback) {
  this._connection.query('UPDATE elg_usuario_role SET ativo = 0 WHERE id = ' + roleId, callback);  
};

UsuarioDAO.prototype.getRoles = function(callback) {
  this._connection.query('SELECT id, descricao FROM elg_usuario_role WHERE ativo = 1', callback);
};


module.exports = function() {
  return UsuarioDAO;
}
