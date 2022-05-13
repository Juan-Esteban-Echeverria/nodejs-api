// AXIOS // UUID // MOMENT // LODASH // CHALK
const axios = require("axios")
const { v4: uuidv4 } = require("uuid")
const moment = require("moment")
var _ = require('lodash');
const chalk = require("chalk")
// HTTP
const http = require("http")

//------------------------------------------------------------------------------------------------------------------------

// ARREGLO DE USUARIOS
let usuarios = []

// CREAR SERVIDOR
http.createServer( function(req,res){

    // RUTA DE CONSULTA DE LOS USUARIOS REGISTRADOS
    if(req.url.includes('/Consulta')){
        
        // CONSULTA API CON AXIOS
        axios.get("https://randomuser.me/api")
        .then((data) => {
        const nombre = data.data.results[0].name.first
        const apellido = data.data.results[0].name.last

        // GENERAR ID CON UUID
        const id = uuidv4().slice(0,6)

        // CONSULTA DE FECHA CON MOMENT
        const registro = moment().format("MMM Do YY / h:mm:ss a")

        // REGISTRO NUEVO USUARIO
        let nuevo_usuario = [`Nombre: ${nombre} - Apellido: ${apellido} - ID: ${id} - Timestamp: ${registro}`]
        usuarios.push(nuevo_usuario)
    
        // LODASH PARA RECORRER EL ARREGLO
        usuarios.forEach((usuarios)=>{
            res.write(`${_.defaults(usuarios)} \n`)
        })

        // IMPRESION DE LA LISTA POR CONSOLA CON CHALK
        console.log(chalk.blue.bgWhite(_.defaults(usuarios)))

    return res.end()

}).catch(e => {
    console.log(e)
})
        
}

}).listen(8080, () => console.log("Servidor levatado en el puerto 8080"))


