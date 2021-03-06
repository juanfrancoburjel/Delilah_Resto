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


// 3) post/orders --> Crear una nueva orden (usuario) //OK

router.post("/",autorizarUsuario, async (req,res)=>{
    await sequelize.query("INSERT INTO orders VALUES (?, ?, ?, ?)",
        {replacements: [null, req.body.users_id, req.body.time, req.body.status]})
        .then(response=>{
            res.send("se agrego un nueva orden")
    })
});


// 4) put/orders --> Actualiza una orden (administrador) //OK

router.put("/:id",autorizarUsuario, async (req,res)=>{
    const id = req.params.id;
    if (req.user.admin == 1){
        await sequelize.query(`UPDATE orders SET users_id = ?, time = ?, status = ? WHERE id= ${id}`,
            {replacements: [req.body.users_id, req.body.time, req.body.status]})
            .then((response=>{
                res.send("se actualizo la orden")
        }))
    }else {
        res.send ("No esta autorizado");
    }
});

// 5) delete/orders --> Eliminar una orden //OK

router.delete("/:id", autorizarUsuario, async (req,res)=>{
    const id = req.params.id;
    const userid = await sequelize.query(`SELECT * FROM orders WHERE id = ${id} `,
    {type: sequelize.QueryTypes.SELECT})
    .then(resp=>{
        return resp[0]
    })
    console.log(req.user.id)
    console.log(userid.users_id)
    if (req.user.id == userid.users_id){
        await sequelize.query(`DELETE FROM orders WHERE id = ${id}`)
            .then(response=>{
                res.send("se elimino la orden")
        })
    }
    else {res.send("no tiene permiso")}
});




module.exports = router;