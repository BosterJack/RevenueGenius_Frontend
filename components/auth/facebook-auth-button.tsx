import { useState } from 'react';

export default function FacebookAuthButton() {
  const [isLoading, setIsLoading] = useState(false);

  const initiateFacebookLogin = () => {
    console.log("Initializing Facebook login...");
    setIsLoading(true);
    
    const clientId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;
    const redirectUri = process.env.NEXT_PUBLIC_FACEBOOK_OAUTH_CALLBACK_URL;
    
    // Define required scopes for Facebook Ads API
    const scopes = [
      'email',
      'public_profile',
      'ads_management',
      'ads_read',
      'business_management'
    ];
    
    const oauthUrl = 'https://www.facebook.com/v18.0/dialog/oauth';
    const queryParams = new URLSearchParams({
      client_id: clientId || '',
      redirect_uri: redirectUri || '',
      response_type: 'code',
      scope: scopes.join(','),
      state: Math.random().toString(36).substring(2)
    });
    
    window.location.href = `${oauthUrl}?${queryParams.toString()}`;
  };

  return (
    <button 
      onClick={initiateFacebookLogin} 
      className="btn-auth w-full flex items-center justify-center space-x-3 py-4 px-6 bg-blue-600 text-white rounded-xl font-medium text-sm transition-all hover:shadow-lg hover:bg-blue-700"
    >
      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M20 10.0022C20.0004 8.09104 19.4532 6.2198 18.4231 4.61003C17.393 3.00026 15.9232 1.71938 14.1877 0.919062C12.4522 0.118741 10.5237 -0.167503 8.63053 0.0942223C6.73739 0.355948 4.9589 1.15468 3.50564 2.39585C2.05237 3.63701 0.985206 5.26863 0.430913 7.0975C-0.123379 8.92636 -0.143246 10.8759 0.373484 12.7152C0.890214 14.5546 1.92564 16.2067 3.35754 17.476C4.78944 18.7453 6.54969 19.5786 8.4375 19.8772V12.8922H5.89875V10.0022H8.4375V7.79843C8.38284 7.28399 8.44199 6.76382 8.61078 6.2748C8.77957 5.78577 9.05386 5.33986 9.4142 4.96866C9.77455 4.59746 10.2121 4.31007 10.6959 4.12684C11.1797 3.94362 11.6979 3.86905 12.2137 3.90843C12.9638 3.91828 13.7121 3.98346 14.4525 4.10343V6.56718H13.1925C12.9779 6.53911 12.7597 6.55967 12.554 6.62733C12.3484 6.69498 12.1607 6.80801 12.0046 6.95804C11.8486 7.10807 11.7283 7.29127 11.6526 7.49408C11.577 7.69689 11.5479 7.91411 11.5675 8.12968V10.0047H14.3412L13.8975 12.8947H11.5625V19.8834C13.9153 19.5112 16.058 18.3114 17.6048 16.4999C19.1516 14.6884 20.001 12.3842 20 10.0022Z"></path>
          </svg>
          <span className="font-medium">Sign in with Facebook</span>
        </>
      )}
    </button>
  );
}