// import './index.css';
import { useState, useEffect } from "react";
import { Card, Button, Modal, Form, Row, Col, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimePicker from 'react-bootstrap-time-picker';
import {
    getFirestore, collection,
    addDoc, getDocs, doc,
    onSnapshot, query, serverTimestamp,
    orderBy, deleteDoc, updateDoc, where

} from "firebase/firestore";

import { getAuth } from 'firebase/auth'

function Idcard() {

    const [Classes, setClasses] = useState([]);
    const [std, setstd] = useState([]);
    const db = getFirestore();


    const [show, setShow] = useState(false);
    const [showe, setShowe] = useState(false);
    const [id, setid] = useState("");
    const [file, setFile] = useState(null);

    const [name, setname] = useState("");
    const [fathername, setfathername] = useState("");
    const [rollnum, setrollnum] = useState("");
    const [contact, setcontact] = useState("");
    const [cnic, setcnic] = useState("");
    const [course, setcourse] = useState("");
    const [classId, setclassId] = useState("");


    if(course)
    {

    }

    const auth = getAuth();

    useEffect(() => {


        let unsubscribe = null;
        const getRealtimeData = async () => {

            const q = query(
                collection(db, "Classes"),
                orderBy("createdOn", "desc")
            );


            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const classsche = [];

                querySnapshot.forEach((doc) => {
                    classsche.push({ id: doc.id, ...doc.data() });

                });

                setClasses(classsche);
            });

            // const qstudent = query(
            //     collection(db, "Students"),
            //      orderBy("createdOn","desc")
            // );


            // unsubscribe = onSnapshot(qstudent, (querySnapshot) => {
            //     const studentss = [];

            //     querySnapshot.forEach((doc) => {
            //       studentss.push({ id: doc.id, ...doc.data() });

            //     });

            //     setStudents(studentss);
            // });

        }


        getRealtimeData();

        return () => {
            unsubscribe();
        }

    }, [])


    const getStudent = async () => {

        // let q = collection("Students")
        // q = q.where("course",'=', course)
        // q = q.where("classId",'=', classId)
        const q = query(
            collection(db, "Students"),where("course",'==', course),where("classId",'==', 'y9ukcBvpZHUTQmaUsBmx'),where("rollnum",'==', rollnum)
      
        );


        
         onSnapshot(q, (querySnapshot) => {
            const st = [];

            querySnapshot.forEach((doc) => {
                st.push({ id: doc.id, ...doc.data() });

            });

            setstd(st);
        });
    }
    console.log(std)
    return (
        <>
            <Row>
              
                    <Col xs={12} md={5}> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

                        <Form.Label>Class name</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={(e) => { setclassId(e.target.value) }}>
                        <option  value="">Select Class</option>
                            
                            {Classes.map((everyC, i) => (

                                <>
                                    <option value={everyC?.id}>{everyC?.teacher}</option>
                                </>

                            ))}
                        </Form.Select>
                        {/* <Form.Control type="text" onChange={(e) => { setclassId(e.target.value) }} /> */}

                    </Form.Group></Col>
                    <Col xs={12} md={5}>
                        <Form.Label>Course name</Form.Label>

                        <Form.Select aria-label="Default select example" onChange={(e) => { setcourse(e.target.value) }}>
                        <option  value="">Select Course</option>

                            <option value="Web And mobile">Web And mobile</option>
                            <option value="Ai" >Ai</option>
                        </Form.Select>
                    </Col>
                    <Col xs={12} md={5}> <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

<Form.Label>Roll number</Form.Label>

<Form.Control type="text" onChange={(e) => { setrollnum(e.target.value) }} />

</Form.Group></Col>
                    <Col xs={12} md={2}>
                    <Button  size="sm" variant="primary" onClick={getStudent}>
                    submit
                </Button>
                    </Col>
            </Row>



                                

            {std.map((everyC, i) => (
            <Row>
                <Col sm={12} md={4}>



                </Col>
                <Col sm={12} md={4}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={everyC?.img} />
                        <Card.Body>
                        <Card.Title>Name :{everyC?.name}</Card.Title>
                        <Card.Title>Father Name : {everyC?.fathername}</Card.Title>
                            <Card.Title>Course :{everyC?.course}</Card.Title>
                          
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={4}></Col>

            </Row>
            ))}
        </>
    );
}

export default Idcard;