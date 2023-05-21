import React,{useEffect, useState} from 'react'
import {Navbar, Table, Row, Col, Form, Container, Button, ButtonGroup} from "react-bootstrap"
import {useDispatch,useSelector} from "react-redux";
import { addUser, deleteUser, loadSingleUser, loadUsers, updateUser } from './redux/action';
import { toast } from 'react-toastify';
const initialState ={
    title:"",
    desc:""
}
const Home = () => {
    const[state,setState] = useState(initialState);
    const[editMode,setEditMode] = useState(false);
    const[userId,setUserId] = useState(null);
    const{title,desc}=state;
    const dispatch =useDispatch();
    const {users,msg,user} = useSelector(state => state.data);
    useEffect(()=>{
       if(msg){
        toast.success(msg);
       }
    },[msg]);
    useEffect(()=>{
        dispatch(loadUsers());
    },[]);
    useEffect(()=>{
        if(user){
            setState({...user});
        }
    },[user]);
const handleChange=(e)=>{
    let{name,value}=e.target;
    setState({...state,[name]:value});

};
const handleSubmit=(e)=>{
    e.preventDefault();
    if(!title || !desc){
        toast.error("Please Enter All Details");
    }else{
    if(!editMode){
        dispatch(addUser(state));
        setState({title:"",desc:""});
    }else{
        dispatch(updateUser(state,userId));
        setState({title:"",desc:""});
        setEditMode(false);
        setUserId(null);
    }
}
}
const handleDelete=(id)=>{
   if(window.confirm("Are you Sure???")){
        dispatch(deleteUser(id));
   }
}
const handleUpdate=(id)=>{
    dispatch(loadSingleUser(id));
    setUserId(id);
    setEditMode(true);
 }
  return (
    <>
    <Navbar bg="dark" variant="dark" className="justify-content-center">
      <Navbar.Brand>To-Do-List</Navbar.Brand>
    </Navbar>
    <Container style={{marginTop:"70px"}}>
        <Row>
            <Col md={4}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>
                            Title
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={title || ""}
                            onChange={handleChange} />
                          
                        
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>
                            Description
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Describe the task.."
                            name="desc"
                            value={desc || ""}
                            onChange={handleChange} />
                          
                        
                    </Form.Group>
                    <div className="d-grid gap-1 mt-2">
                        <Button type="submit" variant="dark" size="lg">
                           {editMode? "Update":"Add Task"}
                        </Button>
                    </div>
                </Form>
            </Col>
            <Col md={8}>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>
                                No.
                            </th>
                            <th>
                                Title
                            </th>
                            <th>
                                Description
                            </th>
                        </tr>
                    </thead>
                    {users && users.map((item,index)=>(
                        <tbody key={index}>
                            <tr>
                                <td>{index+1}</td>
                                <td>{item.title}</td>
                                <td>{item.desc}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button style={{marginRight:"5px"}} variant="danger"
                                        onClick={()=> handleDelete(item._id)}>
                                            Delete
                                        </Button>
                                        <Button style={{marginRight:"5px"}} variant="secondary"
                                        onClick={()=> handleUpdate(item._id)}>
                                            Update
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </Col>
        </Row>
    </Container>
    </>
    
  )
}

export default Home
