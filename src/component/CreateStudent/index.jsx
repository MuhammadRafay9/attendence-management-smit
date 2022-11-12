import './index.css';
import { useState,useEffect  } from "react";
import { Button, Modal, Form ,Row,Col,Container,Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TimePicker from 'react-bootstrap-time-picker';
import axios from 'axios'; 
import {
    getFirestore, collection,
    addDoc, getDocs, doc,
    onSnapshot, query, serverTimestamp,
    orderBy, deleteDoc, updateDoc, where

} from "firebase/firestore";

import { getAuth } from 'firebase/auth'



let CreateStudent = () => {

    const db = getFirestore();
    
    const [editing, setEditing] = useState({

    })

    const [Classes, setClasses] = useState([]);
    const [Students, setStudents] = useState([]);

    
   
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

            const qstudent = query(
                collection(db, "Students"),
                 orderBy("createdOn","desc")
            );


            unsubscribe = onSnapshot(qstudent, (querySnapshot) => {
                const studentss = [];

                querySnapshot.forEach((doc) => {
                  studentss.push({ id: doc.id, ...doc.data() });

                });

                setStudents(studentss);
            });

        }

        
        getRealtimeData();

        return () => {
            unsubscribe();
        }

    }, [])

    const saveStudent = async (e) => {
        // e.preventDefault();

        const auth = getAuth();

        const cloudinaryData = new FormData();
      cloudinaryData.append("file", file);
      cloudinaryData.append("upload_preset", "attendence");
      cloudinaryData.append("cloud_name", "dvrloic2m");
    //   console.log(cloudinaryData);

      axios.post(`https://api.cloudinary.com/v1_1/dvrloic2m/image/upload`,
        cloudinaryData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(async res => {
         
          try {

            const docRef = await addDoc(collection(db, "Students"), {
             
                name:name,
                fathername:fathername,
                rollnum:rollnum,
                contact:contact,
                cnic:cnic, 
                course: course,
                classId:classId,
             
                img: res?.data?.url,
                createdOn: serverTimestamp(),
            });
            console.log("Document written with ID: ", docRef.id);

          } catch (e) {
            console.error("Error adding document: ", e);
          }


        })
        .catch(err => {
          console.log("from catch", err);
        })



        // console.log("postText: ", postText);

        // try {

        //             const docRef = await addDoc(collection(db, "Students"), {
                        
        //                 name:name,
        //                 fathername:fathername,
        //                 rollnum:rollnum,
        //                 contact:contact,
        //                 cnic:cnic, 
        //                 course: course,
        //                 classId:classId,
        //                 createdOn: serverTimestamp(),
        //             });
        //             console.log("Document written with ID: ", docRef.id);

        //         } catch (e) {
        //             console.error("Error adding document: ", e);
        //         }


            }

            const deleteClass = async (classId) => {


                await deleteDoc(doc(db, "Students", classId));

            }

            const updateClass = async (e) => {
                e.preventDefault();

                const auth = getAuth();

                const cloudinaryData = new FormData();
              cloudinaryData.append("file", file);
              cloudinaryData.append("upload_preset", "attendence");
              cloudinaryData.append("cloud_name", "dvrloic2m");
            //   console.log(cloudinaryData);
        
              axios.post(`https://api.cloudinary.com/v1_1/dvrloic2m/image/upload`,
                cloudinaryData,
                {
                  headers: { 'Content-Type': 'multipart/form-data' }
                })
                .then(async res => {
                    try {      
                await updateDoc(doc(db, "Students", id), {
                    name:name,
                    fathername:fathername,
                    rollnum:rollnum,
                    contact:contact,
                    cnic:cnic, 
                    course: course,
                    classId:classId,
                    img: res?.data?.url,

                });
            } catch (e) {
                console.error("Error adding document: ", e);
              }
    
                setid(false)
                setname();
                setfathername();
                setrollnum();
                setcontact();
                setcnic();
                setcourse();
                setclassId();
            })
            .catch(err => {
              console.log("from catch", err);
            })
            }


           //(Object.keys(editing).length !== 0 )?setShowe():setShowe();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ehandleClose = () => setid(false);
    // const ehandleShow = () => setShowe(true);

    return  <Row>
    <Row className='buttonrow'>
    <Col xs={2}d>


        <Button  size="sm" variant="primary"  onClick={handleShow}>
           Add student
        </Button>
       </Col>
    </Row>

    <Row>

       <Col>
       <Table striped>
      <thead>
        <tr>
          <th>name </th>
          <th>fathername</th>
          <th>rollnum</th>
          <th>contact</th>
          <th>cnic </th>
          <th>Course </th>
          <th>Class </th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

      {Students.map((everyStudent, i) => (

        <tr key={i}>
            <td>{everyStudent?.name}</td>
            <td>{everyStudent?.fathername}</td>
            <td>{everyStudent?.rollnum}</td>
            <td>{everyStudent?.contact}</td>
            <td>{everyStudent?.cnic}</td>
            <td>{everyStudent?.course}</td>
            <td>{everyStudent?.classId}</td>
            <td className='mfooter'><Button  size="sm" variant="danger" onClick={() => {

deleteClass(everyStudent?.id)

}}>
           Delete
        </Button>
        <Button  size="sm" variant="primary" onClick={
        () => {

                setid(everyStudent?.id)
                setname(everyStudent?.name)
                setfathername(everyStudent?.fathername)
                setrollnum(everyStudent?.rollnum)
                setcontact(everyStudent?.contact)
                setcnic(everyStudent?.cnic) 
                setcourse(everyStudent?.course)
                setclassId(everyStudent?.classId)
            
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
                <Modal.Title>Add student form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                   
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>name </Form.Label>
                        <Form.Control type="text" onChange={(e) => { setname(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>father name</Form.Label>
                        <Form.Control type="text" onChange={(e) => { setfathername(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>rollnum </Form.Label>
                        <Form.Control type="text" onChange={(e) => { setrollnum(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>contact Number</Form.Label>
                        <Form.Control type="number" onChange={(e) => { setcontact(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Course name</Form.Label>

                        <Form.Select aria-label="Default select example"  onChange={(e) => { setcourse(e.target.value) }}>
                        <option  value="">Select Course</option>
                           
                           <option  value="Web And mobile">Web And mobile</option>
                           <option value="Ai" >Ai</option>
                       </Form.Select>
                        <Form.Label>Class</Form.Label>
                        <Form.Select aria-label="Default select example"  onChange={(e) => { setclassId(e.target.value) }}>
                        <option  value="">Select Class</option>
                        
                        {Classes.map((everyC, i) => (

                           <>
                           <option  value={everyC?.id}>{everyC?.teacher}</option>
                           </>
                           
                           ))}
                           </Form.Select>
                        {/* <Form.Control type="text" onChange={(e) => { setclassId(e.target.value) }} /> */}

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>cnic </Form.Label>
                        <Form.Control type="number" onChange={(e) => { setcnic(e.target.value) }} />
                    </Form.Group>
                    <Form.Control
          type="file"
          onChange={(e) => {
            console.log(e.currentTarget.files[0])

            setFile(e.currentTarget.files[0])
          }}
        />
                </Form>
            </Modal.Body>
            <Modal.Footer className='mfooter'>
                <Button  size="sm" variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button  size="sm" variant="primary" onClick={saveStudent}>
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
                        <Form.Label>name Name</Form.Label>
                        {/* <Form.Control type="hidden" value={editing?.id}  onChange={(e) => { setid(e.target.value) }}/> */}
                        <Form.Control type="text" value={name} onChange={(e) => { setname(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>fathername name</Form.Label>
                        <Form.Control type="text" value={fathername} onChange={(e) => { setfathername(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>rollnum Name</Form.Label>
                        <Form.Control type="text" value={rollnum} onChange={(e) => { setrollnum(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>contact Number</Form.Label>
                        <Form.Control type="text" value={contact} onChange={(e) => { setcontact(e.target.value) }}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Course name</Form.Label>

                        <Form.Select aria-label="Default select example"  onChange={(e) => { setcourse(e.target.value) }}>
                        <option  value="">Select Course</option>
                           
                           <option  value="Web And mobile">Web And mobile</option>
                           <option value="Ai" >Ai</option>
                       </Form.Select>
                        <Form.Label>Class</Form.Label>

                        <Form.Select aria-label="Default select example"  onChange={(e) => { setclassId(e.target.value) }}>
                        <option  value="">Select Class</option>
                        {Classes.map((everyC, i) => (

                           <>
                           <option  value={everyC?.id}>{everyC?.teacher}</option>
                           </>
                           
                           ))}
                           </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>cnic of classes</Form.Label>
                        <Form.Control type="text"  value={cnic} onChange={(e) => { setcnic(e.target.value) }} />
                    </Form.Group>
                    <Form.Control
          type="file"
          onChange={(e) => {
            console.log(e.currentTarget.files[0])

            setFile(e.currentTarget.files[0])
          }}
        />
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
  </Row>


       ;

}


export default CreateStudent;