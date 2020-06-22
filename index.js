const express = require('express');

const server = express();

server.use(express.json());

const users = [];

function verifyData(req,res,next){
    const {email,conteudo,data,hora} = req.body;
    
    if(!conteudo){
        return res.json({
            error:'conteúdo é obrigatório'
        });
    } else if (!data){
        return res.json({
            error:'data é obrigatório'
        });
    }else if(!hora){
        return res.json({
            error:'hora é obrigatório'
        });
    }else if (!email){
        return res.json({
            error:'email é obrigatório'
        });
    }

    next();
}

server.get('/',(req,res) => {
    return res.json({
        result:'Crie uma nota'
    })
});

server.get('/users',(req,res)=>{
    return res.json({users});
});

server.get('/users/:id',(req,res)=>{
    const {id} = req.params;

    return res.json({
        result:'usuario encontrado com sucesso',
        user: users[id]
    });
});

server.put('/users', (req,res)=>{
    const {email,conteudo,data,hora} = req.body;
    const {id} = req.params;

    const user={
        email,
        conteudo,
        data,
        hora,
    }

    users[id] = user;
    return res.json({
        result: 'Dados atualizados com sucesso',
        user: user 
    })
})

server.post('/users', verifyData,(req,res)=>{
   const {email,conteudo,data,hora} = req.body;

    const user = {email,conteudo,data,hora};
    
    users.push(user);

    return res.json(user);
})

server.listen(3000);