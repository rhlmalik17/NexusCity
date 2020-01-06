import * as firebase from 'firebase';
import firebaseConfig from '../config';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const signUpAndCreateUser = (full_name,email,username,password,props) =>{
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
      props.navigation.navigate('DashBoardScreen');
    })
    .catch(function(error){
        if(!error==="undefined is not an object (evaluating 'props.navigation.navigate')")
        alert(error+'\n Please try Again.');
    })
}

export const signInUser = (email,password,props) =>{
  firebase.auth().signInWithEmailAndPassword(email,password)
  .then(()=>{
    props.navigation.navigate('DashBoardScreen');
  })
  .catch(function(error) {
    // Handle Errors here.
    if(!error==="undefined is not an object (evaluating 'props.navigation.navigate')")
    alert(error);
    // ...
  });
}