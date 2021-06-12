import React, {useReducer, useEffect, useState} from 'react'
import firebase from '../firebase'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField'

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
        {
            //alert('Kindly Fill all of the data correctly')
            console.log("complete the data")
        }
            else {
                firebase.database().ref('codeBase/' + state.code_title).set({
                    owner_name:state.owner_name,
                    owner_email:state.owner_email,
                    code_title:state.code_title,
                    code_url:state.code_url,
                    code_approach:state.code_approach,
                    code_text:state.code_text,
                    likes:0,
                    dislikes:0
                  }, function(error){
                      if(error)
                        alert("Code could not be saved." + error);
                      else
                      {
                        alert("Data saved successfully.");
                        window.location.reload();
                      }
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
            //console.log("complete the data")
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
    return (
        <div className='body'>
            <h2 className='head'>Put your and your code's details here...</h2>
            <form onSubmit={handleChange} className='form'>
                <div>
                <TextField
                error={(owner_name_status==='Accepted') ? false : true}
                name="owner_name" 
                placeholder="Owner's Name"
                onChange={validateNameChange}
                />
                {/* <label htmlFor="owner_name" 
                style={{marginLeft:'10px', color: (owner_name_status==='Accepted') ? 'green' : 'red'}}>
                    {owner_name_status}</label> */}
                </div>
                <br />

                <div>
                <TextField 
                error={(owner_email_status==='Accepted') ? false : true}
                name="owners_email" 
                placeholder="Owner's Email" 
                onChange={validateEmailChange} 
                />
                {/* <label htmlFor="owner_email" 
                style={{margin:'5px', color: (owner_email_status==='Accepted') ? 'green' : 'red'}}>
                    {owner_email_status}</label> */}
                </div>
                 <br />

                <div>
                <TextField 
                error={(code_title_status==='Accepted') ? false : true}
                name="code_title" 
                placeholder="Program Title"
                 onChange={validateCodeTitle} 
                />
                {/* <label htmlFor="code_title" 
                style={{margin:'5px', color: (code_title_status==='Accepted') ? 'green' : 'red'}}>
                    {code_title_status}</label> */}
                </div>
                <br />

                <div>
                <TextField 
                error={(code_url_status==='Accepted') ? false : true}
                name="code_url" 
                placeholder="URL of the Program"
                onChange={validateCodeUrl} 
                />
                {/* <label htmlFor="code_url" 
                style={{margin:'5px', color: (code_url_status==='Accepted') ? 'green' : 'red'}}>
                    {code_url_status}</label> */}
                </div>

                <br />

                <div>
                <textarea 
                className='textArea'
                name="code_approach" 
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
            </form>
        </div>
    )
}

export default Uploader
