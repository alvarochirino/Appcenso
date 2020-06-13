import {createStackNavigator, createAppContainer} from 'react-navigation';

import Splash from './splash';
import Login from './login/containers/login';
import Register from './login/containers/register';
import AppViewContainer from './modules/AppViewContainer';
import AppViewInvitadoContainer from './modules/AppViewInvitadoContainer';
import MiMunicipio from './modules/miMunicipio';
import ViewReporte from './modules/reporte/ViewReporte';
import ViewVendeCiudad from './modules/vendeCiudad/viewVendeCiudad';
import ViewMisImpuestos from './modules/misImpuestos/viewMisImpuestos';
import ViewMisInmuebles from './modules/misInmuebles/viewMisInmuebles';
import ViewMisTramites from './modules/misTramites/viewMisTramites';
import TransportePublico from './modules/transportePub';
import ViewVideos from './modules/ViewVideos';
import FichaEstudio from './modules/estudioSocioEcon';
import ControlSanitario from './modules/controlSanitario';
import Diagnostico from './modules/controlSanitario/Diagnostico';
import InfoEnfermedad from './modules/controlSanitario/InfoEnfermedad';

const MainNavigator = createStackNavigator (
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
      screen: MiMunicipio,
    },
    VendeCiudad: {
      screen: ViewVendeCiudad,
    },
    NuestrasObras: {
      screen: ViewReporte,
    },
    MisImpuestos: {
      screen: ViewMisImpuestos,
    },
    MisTramites: {
      screen: ViewMisTramites,
    },
    MisInmuebles: {
      screen: ViewMisInmuebles,
    },
    MisInmuebles: {
      screen: ViewMisInmuebles,
    },
    TransportePub: {
      screen: TransportePublico,
    },
    ViewVideos,
    FichaEstudio,
    ControlSanitario,
    Diagnostico,
    InfoEnfermedad
  },
  {
    initialRouteName: 'Splash',
    mode: 'modal', //quita encabezado
    headerMode: 'none',
  }
);

const App = createAppContainer (MainNavigator);

export default App;
