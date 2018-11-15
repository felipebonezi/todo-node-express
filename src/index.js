const todoRouter = require('./routers/todo-router');
const express = require('express');
const app = express();

// Rota para abertura de arquivos públicos - e.g. Imagens, Docs, CSS.
app.use('/assets', express.static(`${__dirname}/assets`));

// Rota de autenticação do usuário
app.post('/api/auth/login', (req, res) => {
        console.log('Login route.');
        res.end();
    })
    // Rota de solicitação de recuperação de senha do usuário.
    .post('/api/auth/recover-password', (req, res) => {
        console.log('[POST] Recover password route.');
        res.end();
    })
    // Rota para alter a senha do usuário.
    .put('/api/auth/recover-password', (req, res) => {
        console.log('[PUT] Recover password route.');
        res.end();
    });

// Todas rotas relecionadas aos TODOs - e.g. C.R.U.D.
// Essas rotas precisam de autenticação usando JWT e permissões!
app.use('/api/todo', todoRouter);

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});