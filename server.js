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
        const secretKey = `-----BEGIN PUBLIC KEY-----
        MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKC
        AQEAgsPNCC3xfxSabohQq94u
        yLbzja3iJ1nGZaPkN2t1z8DfV9fBtBYAKRqrHDi02P1
        6os5fdo5uNGfuAM1T8Tn9
        uSZtT3BnvPTuSU+z9OZoKroIpA+dNrwPkVYa6ztI29
        YHDVkRGHX+m9F9ePVgcO1Q
        GaCh39L4LbwnSYJ+4qCGEpu4pLw7fb0JHGdqcY5I
        MSckjoQ2TeZy0Qrs3QsbD63B
        UHaK+GcGQT9pUJM20GM2dyoWV7xHLdEClF4U9
        AUnG8LrUr/XkFYP/eVnURB1sT7b
        dS9A3nLts/O5S9M92lHlQ16b8BMvU8spRNV7B//b
        zzPdMVlBMtoJBXL+A5e4kTPW
        DQIDAQAB
        -----END PUBLIC KEY-----`;
        const decodedToken = decodeJwt(token, secretKey);
        console.log(decodedToken);

        res.status(200).send('success');
    } else {
        res.status(400).send('Bad Request');
    }
});

// Iniciar el servidor
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
