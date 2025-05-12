import { useState } from 'react';

export default function PayPalAuthButton() {
  const [isLoading, setIsLoading] = useState(false);

  const initiatePayPalLogin = () => {
    console.log("Initializing PayPal login...");
    setIsLoading(true);
    
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_PAYPAL_OAUTH_CALLBACK_URL;
    
    // Define scopes needed for PayPal integration
    const scopes = [
      'openid',
      'profile',
      'email',
      'https://uri.paypal.com/services/payments/payment',
      'https://uri.paypal.com/services/subscriptions'
    ];
    
    const oauthUrl = 'https://www.paypal.com/signin/authorize';
    const queryParams = new URLSearchParams({
      client_id: clientId || '',
      response_type: 'code',
      scope: scopes.join(' '),
      redirect_uri: redirectUri || '',
      nonce: Math.random().toString(36).substring(2)
    });
    
    window.location.href = `${oauthUrl}?${queryParams.toString()}`;
  };

  return (
    <button 
      onClick={initiatePayPalLogin} 
      className="btn-auth w-full flex items-center justify-center space-x-3 py-4 px-6 bg-blue-800 text-white rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:bg-blue-900"
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M18.17 4.91c-.35-1.62-1.67-2.4-3.34-2.4H5.19c-.5 0-.92.37-1 .86L2.04 17.42c-.08.59.36 1.12.96 1.12h4.29c.5 0 .92-.37 1-.86l.39-2.48c.08-.5.5-.86 1-.86h2.35c3.04 0 5.25-1.46 5.85-4.52.26-1.32.01-2.41-.7-3.15-.2-.2-.43-.38-.68-.53-.44-.24-.96-.4-1.5-.48-.24-.04-.49-.06-.76-.05"/>
            <path d="M8.95 4.58L7.72 12.2c-.04.28.17.54.46.54h1.6c.36 0 .67-.26.73-.62l1.14-7.27c.06-.38-.24-.73-.63-.73H9.41c-.2 0-.4.14-.46.34z"/>
          </svg>
          <span className="font-medium">Sign in with PayPal</span>
        </>
      )}
    </button>
  );
}