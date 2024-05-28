const mysql = require ('mysql2');

//Configuracion de la conexion
const Connection = mysql.createConnection({
    host: '127.0.0.1', //localhost
    user: 'root', //root
    password: '',//,
    database: 'tiendaonline'
});

Connection.connect((err) =>{
    if(err){
        console.log('Error al conectar a la base de datos', err);
        return;
    }

    console.log('conexion exitosa :D !')

    const consulta = 'Select * from usuarios';
    Connection.query(consulta,(err, result, fields) => {
        if(err){
            console.log('Error al realizar la consulta',err);
            return;
        }   
        console.log('resultado de la consulta:',result);

        //Desconexion de la base de datos
        Connection.end((err) => {
            if(err) {
            console.error('Error al cerrar la conexion :C',err);
            return;
            }
            console.log('Conexion cerrada exitosamente :D', err);
        })
    })

});