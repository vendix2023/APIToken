
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Configuración del middleware
app.use(bodyParser.json());

// Clave secreta para decodificar el JWT
const SECRET_KEY = `-----BEGIN PUBLIC KEY-----
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

// Función para decodificar el JWT
function decodeJwt(token, secretKey) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return 'Token has expired.';
        } else if (error.name === 'JsonWebTokenError') {
            return 'Invalid token.';
        }
        return 'Error decoding token.';
    }
}

// Ruta principal
app.get('/', (req, res) => {
    res.send('Webhooks with JavaScript');
});
// Ruta para manejar el pago
app.post('/pay', (req, res) => {
    const token = req.body.token;

    console.log('Token received:', token);

    // Decodificar el JWT
    const decodedToken = decodeJwt(token, SECRET_KEY);
    console.log('Decoded token:', decodedToken);

    // Enviar respuesta
    res.status(200).json({ status: 'success', decodedToken });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
