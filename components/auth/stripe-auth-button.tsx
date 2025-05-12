import { useState } from 'react';

export default function StripeAuthButton() {
  const [isLoading, setIsLoading] = useState(false);

  const initiateStripeConnect = () => {
    console.log("Initializing Stripe Connect...");
    setIsLoading(true);
    
    const clientId = process.env.NEXT_PUBLIC_STRIPE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_STRIPE_OAUTH_CALLBACK_URL;
    
    // Define specific parameters for Stripe Connect
    const oauthUrl = 'https://connect.stripe.com/oauth/authorize';
    const queryParams = new URLSearchParams({
      client_id: clientId || '',
      response_type: 'code',
      scope: 'read_write',
      redirect_uri: redirectUri || '',
      state: Math.random().toString(36).substring(2)
    });
    
    window.location.href = `${oauthUrl}?${queryParams.toString()}`;
  };

  return (
    <button 
      onClick={initiateStripeConnect} 
      className="btn-auth w-full flex items-center justify-center space-x-3 py-4 px-6 bg-purple-600 text-white rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:bg-purple-700"
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
          </svg>
          <span className="font-medium">Connect with Stripe</span>
        </>
      )}
    </button>
  );
}
