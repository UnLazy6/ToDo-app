const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(express.json())

/// Converter dados do formulario em objeto em JS
app.use(express.urlencoded({
    extended: true
}))

/// Rotas
app.post('/complete', (req, res) => {
    const id = req.body.id

    const sql = `
        UPDATE tarefas
        SET completa = '1'
        WHERE id = ${id}
    `

    conexao.query(sql, (error) => {
        return console.log(error)
    })

    res.redirect('/')
})

app.post('/uncomplete', (req, res) => {
    const id = req.body.id

    const sql = `
        UPDATE tarefas
        SET completa = '0'
        WHERE id = ${id}
    `

    conexao.query(sql, (error) => {
        return console.log(error)
    })

    res.redirect('/')
})

app.post('/create', (req, res) => {
    const descricao = req.body.descricao
    const completa = 0
    
    const sql = `
        INSERT INTO tarefas(descricao, completa)
        VALUES ('${descricao}', '${completa}')
    `

    conexao.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        res.redirect('/')
    })
})

app.get('/ativas', (req, res) => {
    
})

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM tarefas'

    conexao.query(sql, (error, dados) => {
        if (error) {
            return console.log(error)
        }

        const tarefas = dados.map((dado) => {
            return {
                id: dado.id,
                descricao: dado.descricao,
                completa: dado.completa === 0 ? false : true
            }
        })

        const tarefasAtivas = tarefas.filter((tarefa) => {
            return tarefa.completa === false && tarefa
        })

        const quantidadeTarefasAtivas = tarefasAtivas.length

        res.render('home', { tarefas, quantidadeTarefasAtivas })
    })
})

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todoapp",
    port: 3306
})

conexao.connect((error) => {
    if (error) {
        return console.log(error)
    }

    console.log("I'm connected to MySQL.")

    app.listen(3000, () => {
        console.log("Server running on port 3000")
    })
})