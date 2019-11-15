function taxacaoDAO(connection) {
    this._connection = connection;
}
  
taxacaoDAO.prototype.saveTaxacao = function(params, callback) {
    this._connection.query('INSERT INTO elg_sistema_taxacao SET ?', params, callback)
};

taxacaoDAO.prototype.getTaxacao = function(callback) {
    this._connection.query('SELECT * FROM elg_sistema_taxacao', callback)
};
  
module.exports = function() {
    return taxacaoDAO;
}
  