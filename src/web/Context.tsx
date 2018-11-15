/**
 * @class AuthContext
 * @description provides global context such as instance of AuthClient
 */

import * as React from 'react';
import AuthClient from 'src/web/AuthClient';

export interface IContext {
  authClient?: AuthClient;
}

const Context = React.createContext<IContext>({});

export const { Provider, Consumer } = Context;

export function withContext(Component: React.SFC<any> | React.ComponentClass<any>): React.SFC<any> {
  return (props: any) => (
    <Consumer>
      {(context) => {
          return <Component {...props} context={context} />
      }}
    </Consumer>
  );
}
