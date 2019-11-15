function ContaDAO(connection) {
	this._connection = connection;
}

ContaDAO.prototype.getContas = function(callback) {
	this._connection.query('SELECT id, nome_companhia FROM elg_conta WHERE ativo = 1', callback)
};

ContaDAO.prototype.createConta = function(params, callback) {
	this._connection.query('INSERT INTO elg_conta SET ?', params, callback)
};
ContaDAO.prototype.deleteConta = function(id, callback) {
	this._connection.query('UPDATE elg_conta SET ativo = 0 WHERE id = ' + id, callback);
};
ContaDAO.prototype.editConta = function(id, callback) {
	this._connection.query('UPDATE elg_conta SET nome_companhia = "' + params.nome_companhia + '"' + ' , trade_marcador = "' + params.trade_marcador +'"'+
	' , dominio = "' + params.dominio +'"' + ' , subdominio = "' + params.subdominio +'"' + ' , email = ' + params.email
	+ ' , celular = ' + params.celular + ' , telefone_fixo = "' + params.telefone_fixo +'"'
	+ ' , licenca_url = "' + params.licenca_url +'"' + ' , slug_conta_tipo = "' + params.slug_conta_tipo +'"' 
	+ ' WHERE id = ' + params.id, callback);
};

module.exports = function() {
	return ContaDAO;
}
