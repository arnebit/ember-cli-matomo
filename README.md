# ember-cli-matomo

Inject Matomo (formerly known as Piwik) tracking into an ember-cli application.

Forked from ember-cli-piwik, which was marked **[p]lease note that this is not production-ready software**, but found quite production-ready by some (except for a "ember-cli-babel 5 is deprecated" warning during the build process, which is fixed here).

## Installation

In your project root, run:

```bash
ember install @oi/ember-cli-matomo
```

## Configuration

This addon is configured via your application's `config/environment.js` file by
adding two configuration options: `ENV.piwik.sid` (site Id) and `ENV.piwik.url`.
Alternatively, the relevant key may be named `matomo` instead of `piwik`
(with the latter taking precedence in case both are present).

In order to configure your application, add the following object to your
environments:

```javascript
matomo: {
  sid: 123,
  url: 'https://your-piwik.endpoint.com'
}
```

You can have independent site IDs and URLs per environment, for example:

```javascript
if (environment === 'development') {
  ENV.matomo = {
    sid: 3,
    url: 'http://your.matomo.domain/and/path'
  }
}

// ...

if (environment === 'production') {
  ENV.matomo = {
    sid: 7,
    url: '//another-piwik.endpoint.com'
  }
}
```

Usually though the only difference between environments is the site ID. In such
a situation, the best approach is the following:

```javascript
// config/environment.js
module.exports = function(environment) {
  const ENV = {
    // ...
    piwik: {
      url: 'https://piwik.endpoint.com'
    },
    // ...
  };

  if (environment === 'development') {
    // ...
    ENV.matomo.sid = 2;
  }

  if (environment === 'test') {
    // ...
    ENV.matomo.sid = 7;
  }

  if (environment === 'production') {
    // ...
    ENV.matomo.sid = 19;
  }

  return ENV;
};
```

## Automatic PageView Tracking

This addon can take care of notifying pageviews to the Piwik server when
transitioning into a route automatically.

All you have to do is to extend the main application router with the provided
mixin:

```javascript
// app/router.js
import Ember from 'ember';
import config from './config/environment';
import Piwik from '@oi/ember-cli-matomo/mixins/page-view-tracker';

const Router = Ember.Router.extend(Piwik, {
  location: config.locationType
});

Router.map(function() {
  // ...
});

export default Router;
```

Now when the `didTransition` event fires, the router will call the Piwik tracker
which in turn will emit a `trackPageView` event passing the current URL as the
event title.

## Running Tests

Clone this project, install the dependencies, then run the tests:

```bash
$ git clone https://github.com/unwiredbrain/ember-cli-matomo.git
$ npm install && bower install
$ npm test
```

## Acknowledgements

[Peter Grippi][4], for his [ember-cli-google-analytics][5] addon.

[4]: https://github.com/pgrippi
[5]: https://github.com/pgrippi/ember-cli-google-analytics

[Massimo Lombardo][6] for [ember-cli-piwik][7].

[6]: https://github.com/unwiredbrain/
[7]: https://github.com/unwiredbrain/ember-cli-piwik/

