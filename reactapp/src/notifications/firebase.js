import firebase from "firebase";
export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "432001711439"
  });
};

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("Token:", token);

    return token;
  } catch (error) {
    console.error(error);
  }
};
