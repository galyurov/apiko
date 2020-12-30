import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
firebase.initializeApp({
  apiKey: "AIzaSyCNmIaVwM4zmcjfnkI23eVc11zmu-bffX4",
  authDomain: "apiko-test.firebaseapp.com",
  projectId: "apiko-test",
  storageBucket: "apiko-test.appspot.com",
  messagingSenderId: "959912669605",
  appId: "1:959912669605:web:89ee905ff79564486b784c",
  measurementId: "G-S6HSW7LXE7"
})

let app

firebase.auth().onAuthStateChanged(()=>{
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


