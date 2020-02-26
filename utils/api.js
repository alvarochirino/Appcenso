import { Alert } from 'react-native';

//const BASE_API = 'http://190.186.45.226/blog/public/api/';
//const BASE_API = 'http://132.255.70.43/blog/public/api/';
const BASE_API = 'http://132.255.70.43/smapp_yc/public/api/';

class Api {
   async getInstituciones(id) {
      try {
         let response = await fetch(`${BASE_API}institucion/${id}`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async getTiposInstituciones() {
      try {
         let response = await fetch(`${BASE_API}tipo`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async getImagenCampaña() {
      try {
         let response = await fetch(`${BASE_API}campania`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         Alert.alert('No se pudo recuperar las imagenes, compruebe su conexión a internet')
         //return [];
      }
   }

   async getPreguntas(idUsuario) {
      try {
         let response = await fetch(`${BASE_API}pregunta/${idUsuario}`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async getRespuestas(id) {
      try {
         let response = await fetch(`${BASE_API}respuesta/${id}`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   registroUsuario(nombre, correo, contraseña) {
      return fetch(`${BASE_API}register`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: nombre,
            email: correo,
            password: contraseña,
         })
      })
         .then((response) => response.json())
         .catch((error) => {
            console.error(error);
         });
   }

   login(correo, contraseña) {
      return fetch(`${BASE_API}auth/login`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            email: correo,
            password: contraseña,
         })
      })
         .then((response) => response.json())
         .catch((error) => {
            console.error(error);
         });
   }

   logout(token) {
      return fetch(`${BASE_API}auth/logout`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            token: token,
         })
      })
         .then((response) => response.json())
         .catch((error) => {
            console.error(error);
         });
   }

   me(token) {
      return fetch(`${BASE_API}auth/me`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            token: token,
         })
      })
         .then((response) => response.json())
         .catch((error) => {
            console.error(error);
         });
   }

   async buscarRubro(palabra) {
      try {
         let response = await fetch(`${BASE_API}buscarRubro/${palabra}`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async buscarActividad(palabra) {
      try {
         let response = await fetch(`${BASE_API}buscarActividad/${palabra}`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async buscarDemas(palabra) {
      try {
         let response = await fetch(`${BASE_API}buscarDemas/${palabra}`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async buscarPorNombre(palabra) {
      try {
         let response = await fetch(`${BASE_API}buscarPorNombre/${palabra}`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async buscarPorActividad(palabra) {
      try {
         let response = await fetch(`${BASE_API}buscarPorActividad/${palabra}`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async buscarPorRubro(palabra) {
      try {
         let response = await fetch(`${BASE_API}buscarPorRubro/${palabra}`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async getTipoProblema() {
      try {
         let response = await fetch(`${BASE_API}tipoProblema`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async getTipoProblemaAmbiental() {
      try {
         let response = await fetch(`${BASE_API}tipoProblemaAmbiental`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async getTipoTramite() {
      try {
         let response = await fetch(`${BASE_API}tipoTramite`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async getRequisito(id) {
      try {
         let response = await fetch(`${BASE_API}requisito/${id}`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   guardarReporte(comentario, latitud, longitud, imagen1, imagen2, imagen3, idUsuario, idTipoProblema, idDireccion) {
      console.log(imagen1);
      return fetch(`${BASE_API}guardarReporte`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            comentario: comentario,
            latitud: latitud,
            longitud: longitud,
            imagen1: imagen1,
            imagen2: imagen2,
            imagen3: imagen3,
            id_usuario: idUsuario,
            id_tipo_problema: idTipoProblema,
            id_direccion: idDireccion
         })
      })
         .then((response) => response.json())
         .catch((error) => {
            console.error(error);
         });
   }

   validarImpuesto(codigo, ci, tipo) {
      return fetch(`${BASE_API}validarImpuesto`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            codigo: codigo,
            ci: ci,
            tipo: tipo,
         })
      })
         .then((response) => response.json())
         .catch((error) => {
            console.error(error);
         });
   }

   async getEstados() {
      try {
         let response = await fetch(`${BASE_API}mostrarEstados`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   async getInformacion(codigo, estado) {
      return fetch(`${BASE_API}mostrarInfo`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            codigo: codigo,
            estado: estado,
         })
      })
         .then((response) => response.json())
         .catch((error) => {
            console.error(error);
         });
   }

   validarTramite(numeroTramite, codigo) {
      return fetch(`${BASE_API}validarTramite`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            numero: numeroTramite,
            codigo: codigo,
         })
      })
         .then((response) => response.json())
         .catch((error) => {
            console.error(error);
         });
   }

   guardarParticipacion(id_usuario, id_pregunta) {
      return fetch(`${BASE_API}guardarParticipacion`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            id_usuario: id_usuario,
            id_pregunta: id_pregunta,
         })
      })
         .then((response) => response.json())
         .catch((error) => {
            console.error(error);
         });
   }

   aumentar(id) {
      return fetch(`${BASE_API}aumentar/${id}`)
         .then((response) => response.json())
         .catch((error) => {
            console.error(error);
         });
   }


   async getBotons() {
      try {
         let response = await fetch(`${BASE_API}boton`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.error(error);
      }
   }

   validarInmueble(idRuat, ci) {
      return fetch(`${BASE_API}validarInmueble`, {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            id: idRuat,
            ci: ci,
         })
      })
         .then((response) => response.json())
         .catch((error) => {
            console.error(error);
         });
   }

   async getTransportePub() {
      try {
         let response = await fetch(`${BASE_API}transporte`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         Alert.alert('No se pudo recuperar las lineas de transp., compruebe su conexión a internet')
         return [];
      }
   }

   async usuarioActivo(id) {
      try {
         let response = await fetch(`${BASE_API}activo/${id}`);
         let responseJson = await response.json();
         return responseJson;
      } catch (error) {
         console.log(error);
         return null;
      }
   }

}

export default new Api();