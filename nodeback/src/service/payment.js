const MercadoPago = require('mercadopago');

const MP_ACCESS_TOKEN=`APP_USR-2499923879849179-091109-37884fd325d83e23b91f2dafbc2240c4-1823829570`

async function criaPagamento(clientEmail, paymentId, amount) {
  // Step 2: Initialize the client object
  const client = new MercadoPago.MercadoPagoConfig({ 
    accessToken: MP_ACCESS_TOKEN, 
    options: { timeout: 5000, idempotencyKey: paymentId } 
    });

// Step 3: Initialize the API object
const payment = new MercadoPago.Payment(client);

// Calculo de data para expiração(30 dias)
const expirationDate = new Date()
expirationDate.setDate(expirationDate.getDate() + 30)

const body = {
    transaction_amount: amount,
    description: 'Pagamento de Inscrição',
    payment_method_id: 'pix',
    payer: {
        email: clientEmail
    },
    date_of_expiration: expirationDate.toISOString() // 30 dias de expiração da chave pix
};

const requestOptions = {
    idempotencyKey: paymentId
};

const resut = await payment.create({ body, requestOptions })
    return resut
}

module.exports = {
    criaPagamento
}