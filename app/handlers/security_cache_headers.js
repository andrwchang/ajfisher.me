// Intercepts the outbound response and sets up the appropriate
// headers on the response for security and correct caching for gatsby

// Thanks to https://www.ximedes.com/2018-04-23/deploying-gatsby-on-s3-and-cloudfront/
// for the approach which is very solid

exports.handler = (event, context, callback) => {
  const request = event.Records[0].cf.request;
  const response = event.Records[0].cf.response;
  const headers = response.headers;

  if (request.uri.startsWith('/static/')) {
    headers['cache-control'] = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable'
      }
    ];
  } else {
    if (request.uri.endsWith('sw.js')) {
      headers['cache-control'] = [
        {
          key: 'Cache-Control',
          value: 'public, max-age=0, must-revalidate'
        }
      ];
    } else {
      let cache = false;
      const uri = request.uri;
      if (uri.startsWith('/styles-') && uri.endsWith('.css')) {
        // cache built CSS files
        cache = true;
      } else if (uri.startsWith('/webpack-') && (uri.endsWith('.js') || uri.endsWith('.js.map'))) {
        // cache webpacked files
        cache = true;
      } else if (uri.startsWith('/component-') && (uri.endsWith('js') || uri.endsWith('.js.map'))) {
        // cache component react files
        cache = true;
      } else if (uri.startsWith('/commons-') && (uri.endsWith('js') || uri.endsWith('.js.map'))) {
        cache = true;
      } else if (uri.startsWith('/app-') && (uri.endsWith('js') || uri.endsWith('.js.map'))) {
        cache = true;
      }

      if (cache) {
        // if we should cache the file then send back the cache header
        headers['cache-control'] = [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ];
      } else {
        // if we shouldn't cache it then make it immutable
        headers['cache-control'] = [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate'
          }
        ];
      }
    }
  }

  [
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=604800; includeSubDomains'
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff'
    },
    {
      key: 'X-Permitted-Cross-Domain-Policies',
      value: 'none'
    },
    {
      key: 'Referrer-Policy',
      value: 'no-referrer'
    },
    {
      key: 'X-Frame-Options',
      value: 'deny'
    },
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block'
    },
    {
      key: 'Content-Security-Policy',
      value:
        "default-src 'self' ; " +
        "connect-src 'self' ; " +
        "script-src 'self' 'unsafe-inline' https://www.google-analytics.com ; " +
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com ; " +
        "prefetch-src 'self' ; " +
        "img-src 'self' data: https://www.google-analytics.com ; " +
        "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com ; " +
        "manifest-src 'self' ; " +
        'upgrade-insecure-requests; block-all-mixed-content ; ' +
        "frame-src 'self' http://*.ajf.io https://*.ajf.io https://www.youtube.com ; "
    }
  ].forEach(h => (headers[h.key.toLowerCase()] = [h]));

  callback(null, response);
};
