import React, {useReducer, useEffect, useState} from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField'

import BackspaceIcon from '@material-ui/icons/Backspace';

import Typography from '@material-ui/core/Typography';

import '../MyCSS/myStyleSheet.css'

const intialState = {
    owner_name:'',
    owner_email:'',
    code_title:'',
    code_url:'',
    code_approach:'',
    code_text:''

}
const reducer = (state, action) =>{
    switch(action.type)
    {
        case 'HANDLE_CHANGE':
            return { 
                owner_name:action.owner_name,
                owner_email:action.owner_email,
                code_title:action.code_title,
                code_url:action.code_url,
                code_approach:action.code_approach,
                code_text:action.code_text
            }
        case 'CLEAR_FIELDS':
            return {
                intialState
            }
        default:
            return state
    }
}
function getTime()
{
    const currentDate = new Date();

    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();

    const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

    return dateString;
}
function Uploader() {
    //validator states
    const [owner_name_status, setOwnerNameStatus] = useState('')
    const [owner_email_status, setOwnerEmailStatus] = useState('')
    const [code_title_status, setCodeTitleStatus] = useState('')
    const [code_url_status, setCodeUrlStatus] = useState('')
    const [code_approach_status, setCodeApproachStatus] = useState('')
    const [code_text_status, setCodeTextStatus] = useState('')


    //reducer for state changes of user and code data
    const [state, dispatch] = useReducer(reducer, intialState)
    //sending data to DB
    useEffect(()=>{
        if(owner_name_status !== 'Accepted' || owner_email_status !== 'Accepted' || code_title_status !=='Accepted' ||
        code_url_status !== 'Accepted' || code_approach_status !== 'Accepted' || code_text_status !== 'Accepted')
        {}
        else if(document.getElementById('owner_name').value === '' ||
        document.getElementById('owner_email').value === '' ||
        document.getElementById('code_title').value === ''||
        document.getElementById('code_url').value === ''||
        document.getElementById('code_approach').value === ''||
        document.getElementById('code_text').value === ''
        ){}
            else {
                axios.post('https://codebase034.herokuapp.com/upload/', {
                    owner_name : state.owner_name,
                    owner_email : state.owner_email,
                    code_title : state.code_title,
                    code_url : state.code_url,
                    code_approach : state.code_approach,
                    code_text : state.code_text,
                    time : getTime()
                  })
                  .then(function (response) {
                    alert("Data saved successfully.");
                    window.location.reload();
                  })
                  .catch((error)=>{
                    alert("Code could not be saved." + error);
                  });
            }

            
    },[state])

    //handling the submit button
    const handleChange = (event) =>{
        event.preventDefault();
        if(owner_name_status !== 'Accepted' || owner_email_status !== 'Accepted' || code_title_status !=='Accepted' ||
        code_url_status !== 'Accepted' || code_approach_status !== 'Accepted' || code_text_status !== 'Accepted')
        {
            alert('Kindly Fill all of the data correctly')
        }
        else
            dispatch({type:'HANDLE_CHANGE', owner_name:event.target[0].value,
                                        owner_email:event.target[1].value,
                                        code_title:event.target[2].value,
                                        code_url:event.target[3].value,
                                        code_approach:event.target[4].value,
                                        code_text:event.target[5].value
                                    })
    }
    //validating Owner Name
    const validateNameChange = (event) =>{
        if(event.target.value.length <= 5)
            setOwnerNameStatus('Try Again')
        else
            setOwnerNameStatus('Accepted')
    }
    //validating owner Email
    const validateEmailChange = (event) =>{
        let re = /\S+@\S+\.\S+/;
        if(re.test(event.target.value) === false)
            setOwnerEmailStatus('Try Again')
        else
            setOwnerEmailStatus('Accepted')
    }
    //validating code title
    const validateCodeTitle = (event) =>{
        if(event.target.value.length === 0)
            setCodeTitleStatus('Try Again')
        else
            setCodeTitleStatus('Accepted')
    }
    //validating code URL
    const validateCodeUrl = (event) =>{
        if(event.target.value.length === 0)
            setCodeUrlStatus('Try Again')
        else
            setCodeUrlStatus('Accepted')
    }
    //validating code approach
    const validateCodeApproach = (event) =>{
        if(event.target.value.length === 0)
            setCodeApproachStatus('Try Again')
        else
            setCodeApproachStatus('Accepted')
    }
    //validating code text
    const validateCodeText = (event) =>{
        if(event.target.value.length === 0)
            setCodeTextStatus('Try Again')
        else
            setCodeTextStatus('Accepted')
    }

    //fetch data for editing
    const fetchData = (event) =>{
        let code_title = document.getElementById('code_title').value;
        axios.post('https://codebase034.herokuapp.com/fetch/', {
            code_title: code_title
        })
        .then((res)=>{
                if(res.data !== null){
                    document.getElementById('owner_name').value = res.data.owner_name;
                    document.getElementById('owner_email').value = res.data.owner_email;
                    document.getElementById('code_title').value = res.data.code_title;
                    document.getElementById('code_url').value = res.data.code_url;
                    document.getElementById('code_approach').value = res.data.code_approach;
                    document.getElementById('code_text').value = res.data.code_text;
    
                    setOwnerNameStatus('Accepted');
                    setOwnerEmailStatus('Accepted');
                    setCodeTitleStatus('Accepted');
                    setCodeUrlStatus('Accepted');
                    setCodeApproachStatus('Accepted');
                    setCodeTextStatus('Accepted');
                }
                else{
                    alert('Program Title Should be exactly same, Try again')
                }
        })
        .catch((error) => {
            alert('Some Error Occured, Please Try Again')
        });
    }

    const clearData = () =>{
                document.getElementById('owner_name').value = '';
                document.getElementById('owner_email').value = '';
                document.getElementById('code_title').value = '';
                document.getElementById('code_url').value = '';
                document.getElementById('code_approach').value = '';
                document.getElementById('code_text').value = '';

                setOwnerNameStatus('');
                setOwnerEmailStatus('');
                setCodeTitleStatus('');
                setCodeUrlStatus('');
                setCodeApproachStatus('');
                setCodeTextStatus('');
    }
    return (
        <div className='body'>
            <h2 className='head'>Put your and your code's details here...</h2>
            <form onSubmit={handleChange} className='form'>
                <div>
                <TextField
                error={(owner_name_status==='Accepted') ? false : true}
                name="owner_name" 
                id="owner_name"
                placeholder="Owner's Name"
                onChange={validateNameChange}
                />
                </div>
                <br />

                <div>
                <TextField 
                error={(owner_email_status==='Accepted') ? false : true}
                name="owners_email" 
                id="owner_email"
                placeholder="Owner's Email" 
                onChange={validateEmailChange} 
                />
                </div>
                 <br />

                <div>
                <TextField 
                error={(code_title_status==='Accepted') ? false : true}
                name="code_title" 
                id="code_title"
                placeholder="Program Title"
                 onChange={validateCodeTitle} 
                />
                </div>
                <br />

                <div>
                <TextField 
                error={(code_url_status==='Accepted') ? false : true}
                name="code_url" 
                id="code_url"
                placeholder="URL of the Program"
                onChange={validateCodeUrl} 
                />
                </div>

                <br />

                <div>
                <textarea 
                className='textArea'
                name="code_approach" 
                id="code_approach"
                placeholder="What's the approach ?" 
                rows='10' cols='50'
                onChange={validateCodeApproach} 
                />
                </div>
                <label htmlFor="code_approach" 
                style={{margin:'5px', color: (code_approach_status==='Accepted') ? 'green' : 'red'}}>
                    {code_approach_status}</label>
                <br /> <br />

                <div>
                <textarea  
                className='textArea'
                name="code_text" 
                id="code_text"
                placeholder="Enter the Code here" 
                rows='20' cols='60'
                onChange={validateCodeText} 
                /> <br />
                <label htmlFor="code_text" 
                style={{margin:'5px', color: (code_text_status==='Accepted') ? 'green' : 'red'}}>
                    {code_text_status}</label>
                </div>

                <br />

                <Button startIcon={<CloudUploadIcon />} variant='contained' color='secondary' type="submit" >Upload</Button>
                &emsp;
                <Button startIcon={<EditIcon />} variant='contained' color='secondary' onClick={fetchData}>Fetch & Edit</Button>
                <br />
                <br />
                <Button startIcon={<BackspaceIcon />} variant='contained' color='secondary' onClick={clearData}>Clear All</Button>
                
            </form>

            <Typography component='p'>
                **For editing, Give the exact Program Title and Press the "Fetch using Title" button then make changes and then press "Upload" button.
            </Typography>
            
        </div>
    )
}

export default Uploader
