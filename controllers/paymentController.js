'use strict'
const Producto = require('../models/producto');
const axios = require("axios");

/*-----------CREAR ORDEN-----------*/
const createOrder = async (req, res) => {
    const id = req.params.id;

    try {
        const producto = await Producto.findById(id);
        if (producto == null) {
            return res.status(404).json({
                mensaje: 'No existe el producto.'
            })
        }

        //console.log('createOrder: ', producto);

        const order = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: producto.precio,
                    },
                    description: producto.nombre
                },
            ],


            application_context: {
                brand_name: "contabledemo.com",
                landing_page: "NO_PREFERENCE",
                user_action: "PAY_NOW",
                return_url: `${process.env.HOST}/capture-order`,
                cancel_url: `${process.env.HOST}/cancel-order`,
            },
        };

        console.log('createOrder. ORDEN:', order.application_context);

        // format the body
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");

        // Generate an access token
        const {
            data: { access_token },
        } = await axios.post(
            "https://api-m.sandbox.paypal.com/v1/oauth2/token",
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                auth: {
                    username: process.env.PAYPAL_API_CLIENT,
                    password: process.env.PAYPAL_API_SECRET,
                },
            }
        );

        //console.log('TOKEN: ', access_token);

        // make a request
        const response = await axios.post(
            `${process.env.PAYPAL_API}/v2/checkout/orders`, order,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        //console.log(response.data);

        return res.json(response.data);

    } catch (error) {
        console.log('createOrder(ERROR): ', error.message);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}


/*-----------CAPTURAR PAGO-----------*/
const captureOrder = async (req, res) => {
    const { token } = req.query;

    console.log('captureOrder(Token): ', token);

    try {
        const response = await axios.post(
            `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
            {},
            {
                auth: {
                    username: process.env.PAYPAL_API_CLIENT,
                    password: process.env.PAYPAL_API_SECRET,
                },
            }
        ); 

        console.log('captureOrder(DATA): ', response.data);

        res.redirect("/payed.html");
    } catch (error) {
        console.log('captureOrder(ERROR): ',error.message);
        return res.status(500).json({ message: "Error del servidor" });
    }

};


/*-----------CANCELAR PAGO-----------*/
const cancelPayment = (req, res) => {
    res.redirect("/");
};

module.exports = {
    createOrder,
    captureOrder,
    cancelPayment
}