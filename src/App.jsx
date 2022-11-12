import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import CreateClass from './component/CreateClass';
import CreateStudent from './component/CreateStudent';
import IdCard from './component/IdCard';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {Nav,Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [isLogin, setIsLogin] = useState(false);

  
  useEffect(() => {

    const auth = getAuth();
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        const uid = user.uid;
        console.log("auth change: login", user);
        setIsLogin(true)

        console.log("auth.currentUser: ", auth.currentUser.displayName);
     

      } else {
        console.log("auth change: logout");
        // User is signed out
        setIsLogin(false)

      }
    });

    return () => {
      console.log("Cleanup function called")
      unSubscribe();
    }

  }, [])

  const logoutHandler = () => {

    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("signout successful");
    }).catch((error) => {
      // An error happened.
      console.log("signout failed");
    });

  }


  return (
    <Container >
      {
        (isLogin) ?

        <Row>
        <Nav
      activeKey="/"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
      <Nav.Link> <Link to={`/`}>Classes</Link></Nav.Link>
      </Nav.Item>
      <Nav.Item>
      <Nav.Link> <Link to={`/student`}>Student</Link></Nav.Link>
      </Nav.Item>

      <Nav.Item>
      <Nav.Link> <Link to={`/IdCard`}>Student Card</Link></Nav.Link>
      </Nav.Item> 
      <Nav.Item>
      <Nav.Link> <button    size="sm" variant="primary" onClick={logoutHandler}>Logout</button></Nav.Link>
      </Nav.Item>
     
    </Nav>
      </Row>
        
          :
          <Nav >
          </Nav>
      }

      {(isLogin) ?

        <Routes>
          <Route path="/" element={<CreateClass />} />
          <Route path="/student" element={<CreateStudent />} />
          <Route path="/IdCard" element={<IdCard />} />
         
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      }
    </Container>
  );
}

export default App;
