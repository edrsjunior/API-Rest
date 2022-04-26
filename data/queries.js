var db = require('pg');
var urlBD = process.env.DATABASE_URL;

db.connect(urlBD, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    db.query('SELECT $1::int AS number', ['1'], function(err, result) {
      done();
      if (err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].number);
    });
  
  });

  const getUsers = (request, response) => {
    db.query('SELECT * FROM alunos ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.rga)
  
    db.query('SELECT * FROM alunos WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  const createUser = (request, response) => {
    const { nome, rga, data_nascimento,endereco,email,senha,telefone } = request.body
  
    db.query('INSERT INTO alunos (nome, rga, data_nascimento,endereco,email,senha,telefone) VALUES ($1, $2,$3,$4,$5,$6,$7)', [nome, rga, data_nascimento,endereco,email,senha,telefone], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  }

  const updateUser = (request, response) => {
    const id = parseInt(request.params.rga)
    const { nome, rga, data_nascimento,endereco,email,senha,telefone } = request.body
  
    db.query(
      'UPDATE alunos SET name = $1, data_nascimento = $2, endereco = $3, email = $4, senha = $5, telefone = $6 WHERE rga = $7',
      [nome, data_nascimento,endereco,email,senha,telefone, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  const deleteUser = (request, response) => {
    const id = parseInt(request.params.rga)
  
    db.query('DELETE FROM alunos WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }

const login = (request, response) => {
    const id = parseInt(request.params.rga)
    const senha = request.body.senha
    db.query('SELECT * FROM alunos WHERE id = $1 AND senha=$2', [id,senha], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200)
    })
}

  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }