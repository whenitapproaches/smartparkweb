module.exports = {
    connection: {
        IP: "192.168.1.2",
        port: 3000,
        database: {
            mongodb: 'mongodb://localhost:27017/smartpark-web'
        }
    },
    authentication: {
        privateKey: "Nhom1",
        cookieTime: 3600000
    },
    googleSheetId: '1kho2wjihPlHU5nOAoiVVSGlRE5fKvGiRYRQFa0nsWw8',
    settings: {
        price: {
            basic: 100,
            premium: 50,
            guest: 200
        }
    }
}