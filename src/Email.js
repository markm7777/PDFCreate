import React from 'react';
import ModalDialog from './ModelDialog.js';
import emailjs from 'emailjs-com';
import {useState} from 'react';
// import Email from './smtp.js';

emailjs.init("user_WZI82XO1qdsceNFZmtKd3");

function RDEmail(props) {

  const [toAddress, setToAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachmentFile, setAttachmentFile] = useState('');

  const handleToAddressChange = (e) => {
    setToAddress(e.target.value);
  }

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  }

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }
 
  const handleFileAttachment = (e) => {
    console.log(e.currentTarget.files)
    setAttachmentFile(e.currentTarget.files[0]);
  }


  const handleSendEmail = (e) => {
    e.preventDefault();
    
    props.handleCreatePDF();

    // EmailJS free version does not allow email attachments. $4.00 per month for that capability.
    emailjs.send('service_so8f8vh', 'template_ny70nfa',{to_name: 'Rob', from_name: 'Me', message: 'Please find the attached sewer inspection report.', attachment:'myfile'})
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    console.log(attachmentFile.name)  
    props.close();  
  }

  // const handleSendSMTPMail = () => {
  //   Email.send({
  //     Host : "smtp.elasticemail.com",
  //     Username : "mark.murphy7777@gmail.com",
  //     Password : "203E528EB3928C34370277DE638485F0409E",
  //     To : 'mark.murphy7777@gmail.com',
  //     From : "mark.murphy7777@gmail.com",
  //     Subject : "This is the subject",
  //     Body : "And this is the body",
  //     Attachments : [
  //       {
  //         name : "smtpjs.png",
  //         path:"C:/Users/Mark/Downloads/Profile.pdf"
  //       }]
    
  //   }).then(
  //   message => console.log(message)
  // );
//  }

  return ( 
    <ModalDialog>
      <div className='modal'>
        <div className='modal-content'>
          <p className='modal-p'>Send Report</p>
          <div className='inputGroup'>
            <div className='inputDiv'>
              <label className='modal-label'>To:</label>
              <input className='modal-input' onChange={handleToAddressChange}></input>
            </div>  
            <div className='inputDiv'>
              <label className='modal-label'>Subject: </label>
              <input className='modal-input' onChange={handleSubjectChange}></input>
            </div>  
            <div className='inputDiv'>
              <label className='modal-label'>Message: </label>
              <textarea className='modal-input' id='message' onChange={handleMessageChange} rows="10" cols="30"></textarea>
            </div>  
            <div className='inputDiv'>
              <label className='modal-label'>Attachment: </label>
              {/* <input className='modal-input' readOnly={false} value={attachmentFile.name}></input> */}
              <input style={{marginTop: '5px'}} type='file' onChange={handleFileAttachment}/>
            </div>  
          </div>
          <div className='buttonGroup'>
            <button onClick={handleSendEmail}>Send Email</button>
            <button onClick={props.close}>Close</button>
          </div>
        </div>
      </div>
    </ModalDialog>  
  )



}

export default RDEmail;