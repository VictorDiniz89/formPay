const mercadopago = require('mercadopago');


mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_ACCESS_TOKEN)

class PaymentsController {
    async checkout(req, res) {
        const {id, email, description, amount} = req.params

        const paymentData = {
            transaction_amount: parseFloat(amount),
            description: description,
            payment_method_id: "pix",
            payer: {
                email: email,
                identification:{ 
                    type: 'CPF',
                    number: '12345678909'
                }
    
            }
        };

        try {
            const payment = await mercadopago.payment.create(paymentData);
            return res.status(201).json({ payment });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PaymentsController();

