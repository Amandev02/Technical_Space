import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import { LoginContext } from '../../ContextProvider/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { API } from '../../../service/api';

//components
import Comment from './comment';

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
    
`;

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

const StyledTextArea = styled()`
    height: 100px !important;
    width: 100% !important; 
    margin: 0 20px;
    padding: 10px 10px !important;
    
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png'
    let token = localStorage.getItem("usersdatatoken");
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState(["first"]);
    const [toggle, setToggle] = useState(false);
    const {logindata, setLoginData} = useContext(LoginContext);
    // const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async () => {
            const id = post._id;
            let response = await fetch(`https://technical-space-w69w.vercel.app/comments/${id}` ,{method: 'GET',headers:{ id : id ,"Content-Type": "application/json",
            "Authorization": token }});
             const data = await response.json();
             console.log(data);
            // const response = await API.getAllComments(post._id);
            if (response.ok) {
                setComments(data);
            }
        }
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        setComment({
            ...comment,
            name: logindata.ValidUserOne.fname,
            postId: post._id,
            date: new Date(),
            comments: e.target.value
        });
    }

    const addComment = async() => {
        const config = {
            headers: {
               "Content-Type": "application/json",
              "Authorization": token
            },
          };
          const body = {
           comment
          };

        await axios
        .post("https://technical-space-w69w.vercel.app/comment/new", comment, config)
        .then((res) => {
          toast.success("Comment Added Sucessfully",{ autoClose: 2000});
           console.log(res)
        })
        .catch((e) => {
          console.log(e);
          toast.error("Error in adding Comment")
          //alert("Error in adding post");
        });;

        setComment(initialValue)
        setToggle(prev => !prev);
    }
    
    return (
        <Box>
            <Container>
                <Avatar/>  
                <StyledTextArea 
                    rowsMin={5} 
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)} 
                    value={comment.comments}
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>   
                <ToastContainer/>          
            </Container>
            <Box>
                {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default Comments;