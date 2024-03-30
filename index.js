// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';
// import {AuthProvider} from './src/context/AuthContext';
// import {AxiosProvider} from './src/context/AxiosContext';
// import React from 'react';
// import { RecoilRoot } from "recoil";
// const Root = () => {
//   return (
//     // <AuthProvider>
//     //   <AxiosProvider>
//       <RecoilRoot>
//         <App />
      
//       </RecoilRoot>
//       {/* </AxiosProvider>
//     </AuthProvider> */}
//   );
// };
// AppRegistry.registerComponent(appName, () => Root);

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
