const router = require ('express').Router ();
const Sequelize = require ('sequelize');
const sequelize = new Sequelize ('mysql://root:@localhost:3306/delilah_resto');
const jwt = require('jsonwebtoken');

// 0.2) Autorizacion
const mi_pass_jwt = "Juan1234";

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



// 2) get /products --> Obtener listado de todos los productos (usuario) //OK

router.get("/",autorizarUsuario, (req,res)=>{

    sequelize.query('SELECT * FROM products',
    {type: sequelize.QueryTypes.SELECT})
    .then(resp=>{
        res.json (resp)
    })

});


// 5) post/products --> Crear un nuevo producto (administrador) //OK

router.post("/",autorizarUsuario, async (req,res)=>{
    if (req.user.admin == 1){
        await sequelize.query("INSERT INTO products VALUES (?, ?, ?)",
            {replacements: [req.body.id, req.body.name, req.body.prize]})
            .then(response=>{
                res.send("se agrego un nuevo producto")
        })
    }else {
        res.send ("No esta autorizado");
    }
});

// 6) put/products --> Edita un producto (administrador) //OK

router.put("/:id", autorizarUsuario, async (req,res)=>{
    const id = req.params.id;
    if (req.user.admin == 1){
        await sequelize.query(`UPDATE products SET name = ?, prize = ? WHERE id = ${id}`,
            {replacements: [req.body.name, req.body.prize]})
            .then(response=>{
                res.send("se actualizo el producto")
        })
    }else {
        res.send ("No esta autorizado");
    }
});

// 7) delete/products --> Eliminar un producto (administrador) //OK

router.delete("/:id", autorizarUsuario, async (req,res)=>{
    const id = req.params.id;
    if (req.user.admin == 1){
        await sequelize.query(`DELETE FROM products WHERE id = ${id}`)
            .then(response=>{
                res.send("se elimino el producto")
        })
    }
});


module.exports = router;