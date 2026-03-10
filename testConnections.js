const db = require('./config/db');

async function testDB() {
    try {
        const [rows] = await db.query('SELECT 1');
        console.log("Conexión a MySQL exitosa");
        console.log(rows);
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}

testDB();