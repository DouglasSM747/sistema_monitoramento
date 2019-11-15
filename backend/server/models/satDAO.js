function satDAO(connection) {
    this._connection = connection;
}
  
satDAO.prototype.getSAT = function(idPdv, callback) {
    // ]this._connection.query('SELECT * FROM elg_sat WHERE filial_id = ' + idFilial, callback);
	this._connection.query('SELECT * FROM notafiscal.elg_sat WHERE id_ponto_de_venda = '+idPdv,callback);
};

satDAO.prototype.getSATS = function(callback) {
    // ]this._connection.query('SELECT * FROM elg_sat WHERE filial_id = ' + idFilial, callback);
	this._connection.query('SELECT * FROM notafiscal.elg_sat', callback);
};

satDAO.prototype.getCUPONS = function(callback) {
	this._connection.query('SELECT * FROM elg_cupons WHERE situacao = 1' , callback);
};

satDAO.prototype.getCUPON = function(idSat,callback) {
	console.log(idSat);
	this._connection.query('SELECT * FROM elg_cupons WHERE situacao = 1 AND id_sat ='+ idSat, callback);
};

satDAO.prototype.saveSAT = function(params, callback) {
	this._connection.query('INSERT INTO elg_sat SET ?', params, callback);
};

module.exports = function() {
	return satDAO;
}
  