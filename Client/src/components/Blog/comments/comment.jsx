import { useContext } from "react";

import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  {LoginContext}  from "../../ContextProvider/Context";
import axios from "axios";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600;
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {

    // const { account } = useContext(DataContext)
    const { logindata, setLoginData } = useContext(LoginContext);
    let token = localStorage.getItem("usersdatatoken");

    const removeComment = async () => {

        const id = comment._id;
        const res = await axios.delete(`http://localhost:8000/comment/delete/${comment._id}`, { 
            headers: {
                "Authorization": token
            }
        });

      if(res.status === 200){
       toast.success("The Comment was deleted successfully",{ autoClose: 2000});
       setToggle(prev => !prev);
       }
       else{
        toast.success("Error while deleting comment",{ autoClose: 2000});
       }

    }

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                { comment.name === logindata.ValidUserOne.fname && <DeleteIcon style={{cursor: 'pointer'}} onClick={() => removeComment()} color="error" /> }
                <ToastContainer/>
            </Container>
            <Typography>{comment.comments}</Typography>
        </Component>
    )
}

export default Comment;