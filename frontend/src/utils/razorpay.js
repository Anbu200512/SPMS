let scriptPromise = null;

export const loadRazorpayScript = () => {
  if (window.Razorpay) return Promise.resolve(window.Razorpay);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error('Failed to load Razorpay checkout'));
    };
    document.body.appendChild(script);
  });

  return scriptPromise;
};

export const openRazorpayCheckout = ({
  key,
  orderId,
  amount,
  currency = 'INR',
  name = "St. Paul's School",
  description = '',
  prefill = {},
  paymentMethods = [],
  handler,
}) => {
  const options = {
    key,
    amount,
    currency,
    name,
    description,
    order_id: orderId,
    handler,
    prefill: {
      name: prefill.name || '',
      email: prefill.email || '',
      contact: prefill.contact || '',
    },
    theme: { color: '#4f46e5' },
  };

  if (paymentMethods.length > 0) {
    const method = {};
    ['upi', 'card', 'netbanking', 'wallet', 'emi', 'paylater'].forEach((m) => {
      method[m] = paymentMethods.includes(m);
    });
    options.method = method;
  }

  const rzp = new window.Razorpay(options);
  rzp.open();
  return rzp;
};
