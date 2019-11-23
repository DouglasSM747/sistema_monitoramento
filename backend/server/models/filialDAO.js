function FilialDAO(connection) {
    this._connection = connection;
}
//Buscar funcionarios de em um pdv
FilialDAO.prototype.getFuncionario = function(idpdv,callback) {
	this._connection.query('SELECT * FROM teste.vendedor WHERE fk_id_PDV_pertencente = '+idpdv, callback);
};
//Buscar compras feitas em um pdv
FilialDAO.prototype.getCompra = function(idpdv,callback) {
	this._connection.query('SELECT * FROM teste.compra WHERE fk_id_pdv_occorrente = '+idpdv, callback);
};
//realizar Compra
FilialDAO.prototype.realizarCompra = function(params,callback) {
	this._connection.query('INSERT INTO compra SET ?',params, callback);
};
//realizar Compra
FilialDAO.prototype.cadastrarFuncionario = function(params,callback) {
	this._connection.query('INSERT INTO vendedor SET ?',params, callback);
};
//Login
FilialDAO.prototype.Login = function(email, senha,callback) {
	this._connection.query('SELECT *  FROM vendedor WHERE email ="'+email+'" AND senha = "'+senha+'";'+
	'SELECT * FROM pdv WHERE email ="'+email+'" AND senha = "'+senha+'";'+
	'SELECT * FROM gerente_pdv WHERE email ="'+email+'" AND senha = "'+senha+'";',callback);
};
//Buscar informacao de um pdv
FilialDAO.prototype.getInfoEmpresaFuncionario = function(id_vendedor,callback) {
	this._connection.query('SELECT * FROM teste.informacoes_empresariais_vendedor WHERE id_vendedor = '+id_vendedor, callback);
};

//Buscar informacao de um pdv
FilialDAO.prototype.getInfo = function(idpdv,callback) {
	this._connection.query('SELECT * FROM informacoes_pdv WHERE fk_id_PDV = '+idpdv, callback);
};
//Salva informacao de um pdv
FilialDAO.prototype.saveInfo = function(params,callback) {
	this._connection.query('UPDATE informacoes_pdv SET localizacao = "'+params.localizacao+'",nota =  "'+
	params.nota+'",informacoes_PDVcol =  "'+params.informacoes_PDVcol+'",data_fundacao = "'+params.data_fundacao+'", preco_medio = "'+params.preco_medio+'",CESP = "'+params.CESP+'", telefone_fixo = "'+params.telefone_fixo+'", nome_dono_PDV = "'+params.nome_dono_PDV+'", nomepdv = "'+params.nomepdv+'" WHERE fk2_idPDV = '+params.fk_id_PDV, callback);
};
//Salva informacao empresarial Vendedor
FilialDAO.prototype.salvarInfoEmpresaVendedor = function(params,callback) {
	this._connection.query('UPDATE teste.informacoes_empresariais_vendedor SET id_vendedor = '+params.id_vendedor+',salario_mensal =  "'+
	params.salario_mensal+'",agencia_pagamento =  "'+params.agencia_pagamento+'",conta_pagamento = "'+params.conta_pagamento+'", Cargo = "'+params.Cargo+'", status = '+params.status+', dia_pagamento = "'+params.dia_pagamento+'", data_inicio_empresa = "'+params.data_inicio_empresa+'" WHERE id_vendedor = '+params.id_vendedor, callback);
};

//cadastra informacao de um pdv
FilialDAO.prototype.CadastraInfoVendedorEmpresa = function(params,callback) {
	this._connection.query('INSERT INTO teste.informacoes_empresariais_vendedor SET id_vendedor = '+params.id_vendedor+',salario_mensal =  "'+
	params.salario_mensal+'",agencia_pagamento =  "'+params.agencia_pagamento+'",conta_pagamento = "'+params.conta_pagamento+'", Cargo = "'+params.Cargo+'", status = '+params.status+', dia_pagamento = "'+params.dia_pagamento+'", data_inicio_empresa = "'+params.data_inicio_empresa+'"', callback);
};
//Atualizar info do vendedor EMPRESA
FilialDAO.prototype.deleteProdutoL = function(params,callback) {
	this._connection.query('UPDATE teste.informacoes_empresariais_vendedor SET ? where id_vendedor ',idpdv, callback);
};

//Deleta produto logicamente
FilialDAO.prototype.deleteProdutoL = function(idpdv,id_produto,callback) {
	this._connection.query('UPDATE estoque SET status = 0 WHERE id_produto = '+id_produto+' AND fk2_idPDV ='+idpdv, callback);
};

//Apagar produto de forma permanente
FilialDAO.prototype.deleteProdutoF = function(idpdv,id_produto,callback) {
	this._connection.query('UPDATE estoque SET status = -1 WHERE id_produto = '+id_produto+' AND fk2_idPDV ='+idpdv, callback);
};
//Adicionar produto ao Estoque
FilialDAO.prototype.addProduto = function(params,callback) {
	this._connection.query('INSERT INTO estoque SET ?',params, callback);
};
//Update produto ao Estoque
FilialDAO.prototype.updateProduto = function(params,callback) {
	this._connection.query('UPDATE estoque SET quantidade_estoque = ' + params.quantidade_estoque +''+
	', nome_produto = "' + params.nome_produto +'"'
	+ ' , valor = ' + params.valor +'' + ' , status = ' + params.status+' WHERE fk2_idPDV = ' + params.fk2_idPDV +' AND id_produto = '+params.id_produto, callback);
};
//Buscar produtos do Estoque
FilialDAO.prototype.getEstoque = function(idpdv1,callback) {
	this._connection.query('SELECT * FROM teste.estoque WHERE fk2_idPDV = '+idpdv1, callback);
};
//Buscar produto - SEM NECESSIDADE
FilialDAO.prototype.getProdutos = function(idcompra,callback) {
	this._connection.query('SELECT * FROM teste.produto_comprado, teste.estoque WHERE id_compra = '+idcompra+' AND produto_comprado.id_produto = estoque.id_produto', callback);
};
//----------------------------------------------------------------------------//
FilialDAO.prototype.saveFilial = function(params, callback) {
	this._connection.query('INSERT INTO elg_filial SET ?', params, callback);
};

//----------------------------------------------------------------------------//
FilialDAO.prototype.addProdutoCompra = function(params, callback) {
	this._connection.query('INSERT INTO produto_comprado SET ?', params, callback);
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
  