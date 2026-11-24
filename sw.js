// DCSO Employee Portal
// Firebase Push Notification Service Worker

importScripts(
  "https://www.gstatic.com/firebasejs/13.4.0/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/13.4.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBs2UCLz6dl0kA40PYEhVUG99o1mcOMZns",
  authDomain: "dcso-employee-portal.firebaseapp.com",
  projectId: "dcso-employee-portal",
  storageBucket: "dcso-employee-portal.firebasestorage.app",
  messagingSenderId: "728564434593",
  appId: "1:728564434593:web:d71e230301450b919412e0"
});

const PORTAL_URL =
  "https://dcso-employee-portal.github.io/dcso-employee-portal-v4/index.html";

self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    self.clients.openWindow(PORTAL_URL)
  );
});

const messaging = firebase.messaging();

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

messaging.onBackgroundMessage(payload => {

  // Notification payloads are displayed by Firebase.
  // Avoid displaying a duplicate notification.
  if (payload.notification) return;

  return self.registration.showNotification(
    "DCSO Employee Portal",
    {
      body: "You have an item requiring your attention. Open the Employee Portal to review.",
      icon: "./icon-512.png",
      badge: "./icon-512.png",
      tag: "dcso-supervisor-notification"
    }
  );

});
