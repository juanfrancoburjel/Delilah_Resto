const router = require ('express').Router ();
const Sequelize = require ('sequelize');
const sequelize = new Sequelize ('mysql://root:@localhost:3306/delilah_resto');
const jwt = require('jsonwebtoken');


// 0.1) Login
const mi_pass_jwt = "Juan1234";

router.post('/login', async (req, res) => {
    const {user, password} = req.body;

    const user_password = await sequelize.query('SELECT * FROM users',
    {type: sequelize.QueryTypes.SELECT})
    .then(resp=>{
        return resp
    });
    
    user_password.forEach(function(usuario) {
        if (usuario.user == user && usuario.password == password){
            let token = jwt.sign(usuario, mi_pass_jwt);
            res.status(200).json({token: token})
        }
    });
    res.send ("Usuario o Contrasena incorrecta");
}); 

// 0.2) Autorizacion

const autorizarUsuario = (req, res, next) => {
    let token = req.headers.authorization;
    console.log(token);
    try {
        decode = jwt.verify(token, mi_pass_jwt);
        if(decode){
            req.user = decode;
            next();
        }else{
            throw "Sin permiso";
        }
    } catch (error) {
        res.status(401).json({msj: 'Login inválido'})
    }
}


// 1) post/users --> Crear un nuevo usuario //OK

router.post("/", async (req,res)=>{
    await sequelize.query("INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        {replacements: [null, req.body.user, req.body.full_name, req.body.email, req.body.phone, req.body.address, req.body.password, false]})
        .then(response=>{
            res.send("se agrego un nuevo usuario")
    })
});

module.exports = router;