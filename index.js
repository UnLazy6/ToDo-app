const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

/// Converter dados do formulario em objeto em JS
app.use(express.urlencoded({
    extended: true
}))

/// Rotas
app.post('/create', (req, res) => {
    const description = req.body.description
    const complete = 0
    
    const sql = `
        INSERT INTO tarefas(descricao, completa)
        VALUES ('${description}', '${complete}')
    `

    conn.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        res.redirect('/')
    })
})

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM tarefas'

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }
        
        console.log(data)

        const tasks = data.map((dado) =>{
            return{
                id: dado.id,
                description: dado.description,
                complete: dado.complete === 0 ? false : true
            }
        })

        console.log(tasks)
    })

    res.render('home')
})

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todoapp",
    port: 3306
})

conn.connect((error) => {
    if (error) {
        return console.log(error)
    }

    console.log("I'm connected to MySQL.")

    app.listen(3000, () => {
        console.log("Server running on port 3000")
    })
})