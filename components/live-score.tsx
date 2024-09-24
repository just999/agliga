'use client';

import { useEffect, useRef, useState } from 'react';
import Loader from './loader';
import { HeadingLogo } from './ui';

const LiveScore = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeZone = '%2B0800';
    const dstbox = '';
    const cpageBgColor = 'CCCCCC';
    const wordAd = '';
    const wadurl = '//';
    const width = '1004';
    const tableFontSize = '12';
    const cborderColor = '333333';
    const ctdColor1 = 'EEEEEE';
    const ctdColor2 = 'FFFFFF';
    const clinkColor = '0044DD';
    const cdateFontColor = 'FFFFFF';
    const cdateBgColor = '333333';
    const scoreFontSize = '12';
    const cteamFontColor = '000000';
    const cgoalFontColor = 'FF0000';
    const cgoalBgColor = 'FFFF99';
    const cremarkFontColor = '000000';
    const mark = 'en';
    const cremarkBgColor = 'F7F8F3';
    const Skins = '2';
    const teamWeight = '400';
    const scoreWeight = '700';
    const goalWeight = '700';
    const fontWeight = '700';

    const src = `//freelive.7msport.com/live.aspx?mark=${mark}&TimeZone=${timeZone}&wordAd=${wordAd}&cpageBgColor=${cpageBgColor}&wadurl=${wadurl}&width=${width}&tableFontSize=${tableFontSize}&cborderColor=${cborderColor}&ctdColor1=${ctdColor1}&ctdColor2=${ctdColor2}&clinkColor=${clinkColor}&cdateFontColor=${cdateFontColor}&cdateBgColor=${cdateBgColor}&scoreFontSize=${scoreFontSize}&cteamFontColor=${cteamFontColor}&cgoalFontColor=${cgoalFontColor}&cgoalBgColor=${cgoalBgColor}&cremarkFontColor=${cremarkFontColor}&cremarkBgColor=${cremarkBgColor}&Skins=${Skins}&teamWeight=${teamWeight}&scoreWeight=${scoreWeight}&goalWeight=${goalWeight}&fontWeight=${fontWeight}&DSTbox=${dstbox}`;

    const handleIframeLoad = () => {
      setIsLoading(false);
    };

    const currentIframe = iframeRef.current;

    if (currentIframe) {
      currentIframe.src = src;
      currentIframe.onload = handleIframeLoad;
    }

    return () => {
      if (currentIframe) {
        currentIframe.onload = null;
      }
    };
  }, []);

  return (
    <div className='live-score-container'>
      {isLoading ? <Loader /> : <HeadingLogo title='Live' center />}
      <>
        <iframe
          ref={iframeRef}
          height='100%'
          width='1024'
          className='w-full h-screen '
          style={{ overflow: 'auto', border: 'none' }}
        />
      </>
    </div>
  );
};

export default LiveScore;
