import './index.css';
import { useState,useEffect  } from "react";
import { Button, Modal, Form ,Row,Col,Container,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimePicker from 'react-bootstrap-time-picker';

import {
    getFirestore, collection,
    addDoc, getDocs, doc,
    onSnapshot, query, serverTimestamp,
    orderBy, deleteDoc, updateDoc, where

} from "firebase/firestore";

import { getAuth } from 'firebase/auth'



let ClassCreate = () => {

    const db = getFirestore();
    
    const [editing, setEditing] = useState({

    })

    console.log('abc ',editing);
    const [Classes, setClasses] = useState([]);

    
    const [file, setFile] = useState(null);
    const [show, setShow] = useState(false);
    const [showe, setShowe] = useState(false);
    const [id, setid] = useState("");

    const [teacher, setteacher] = useState("");
    const [section, setsection] = useState("");
    const [course, setcourse] = useState("");
    const [batch, setbatch] = useState("");
    const [schedule, setschedule] = useState("");
    const [startTime, setstartTime] = useState("");
    const [endTime, setendTime] = useState("");
   
    useEffect(() => {

        const auth = getAuth();

        let unsubscribe = null;
        const getRealtimeData = async () => {

            const q = query(
                collection(db, "Classes"),
                 orderBy("createdOn","desc")
            );


            unsubscribe = onSnapshot(q, (querySnapshot) => {
                const classsche = [];

                querySnapshot.forEach((doc) => {
                  classsche.push({ id: doc.id, ...doc.data() });

                });

                setClasses(classsche);
            });

        }
        getRealtimeData();

        return () => {
            unsubscribe();
        }

    }, [])

console.log(course)
    const saveClass = async (e) => {
        // e.preventDefault();
        const auth = getAuth();

        // console.log("postText: ", postText);

        try {

                    const docRef = await addDoc(collection(db, "Classes"), {
                        
                        teacher:teacher,
                        section:section,
                        course:course,
                        batch:batch,
                        schedule:schedule, 
                        startTime: startTime,
                        endTime:endTime,
                        createdOn: serverTimestamp(),
                    });
                    console.log("Document written with ID: ", docRef.id);

                } catch (e) {
                    console.error("Error adding document: ", e);
                }


            }

            const deleteClass = async (classId) => {


                await deleteDoc(doc(db, "Classes", classId));

            }

            const updateClass = async (e) => {
                e.preventDefault();

                await updateDoc(doc(db, "Classes", id), {
                    teacher:teacher,
                    section:section,
                    course:course,
                    batch:batch,
                    schedule:schedule, 
                    startTime: startTime,
                    endTime:endTime,
                });
                setid(false)
                setteacher();
                setsection();
                setcourse();
                setbatch();
                setschedule();
                setstartTime();
                setendTime();
            }


           //(Object.keys(editing).length !== 0 )?setShowe():setShowe();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ehandleClose = () => setid(false);
    // const ehandleShow = () => setShowe(true);

    return  <Container>
    <Row className='buttonrow'>
      <Col xs={2}d>

        <Button  size="sm" variant="primary" onClick={handleShow}>
           Add Class
        </Button>
       </Col>
    </Row>

    <Row>

       <Col>
       <Table striped>
      <thead>
        <tr>
          <th>Teacher Name</th>
          <th>Course</th>
          <th>Batch</th>
          <th>Section</th>
          <th>Class Schedule</th>
          <th>Timing</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

      {Classes.map((everyClass, i) => (

        <tr key={i}>
            <td>{everyClass?.teacher}</td>
            <td>{everyClass?.course}</td>
            <td>{everyClass?.batch}</td>
            <td>{everyClass?.section}</td>
            <td>{everyClass?.schedule}</td>
            <td>{everyClass?.startTime} - {  everyClass.endTime}</td>
            <td className='mfooter'><Button  size="sm" variant="danger" onClick={() => {

deleteClass(everyClass?.id)

}}>
           Delete
        </Button>
        <Button  size="sm" variant="primary" onClick={
        () => {

                setid(everyClass?.id)
                setteacher(everyClass?.teacher)
                setsection(everyClass?.section)
                setcourse(everyClass?.course)
                setbatch(everyClass?.batch)
                setschedule(everyClass?.schedule) 
                setstartTime(everyClass?.startTime)
                setendTime(everyClass?.endTime)
            
        }
        
        }>
          edit
        </Button></td>
        </tr>
        ))}
      </tbody>
    </Table>
       </Col>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add class form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                   
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Teacher Name</Form.Label>
                        <Form.Control type="text" onChange={(e) => { setteacher(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Section name</Form.Label>
                        <Form.Control type="text" onChange={(e) => { setsection(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Course Name</Form.Label>

                        <Form.Select aria-label="Default select example"  onChange={(e) => { setcourse(e.target.value) }}>
                           
                            <option value="Web And mobile">Web And mobile</option>
                            <option value="Ai">Ai</option>
                        </Form.Select>
                        {/* <Form.Control type="text" onChange={(e) => { setcourse(e.target.value) }}/> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Batch Number</Form.Label>
                        <Form.Control type="text" onChange={(e) => { setbatch(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>start time</Form.Label>

                        <Form.Control type="number" onChange={(e) => { setstartTime(e.target.value) }} />
                        <Form.Label>end time</Form.Label>

                        <Form.Control type="number" onChange={(e) => { setendTime(e.target.value) }} />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Schedule of classes</Form.Label>
                        <Form.Control type="text" onChange={(e) => { setschedule(e.target.value) }} />
                    </Form.Group>
            
                </Form>
            </Modal.Body>
            <Modal.Footer className='mfooter'>
                <Button  size="sm" variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button  size="sm" variant="primary" onClick={saveClass}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    

        <Modal show={(id)?true:false} onHide={ehandleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit class form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

              
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Teacher Name</Form.Label>
                        {/* <Form.Control type="hidden" value={editing?.id}  onChange={(e) => { setid(e.target.value) }}/> */}
                        <Form.Control type="text" value={teacher} onChange={(e) => { setteacher(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Section name</Form.Label>
                        <Form.Control type="text" value={section} onChange={(e) => { setsection(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Select aria-label="Default select example"  onChange={(e) => { setcourse(e.target.value) }}>
                           
                           <option  value="Web And mobile">Web And mobile</option>
                           <option value="Ai" >Ai</option>
                       </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Batch Number</Form.Label>
                        <Form.Control type="text" value={batch} onChange={(e) => { setbatch(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>start time</Form.Label>

                        <Form.Control type="number" value={startTime} onChange={(e) => { setstartTime(e.target.value) }} />
                        <Form.Label>end time</Form.Label>

                        <Form.Control type="number" value={endTime} onChange={(e) => { setendTime(e.target.value) }} />

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Schedule of classes</Form.Label>
                        <Form.Control type="text"  value={schedule} onChange={(e) => { setschedule(e.target.value) }} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className='mfooter'>
                <Button  size="sm" variant="secondary" onClick={ehandleClose}>
                    Close
                </Button>
                <Button  size="sm" variant="primary" onClick={updateClass}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>


    </Row>
  </Container>


       ;

}


export default ClassCreate;