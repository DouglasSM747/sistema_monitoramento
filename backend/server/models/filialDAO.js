function FilialDAO(connection) {
    this._connection = connection;
}
  
FilialDAO.prototype.getCompra = function(idpdv,callback) {
	this._connection.query('SELECT * FROM teste.compra WHERE fk_id_pdv_occorrente = '+idpdv, callback);
};

FilialDAO.prototype.getEstoque = function(idpdv1,callback) {
	this._connection.query('SELECT * FROM teste.estoque WHERE fk2_idPDV = '+idpdv1, callback);
};

FilialDAO.prototype.getProdutos = function(idcompra,callback) {
	this._connection.query('SELECT * FROM teste.produto_comprado, teste.estoque WHERE id_compra = '+idcompra+' AND produto_comprado.id_produto = estoque.id_produto', callback);
};


FilialDAO.prototype.saveFilial = function(params, callback) {
	this._connection.query('INSERT INTO elg_filial SET ?', params, callback);
};

FilialDAO.prototype.simpleSearchFilial = function(nome, callback) {
	this._connection.query('SELECT * FROM elg_filial WHERE status = 1 AND nome LIKE "%' + nome +'%"', callback);
};

FilialDAO.prototype.advancedSearchFilial = function(params, callback) {
	this._connection.query('SELECT * FROM elg_filial WHERE status = ' + params.status + ' AND sistema_tributacao_id = ' + params.tributacao + 
	' AND bairro LIKE "%' + params.bairro +'%" ORDER BY nome ' + params.ordem, callback);
};

FilialDAO.prototype.deleteFilial = function(id, callback) {
	this._connection.query('UPDATE elg_filial SET status = 0 WHERE id = ' + id, callback);
};

FilialDAO.prototype.updateFilial = function(params, callback) {
	this._connection.query('UPDATE elg_filial SET nome = "' + params.nome + '"' + ' , telefone_fixo = "' + params.telefone_fixo +'"'+
	' , cnpj = "' + params.cnpj +'"' + ' , inscricao_estadual = "' + params.inscricao_estadual +'"' + ' , filial_tipo = ' + params.filial_tipo
	+ ' , sistema_tributacao_id = ' + params.sistema_tributacao_id + ' , sefaz_chave_seguranca = "' + params.sefaz_chave_seguranca +'"'
	+ ' , status = "' + params.status +'"' + ' , cep = "' + params.cep +'"' + ' , bairro = "' + params.bairro +'"' + ' , pais = "' + params.pais +'"'
	+ ' , cidade = "' + params.cidade +'"' + ' , uf = "' + params.uf +'"' + ' , rua = "' + params.rua +'"' + ' , numero = "' + params.numero +'"'
	+ ' , complemento = "' + params.complemento + '"' + ' , latitude = ' + params.latitude + ' , longitude = ' + params.longitude
	+ ' WHERE id = ' + params.id, callback);
};

module.exports = function() {
	return FilialDAO;
}
  