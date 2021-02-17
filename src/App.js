import React from 'react';
import './App.css';

import firestore from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializapp({
    apiKey: "AIzaSyBayygjB15k2CqqUFtT2gThP4AtG8BGkI8",
    authDomain: "fam-social-network.firebaseapp.com",
    projectId: "fam-social-network",
    storageBucket: "fam-social-network.appspot.com",
    messagingSenderId: "504682004059",
    appId: "1:504682004059:web:27e02fbb214f193f97497e",
    measurementId: "G-QBS9DN26TL"
})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">

      </header>

      <section>
        {user ? <ChatRoom /> : <Signin />}
      </section>

    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }


  return(
    <button onClick={signInWithGoogle}>Sign In with Google</button>
  )

}

function SignOut() {
  return auth.currentUser && (

    <button onClick={() => auth.signOut()}></button>
  )
}


function ChatRoom() {

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  
  const [messages] = useCollectionData(query, {idField: 'id'});

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>

      <div>

      </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;

  return <p>{text}</p>
}

export default App;
