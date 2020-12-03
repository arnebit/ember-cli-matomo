/* global _paq */
import Mixin from '@ember/object/mixin';
import { on } from '@ember/object/evented';
/**
 * Implements the logic to use the Matomo/Piwik tracker to send pageview events.
 *
 * Make sure to extend the main application router with this mixin to enable the
 * automatic pageview tracking when transitioning into a new route.
 *
 * @class PageViewTrackerMixin
 * @example
 * import Matomo from '@oi/ember-cli-matomo/mixins/page-view-tracker'
 * const Router = Ember.Router.extend(Matomo, {
 *   // ...
 * });
 * @see {@link http://emberjs.com/api/classes/Ember.Route.html#event_didTransition|didTransition event}
 * @since 0.0.2
 */
export default Mixin.create({
  /**
   * Calls the Piwik tracker to send a pageview.
   *
   * Listens to the `didTransition` event.
   *
   * @member {Function} trackPiwikPageView
   * @since 0.0.2
   */
  trackPiwikPageView: on('didTransition', function() {
    _paq.push([
      'trackPageView', this.get('url')
    ]);
  })
});
