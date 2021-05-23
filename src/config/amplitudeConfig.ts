import amplitude from 'amplitude-js';

const appName = process.env.REACT_APP_NAME;
const appVersion = process.env.REACT_APP_VERSION;
const amplitudeKey = process.env.REACT_APP_AMPLITUDE_KEY || 'Key unset';

amplitude.getInstance().init(amplitudeKey, undefined, {
  platform: 'Web',
  sameSiteCookie: 'Lax',
});

amplitude.getInstance().setVersionName(`${appName}-${appVersion}`);
amplitude.getInstance().setUserId(null);

/** Same as 'amplitude.getInstance().logEvent()', but saves me from typing it each time
 * > Note: The server response code and response body from the event upload are passed to the callback function.
 * TODO: check that response code and response body are being passed properly
 */
export const logAmpEvent = (eventType: string, eventProperties?: Object, callback?: () => any) =>
  amplitudeKey !== 'Key unset' && amplitude.getInstance().logEvent(eventType, eventProperties, callback);
