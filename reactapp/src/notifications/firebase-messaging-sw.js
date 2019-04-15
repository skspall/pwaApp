export const inicializarFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "432001711439"
  });
  navigator.serviceWorker.register("/my-sw.js").then(registration => {
    firebase.messaging().useServiceWorker(registration);
  });
};
