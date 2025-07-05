export const razorpayOptions = (amount, user, onSuccess, onError) => ({
  key: "rzp_test_t14beORhDxSlz9", // Replace with your Razorpay Key ID
  amount: amount * 100, // Convert to paise
  currency: "INR",
  name: "VehicleRent",
  description: "Vehicle Booking Payment",
  image: "/logo.png", // Optional: Add your logo
  handler: function (response) {
    console.log("Payment successful:", response);
    onSuccess(response);
  },
  prefill: {
    name: user?.displayName || user?.email || "",
    email: user?.email || "",
    contact: user?.phoneNumber || ""
  },
  theme: {
    color: "#3498db"
  },
  modal: {
    ondismiss: function() {
      console.log("Payment cancelled");
      onError("Payment cancelled");
    }
  }
});

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


export async function initiatePayment(options) {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    alert("Failed to load Razorpay SDK. Please check your connection.");
    return;
  }

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}