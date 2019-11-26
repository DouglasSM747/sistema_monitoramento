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
//Buscar Donos de um pdv
FilialDAO.prototype.getDonosPDV = function(fk_gerentePDV,callback) {
	this._connection.query('SELECT * FROM teste.pdv WHERE fk_gerentePDV = '+fk_gerentePDV, callback);
};
//realizar Compra
FilialDAO.prototype.realizarCompra = function(params,callback) {
	this._connection.query('INSERT INTO compra SET ?',params, callback);
};
//Cadastrar Funcionario
FilialDAO.prototype.cadastrarFuncionario = function(params,callback) {
	this._connection.query('INSERT INTO vendedor SET ?',params, callback);
};
//Cadastrar Dono
FilialDAO.prototype.cadastrarDono = function(params,callback) {
	this._connection.query('INSERT INTO pdv SET ?',params, callback);
};
//Deletar Dono
FilialDAO.prototype.deletarDono = function(params,callback) {
	this._connection.query('delete from pdv where idPDV = '+params.idPDV+' AND fk_gerentePDV='+params.fk_gerentePDV, callback);
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
	this._connection.query('UPDATE informacoes_pdv SET ? WHERE fk_id_PDV = '+params.fk_id_PDV,params, callback);
};
//Salva informacao empresarial Vendedor
FilialDAO.prototype.salvarInfoEmpresaVendedor = function(params,callback) {
	this._connection.query('UPDATE teste.informacoes_empresariais_vendedor SET id_vendedor = '+params.id_vendedor+',salario_mensal =  "'+
	params.salario_mensal+'",agencia_pagamento = "'+params.agencia_pagamento+'",conta_pagamento = "'+params.conta_pagamento+'", Cargo = "'+params.Cargo+'", status = '+params.status+', dia_pagamento = "'+params.dia_pagamento+'", data_inicio_empresa = "'+params.data_inicio_empresa+'" WHERE id_vendedor = '+params.id_vendedor, callback);
};

//cadastra informacao empresarial de funcionario
FilialDAO.prototype.CadastraInfoVendedorEmpresa = function(params,callback) {
	this._connection.query('INSERT INTO teste.informacoes_empresariais_vendedor SET id_vendedor = '+params.id_vendedor+',salario_mensal =  "'+
	params.salario_mensal+'",agencia_pagamento =  "'+params.agencia_pagamento+'",conta_pagamento = "'+params.conta_pagamento+'", Cargo = "'+params.Cargo+'", status = '+params.status+', dia_pagamento = "'+params.dia_pagamento+'", data_inicio_empresa = "'+params.data_inicio_empresa+'"', callback);
};

//Atualizar info do vendedor EMPRESA
FilialDAO.prototype.deleteProdutoL = function(params,callback) {
	this._connection.query('UPDATE teste.informacoes_empresariais_vendedor SET ? where id_vendedor = '+idpdv,params, callback);
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
FilialDAO.prototype.getProdutos = function(idpdv,idcompra,callback) {
	this._connection.query('SELECT * FROM teste.produto_comprado, teste.estoque WHERE id_compra = '+idcompra+' AND produto_comprado.id_produto = estoque.id_produto AND fk2_idPDV = '+idpdv, callback);
};

//salvar informação pessoal funcionaro
FilialDAO.prototype.salvarInfoPessoalVendedor = function(params,fk_id_vendedor,callback) {
	this._connection.query('UPDATE informacoes_vendedor SET ? WHERE fk_id_vendedor = '+fk_id_vendedor+'',params, callback);
};

//cadastra informacao pessoal de um funcionario
FilialDAO.prototype.CadastraInfoVendedorPessoal = function(params,callback) {
	this._connection.query('INSERT INTO informacoes_vendedor SET ? ',params, callback);
};

//get Informação Pessoal funcionario
FilialDAO.prototype.getFuncionarioInfoPessoal = function(fk_id_vendedor,callback) {
	this._connection.query('SELECT * FROM teste.informacoes_vendedor WHERE fk_id_vendedor = '+fk_id_vendedor, callback);
};

//----------------------------------------------------------------------------//
FilialDAO.prototype.addProdutoCompra = function(params,fk2_idPDV, callback) {
	this._connection.query('INSERT INTO produto_comprado SET ?'+
	'; UPDATE teste.estoque SET quantidade_estoque = (quantidade_estoque - '+params.quantidade+') where fk2_idPDV = '+fk2_idPDV+' AND id_produto = '+params.id_produto+'', params, callback);
};

module.exports = function() {
	return FilialDAO;
}
  