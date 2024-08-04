const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Ruta principal
app.get('/', (req, res) => {
    res.send('Webhooks with JavaScript');
});

// Función para decodificar el JWT
function decodeJwt(token, secretKey) {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        return decodedToken;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // Maneja el error de expiración del token
            return "Token has expired.";
        } else if (error.name === 'JsonWebTokenError') {
            // Maneja el error de token inválido
            return "Invalid token.";
        }
        // Otros errores
        return "Error decoding token.";
    }
}

// Ruta para manejar pagos
app.post('/pay', (req, res) => {
    const token = req.body.token;

    if (token) {
        const secretKey = 'secret';
        const decodedToken = decodeJwt(token, secretKey);
        console.log(decodedToken);

        res.status(200).send('success');
    } else {
        res.status(400).send('Bad Request');
    }
});

// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
