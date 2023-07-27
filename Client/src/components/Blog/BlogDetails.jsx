import { useState, useEffect, useContext } from 'react';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { API } from '../../service/api';
// import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { LoginContext } from '../ContextProvider/Context'
import DeleteConfirmation from './DeleteConfirmation';
// import Header from '../header';
import Header from '../Header/header'
// components
import Comments from './comments/comments';
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

const DetailView = () => {
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    let token = localStorage.getItem("usersdatatoken");
    const [post, setPost] = useState({});
    const [fruitMessage, setFruitMessage] = useState(null);
    const {logindata, setLoginData} = useContext(LoginContext);
    // const { account } = useContext(LoginContext);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    useEffect(() => {
        console.log({logindata});

        const fetchData = async () => {
            // let response = await axios.get("https://technical-space-w69w.vercel.app//post/id");
            let response = await fetch('https://technical-space-w69w.vercel.app/post'+'/'+id ,{method: 'GET',headers:{ id : id || '' }});
            
            const data = await response.json();
            // console.log(data);
            if (data) {
                setPost(data);
                // console.log(post);
            }
        
        }
        fetchData();
    }, [id]);
    // console.log(id);
    // console.log(post._id);
    
    const showDeleteModal = () => {
       
        setDeleteMessage('Are you sure you want to delete this Blog ?');
       
        setDisplayConfirmationModal(true);
      };

        // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

    const deleteBlog = async () => {  

        const res = await axios.delete('https://technical-space-w69w.vercel.app/delete'+'/'+ id , { 
        headers: {
            "Authorization": token
        }
       
    });
        console.log(res);
        if(res.status === 200){
            toast.success("The Blog was deleted successfully",{ autoClose: 2000});
          
            // setFruitMessage('The Blog was deleted successfully.');
            setTimeout(() => {
                navigate('/blog')
            }, 2000)
           
        
       
        setDisplayConfirmationModal(false);
        }
        else{
            alert("UNABLE TO DELETE")
        }
        
    }

    return (
        <><Header/>
        <Container>
        
           <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={deleteBlog} hideModal={hideConfirmationModal} type={'post'} id={post._id} message={deleteMessage}  />
            <Image src={post.picture || url} alt="post" />{
            logindata.ValidUserOne&&post?
            <Box style={{ float: 'right' }}>
                {   
                    logindata.ValidUserOne.fname === post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon style={{padding: '0px', border: 'none'}} color="primary" /></Link>
                        {/* <DeleteIcon onClick={() => deleteBlog()} color="error" /> */}
                        <DeleteIcon style={{padding: '0px', border: 'none'}} onClick={() => showDeleteModal()} color="error" />
                        <ToastContainer />
                    </>
                }
            </Box>:''}
           
            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                </Link>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <Typography>{post.description}</Typography>
            <Comments post={post} />
        </Container>
        </>
    )
}

export default DetailView;