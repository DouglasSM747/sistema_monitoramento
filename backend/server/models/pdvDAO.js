function pdvDAO(connection) {
    this._connection = connection;
}

pdvDAO.prototype.getPDVS = function( callback) {
	this._connection.query('SELECT * FROM elg_ponto_de_venda', callback);
};
  
pdvDAO.prototype.getPDV = function(idFilial, callback) {
	this._connection.query('SELECT * FROM elg_ponto_de_venda WHERE ativo = 1 AND filial_id = ' + idFilial, callback);
};

pdvDAO.prototype.savePDV = function(params, callback) {
	this._connection.query('INSERT INTO elg_ponto_de_venda SET ?', params, callback);
};

pdvDAO.prototype.deletePDV = function(PDVid, callback) {
	this._connection.query('UPDATE elg_ponto_de_venda SET ativo = 0 WHERE id = ' + PDVid, callback);
};

pdvDAO.prototype.updatePDV = function(params, callback) {
	if(params.atributo !== 'filial_id'){
		this._connection.query('UPDATE elg_ponto_de_venda SET ' + params.atributo + ' = "' + params.informacao + '" WHERE id = ' + params.id, callback);
	}
	else{
		this._connection.query('UPDATE elg_ponto_de_venda SET ' + params.atributo + ' = ' + params.informacao + ' WHERE id = ' + params.id, callback);
	}
};

module.exports = function() {
	return pdvDAO;
}
  