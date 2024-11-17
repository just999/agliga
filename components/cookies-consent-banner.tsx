'use client';

// import { setCookie } from '@/actions/cookies-actions';
import React, { useEffect, useState } from 'react';

import { setUserCookie } from '@/actions/cookies-actions';

import { Button, InputCustom } from './shadcn/ui';

type CookiesConsentBannerProps = {};

const CookiesConsentBanner = () => {
  const [consent, setConsent] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [cookiesTypes, setCookiesTypes] = useState<{
    [key: string]: boolean;
  }>({ necessary: true, analytics: false, marketing: false });

  useEffect(() => {
    const storedConsent = localStorage.getItem('consent');
    const storedPreferences = getCookiesPreferences();

    if (storedConsent == 'denied') {
      setConsent('denied');
      setCookiesTypes({
        necessary: false,
        analytics: false,
        marketing: false,
      });
    } else if (storedPreferences) {
      const preferences = JSON.parse(storedPreferences);
      setCookiesTypes(preferences);
      setConsent(
        Object.values(preferences).some((value) => value)
          ? 'accepted'
          : 'denied'
      ); // Check if any cookie types are enabled
      // const allDisabled = Object.values(preferences).every((value) => !value);
      // if (allDisabled) {
      //   setConsent('denied');
      // } else {
      //   setConsent('accepted');
      // }
    } else {
      setConsent(storedConsent);
    }
  }, []);

  const handleAccept = () => {
    setUserCookie('consent', 'accepted');
    setConsent('accepted');

    console.log('User Accepted cookies');
    console.log('User Agent', window.navigator.userAgent);
    console.log('User Language', window.navigator.language);

    localStorage.setItem('consent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiesTypes)); // Save preferences

    // !LOG USER INFORMATION FROM COOKIES
    console.log('User Preferences', localStorage.getItem('userPreferences'));
    console.log('USession ID', localStorage.getItem('sessionId'));
  };

  const handleDenied = () => {
    localStorage.setItem('consent', 'denied');
    setConsent('denied');

    localStorage.removeItem('cookiePreferences');

    setCookiesTypes({
      necessary: false,
      analytics: false,
      marketing: false,
    });
  };

  const handleManage = () => {
    setShowModal(true);
  };

  const handleCookieTypeChange = (type: string) => {
    setCookiesTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // const handleSavePreferences = () => {
  //   const preferences = JSON.stringify(cookiesTypes);
  //   localStorage.setItem('cookiePreferences', preferences);

  //   const allDisabled = Object.values(cookiesTypes).every((value) => !value);

  //   if (allDisabled) {
  //     localStorage.setItem('consent', 'denied');
  //   } else {
  //     localStorage.setItem('consent', 'accepted');
  //     setConsent('accepted');
  //   }

  //   setShowModal(false);
  // };

  const handleSavePreferences = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(cookiesTypes));
    setConsent(
      Object.values(cookiesTypes).some((value) => value) ? 'accepted' : 'denied'
    );
    setShowModal(false);
  };

  const getCookiesPreferences = () => {
    const preferencesStr = localStorage.getItem('cookiePreferences');
    if (preferencesStr) {
      const preferences = JSON.parse(preferencesStr);
      return preferences;
    }
    return null;
  };

  if (consent === 'accepted') {
    return null;
  } else if (consent === 'denied') {
    return null;
  }
  return (
    <>
      <div className='fixed bottom-0 left right-0 bg-gray-900 text-white p-4 '>
        <p>This Website Uses cookie to embrace your experiences</p>
        <div>
          <Button
            className='bg-gray-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2 '
            onClick={handleAccept}
          >
            Accept
          </Button>
        </div>
        <Button
          className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2 '
          onClick={handleDenied}
        >
          Deny
        </Button>
        <Button
          className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
          onClick={handleManage}
        >
          Manage
        </Button>
      </div>
      {showModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 '>
          <div className='bg-white p-6 rounded-lg '>
            <h2 className='text-xl font-bold mb-4 '>
              Manage Cookie Preferences
            </h2>
          </div>
          <div className='flex items-center mb-2 '>
            <input
              type='checkbox'
              checked={cookiesTypes.necessary}
              id='necessary'
              onChange={() => handleCookieTypeChange('necessary')}
              className='mr-2'
            />
            <label
              htmlFor='necessary'
              className='text-blue-500 hover:underline cursor-pointer '
            >
              {' '}
              Necessary Cookies
            </label>
          </div>
          <div className='flex items-center mb-2'>
            <input
              type='checkbox'
              id='analytics'
              checked={cookiesTypes.analytics}
              onChange={() => handleCookieTypeChange('analytics')}
              className='mr-2 '
            />
            <label
              htmlFor='analytics'
              className='text-blue-500 hover:underline cursor-pointer'
            >
              Analytics cookies{' '}
            </label>
          </div>
          <div className='flex items-center mb-4'>
            <input
              type='checkbox'
              id='marketing'
              checked={cookiesTypes.marketing}
              onChange={() => handleCookieTypeChange('marketing')}
              className='mr-2 '
            />
            <label
              htmlFor='marketing'
              className='text-blue-500 hover:underline cursor-pointer'
            >
              Marketing cookies{' '}
            </label>
          </div>
          <div>
            <Button
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'
              onClick={handleSavePreferences}
            >
              Save Preferences
            </Button>
            <Button
              className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded'
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CookiesConsentBanner;
