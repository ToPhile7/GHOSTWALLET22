/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/balance` | `/balance`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/chains` | `/chains`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/console` | `/console`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/balance` | `/balance`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/chains` | `/chains`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/console` | `/console`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/balance${`?${string}` | `#${string}` | ''}` | `/balance${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/chains${`?${string}` | `#${string}` | ''}` | `/chains${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/console${`?${string}` | `#${string}` | ''}` | `/console${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/balance` | `/balance`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/chains` | `/chains`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/console` | `/console`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | `/+not-found` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
    }
  }
}
