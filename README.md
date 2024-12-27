# Razorpay Integration Guide

This repository demonstrates how to integrate Razorpay payment gateway into your web application.

## Prerequisites

- Node.js 14.x or higher
- A Razorpay account ([Sign up here](https://razorpay.com))
- API Key and Secret from Razorpay Dashboard

## Installation

1. Clone the repository:
```bash
git clone https://github.com/ABHI-Theq/Razorpay_integration.git
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

## Usage

### Backend Setup (Express.js)

```javascript
const express = require('express');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create order
app.post('/create-order', async (req, res) => {
  const options = {
    amount: req.body.amount * 100, // amount in paise
    currency: 'INR',
    receipt: 'order_' + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});
```

### Frontend Integration

```javascript
const options = {
  key: 'YOUR_KEY_ID',
  amount: 50000, // Amount in paise
  currency: 'INR',
  name: 'Your Company Name',
  description: 'Test Transaction',
  order_id: 'order_id_from_backend',
  handler: function(response) {
    alert('Payment ID: ' + response.razorpay_payment_id);
  },
  prefill: {
    name: 'Customer Name',
    email: 'customer@example.com',
    contact: '9999999999'
  }
};

const paymentObject = new window.Razorpay(options);
paymentObject.open();
```

## Webhook Integration

1. Set up webhook URL in Razorpay Dashboard
2. Handle webhook events:

```javascript
app.post('/webhook', (req, res) => {
  const secret = 'your_webhook_secret';
  
  const shasum = crypto.createHmac('sha256', secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');
  
  if (digest === req.headers['x-razorpay-signature']) {
    // Payment is legitimate
    // Update database
    res.json({ status: 'ok' });
  } else {
    res.status(400).json({ status: 'invalid signature' });
  }
});
```

## Testing

1. Use test mode in Razorpay Dashboard
2. Test card numbers:
   - Success: 4111 1111 1111 1111
   - Failure: 4242 4242 4242 4242

## Security Best Practices

1. Never expose your Key Secret
2. Always verify webhook signatures
3. Use HTTPS for all API calls
4. Implement proper error handling
5. Store sensitive data securely

## Error Handling

```javascript
try {
  const payment = await razorpay.payments.capture(paymentId, amount);
} catch (error) {
  if (error.error.code === 'BAD_REQUEST_ERROR') {
    // Handle invalid payment
  }
  // Handle other errors
}
```

## API Reference

- [Razorpay API Documentation](https://razorpay.com/docs/api)
- [Razorpay Payment Button](https://razorpay.com/docs/payment-button)
- [Razorpay Test Mode](https://razorpay.com/docs/test-mode)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@example.com or join our Slack channel.
