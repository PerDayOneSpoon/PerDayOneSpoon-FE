import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialize, setInitialized] = useState(false);

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialize) {
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [initialize, location]);
};

export default RouteChangeTracker;
