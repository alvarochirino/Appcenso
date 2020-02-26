
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Splash from './splash'
import Login from './login/containers/login'
import Register from './login/containers/register'
import AppViewContainer from './modules/AppViewContainer'
import AppViewInvitadoContainer from './modules/AppViewInvitadoContainer'
import ViewMiMunicipio from './modules/miMunicipio/viewMiMunicipio'
import ViewReporte from './modules/reporte/ViewReporte'
import ViewReporteMedioAmbiente from './modules/reporte/ViewReporteMedioAmbiente'
import ViewVendeCiudad from './modules/vendeCiudad/viewVendeCiudad'
import ViewMisImpuestos from './modules/misImpuestos/viewMisImpuestos'
import ViewMisInmuebles from './modules/misInmuebles/viewMisInmuebles'
import ViewMisTramites from './modules/misTramites/viewMisTramites'
import ViewTransportePub from './modules/transportePub/viewTransportePub'
import ViewVideos from './modules/ViewVideos'

const MainNavigator = createStackNavigator(
   {
      Splash: {
         screen: Splash,
      },
      Login: {
         screen: Login,
      },
      Registro: {
         screen: Register,
      },
      Home: {
         screen: AppViewContainer,
      },
      HomeInvitado: {
         screen: AppViewInvitadoContainer,
      },
      MiMunicipio: {
         screen: ViewMiMunicipio
      },
      VendeCiudad: {
         screen: ViewVendeCiudad
      },
      NuestrasObras: {
         screen: ViewReporte
      },
      MedioAmbiente: {
         screen: ViewReporteMedioAmbiente
      },
      MisImpuestos: {
         screen: ViewMisImpuestos
      },
      MisTramites: {
         screen: ViewMisTramites
      },
      MisInmuebles: {
         screen: ViewMisInmuebles
      },
      MisInmuebles: {
         screen: ViewMisInmuebles
      },
      TransportePub: {
         screen: ViewTransportePub
      },
      ViewVideos
   },
   {
      initialRouteName: 'Splash',
      initialRouteParams: {
         municipio: 'YACUIBA'
      },
      mode: 'modal',//quita encabezado
      headerMode: 'none'
   }

);

const App = createAppContainer(MainNavigator);

export default App;
