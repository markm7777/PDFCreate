import React from 'react';
import logo from './ROBERTDEYL_Logo02.jpg';
import './register-files';
import {useState, useEffect} from 'react';
import RDEmail from './Email.js';
import {useContext} from 'react';
import {sewerReportContext} from './SewerReportWithSplitPane.js';

const PDFDocument = require('pdfkit').default;
const blobStream = require('blob-stream');

const SewerReportInput = () => {
  // const [blob, setBlob] = useState('');
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('');
  const [findings, setFindings] = useState('');
  const [videos, setVideos] = useState(['']);
  const [recommendations, setRecommendations] = useState('');
  const [payment, setPayment] = useState('275.00');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [checkNo, setCheckNo] = useState('');
  const [sewerReplacementCost, setSewerReplacementCost] = useState('7000.00');
  const [showEmail, setShowEmail] = useState(false);

  const {setBlob} = useContext(sewerReportContext);

  const handleAddVideo = (i) => {
    setVideos([...videos, '']);
  }

  const handleDeleteVideo = (i) => {
    if (videos.length > 1) {
      let newArr = videos.filter((item, index) => index !== i)
      setVideos(newArr);
    }
  }

  const handleVideoChange = (e, index) => {
    let videoArr = [...videos];
    videoArr[index] = e.currentTarget.value;
    setVideos(videoArr);
  }

  const handleCreatePreview = () => {
    createBlob('');
  }

  const handleCreatePDF = () => {
    createBlob(`${date}-${customerName}.pdf`);
  }

  const handleOpenEmail = () => {
    setShowEmail(true);
  }

  const handleCloseEmail = () => {
    setShowEmail(false);
  }

  const handleClearForm = () => {
      setBlob('');
      setDate('');
      setCustomerName('');
      setAddress('');
      setCity('');
      setState('');
      setZip('');
      setFindings('');
      setVideos(['']);  
      setRecommendations('');
      setPayment('275.00');
      setPaymentMethod('cash');
      setCheckNo('');
      setSewerReplacementCost('7000.00');
  }

  useEffect(() => {
    let today = new Date();
    let date = today.getDate();
    date = date.toString().length === 1 ? ('0' + date) : date;
    let month = today.getMonth() + 1;
    month = month.toString().length === 1 ? ('0' + month) : month;
    setDate(`${today.getFullYear()}-${month}-${date}`);
  }, [])

  const saveData = (blob, fileName) => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
 
  const createBlob = (fileName) => {
    let doc = new PDFDocument();
    let stream = doc.pipe(blobStream());
  
    doc.font('Helvetica')

    doc
      .rect(6, 6, 600, 108)
      .lineWidth(4)
      .strokeColor('#0000FF')
      .stroke()

    doc
      .rect(8, 8, 596, 104)
      .fill('#AAAAAA')

    doc.image("images/ROBERTDEYL_Logo02.jpg", 10, 10, {
      fit: [100, 100],
      align: 'center',
      valign: 'center'
   });

    doc
      .fontSize(20)
      .fillColor('black')
      .text('Robert Deyl Plumbing, Inc.', 145, 15)
      .fontSize(12)
      .text('2551 Galena Avenue #1335, Simi Valley, CA 93062', 145, 45)
      .text('PH: (818) 606-4351 Email: robertdeylplumbing@gmail.com', 145, 60)
      .text('Website: ', 145, 75, {continued: true})
      .fillColor('blue')
      .text('www.robertdeylplumbing.com')
      .fillColor('black')
      .text('California State License No. 1020815', 145, 90)

    doc
      .font('Helvetica-Oblique')
      .fontSize(24)
      .text('Sewer Inspection Report', 190, 125)
      .font('Helvetica')

    let dateStr = date;
    let year = dateStr.slice(0,5);
    let reformattedDate = dateStr.substr(5, dateStr.length) + '-' + year.slice(0,4);

    doc
      .fontSize(14)
      .font('Helvetica-Oblique')
      .text(`Date: `, 430, 170, {continued: true})
      .font('Helvetica-Bold')
      .text(`${reformattedDate}`)

      .font('Helvetica-Oblique')
      .text(`Customer Name: `, 30, 190, {continued: true})
      .font('Helvetica-Bold')
      .text(`${customerName}`)
      
      .font('Helvetica-Oblique')
      .text(`Job Address: `, 52, 210, {continued: true})
      .font('Helvetica-Bold')        
      .text(`${address}`)
      .text(`${city}, ${state} ${zip}`, 138, 230)

    doc
      .font('Helvetica-Oblique')
      .text('The findings of this inspection are based on the opinion of the inspector and reflect the conditions discovered at the time of inspection only.  We cannot be held liable or responsible for whatever may happen after the inspection.  Any recommended repairs should be performed immediately in order to prevent possible property damage.', 30, 260, {width: 550})
      .text('Note: This inspection is for the sewer line specifically and does not cover any piping inside or under the house.', 30, 350, {width: 550})   
      .font('Helvetica')

    doc
      .fontSize(18)
      .text('Findings                                                                                        ',30, 400, {underline: true}) 

    doc
      .fontSize(12)
      .text(`${findings}`, 30, 430)

    doc
      .fontSize(10)
      .text('Robert Deyl Plumbing, Inc.', 30, 705)  
      .text('Page 1 of 2', 470, 705)  
  
    doc.addPage(); //////////////////////////////////////////////////////////////////////////////////////////

    doc
      .fontSize(18)
      .text('Videos*                                                                                         ',30, 50, {underline: true}) 

    let vPos = 80;
    videos.map((item, i) => {
      if (i !== 0) {
        vPos += doc.heightOfString(videos[i - 1], {width: 600}) + 5;
      }
      return(
        doc
        .fontSize(12)
        .fillColor('blue')
        .text(`${item}`, 30, vPos, {link:`${item}`, underline: true})
      )
    })
        
    doc
      .fillColor('black')
      .font('Helvetica-Oblique')
      .text('*The YouTube link(s) provided are set to “unlisted” for privacy.  (Only the person receiving the email link can view the video.  It will not show up in a YouTube search.)', 30, 165)
      .font('Helvetica')

    doc
      .fontSize(18)
      .text('Recommendations                                                                       ',30, 210, {underline: true}) 
      
    doc
      .fontSize(12)
      .text(`${recommendations}`, 30, 240)

    doc
      .font('Helvetica-Oblique')
      .text(`Note: If a perfect sewer line is desired, then a replacement of the four-inch clay piping on the property should be considered ($${sewerReplacementCost}). With this option we would still need to continue the inspection of the remaining piping going into the street.`, 30, 520)
      .font('Helvetica')

    doc
      .fontSize(18)
      .text('Payment                                                                                       ',30, 580, {underline: true}) 

    doc
      .fontSize(12)
      .text(`Total paid for sewer inspection: $ ${payment} (${paymentMethod === 'cash' ? 'cash' : `check # ${checkNo}`})`,30, 610) 

    doc
      .fontSize(10)
      .text('Robert Deyl Plumbing, Inc.', 30, 705)  
      .text('Page 2 of 2', 470, 705)  
  
    doc.end();
  
    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      setBlob(stream.toBlobURL('application/pdf'));
      if (fileName) {
        saveData(blob, fileName)
      }  
    });
  }    

  return (
    <div id='sewerReportInputDiv'>
      <div id='headerDiv'>
        <div id='imageDiv'>
          <img src={logo} className="App-logo" alt="logo" width='106px' height='106px'/>
        </div>
        <div id='titleDiv'>
          <h1 style={{paddingTop: '10px'}}>Robert Deyl Plumbing, Inc.</h1>
          <h3>Sewer Report</h3>
        </div>
      </div>  
      <br/>
      <fieldset>
        <div>
          <label className='alignedLabels'>Date:</label>
          <input id='date' type='date' style={{width: '200px'}} onChange={(e) => setDate(e.currentTarget.value)} value={date}></input>
          
        </div>
        <div>
          <label className='alignedLabels'>Customer Name:</label>
          <input style={{width: '650px', marginTop: '5px'}} onChange={(e) => setCustomerName(e.currentTarget.value)} value={customerName}></input>
        </div>
      </fieldset>

      <fieldset style={{ marginTop: '10px'}}>
        <legend style={{color: 'white'}}>Job Address</legend>
        <div>
          <label className='alignedLabels'>Address:</label>
          <input style={{width: '650px', marginTop: '0px'}} onChange={(e) => setAddress(e.currentTarget.value)} value={address}></input>
        </div>
        <div>
          <label className='alignedLabels'>City:</label>
          <input style={{width: '650px', marginTop: '5px'}} onChange={(e) => setCity(e.currentTarget.value)} value={city}></input>
        </div>
        <div>
          <label className='alignedLabels'>State:</label>
          <input style={{width: '50px', marginTop: '5px'}} onChange={(e) => setState(e.currentTarget.value)} value={state}></input>
        </div>
        <div>
          <label className='alignedLabels'>Zip Code:</label>
          <input style={{width: '50px', marginTop: '5px'}} onChange={(e) => setZip(e.currentTarget.value)} value={zip}></input>
        </div>
      </fieldset>

      <h2>Findings</h2>
      <textarea style={{width: '845px', height: '50vh', minHeight: '200px', resize:'none'}} onChange={(e) => setFindings(e.currentTarget.value)} value={findings}></textarea>

      <h2>Videos</h2>
      {videos.map((item, i) => {
        return (
          <div id='videoEntryDiv' key={i}>
            <input style={{width: '765px'}} onChange={(e) => handleVideoChange(e, i)} value={videos[i]}></input>            
            <button className='videoButtons' onClick={() => handleAddVideo(i)}>+</button>
            <button className='videoButtons' onClick={() => handleDeleteVideo(i)}>-</button>
          </div>
        )
      })}

      <h2>Recommendations</h2>
      <textarea style={{width: '845px', height: '100px', minHeight: '200px', resize:'none'}} onChange={(e) => setRecommendations(e.currentTarget.value)} value={recommendations}></textarea>
      <div>
        <label id='totalReplacementCostLabel'>Total sewer replacement cost: $</label>
        <input style={{width: '70px', marginTop: '5px'}} onChange={(e) => setSewerReplacementCost(e.currentTarget.value)} value={sewerReplacementCost}></input>
      </div>

      <h2>Payment</h2>
      <div>
        <label>Total paid for sewer inspection: $ </label>
        <input style={{width: '70px', marginTop: '5px', marginRight: '20px'}} onChange={(e) => setPayment(e.currentTarget.value)} value={payment}></input>
        <input type="radio" id="cash" name="payment" onClick={() => setPaymentMethod('cash')} onChange={e => {}} checked={paymentMethod === 'cash'}></input>
        <label htmlFor="cash">Cash</label>
        <input type="radio" id="check" name="payment" onClick={() => setPaymentMethod('check')} onChange={e => {}} checked={paymentMethod === 'check'}></input>
        <label htmlFor="check">Check  #</label>
        <input id='checkNo' style={{width: '70px', marginLeft: '5px'}} onChange={(e) => setCheckNo(e.currentTarget.value)} value={checkNo}></input>
      </div>

      <div id='buttonDiv'>
        <button className='footerButton' onClick={handleCreatePreview}>Preview Report</button>
        <button className='footerButton' onClick={handleCreatePDF}>Save As PDF</button>
        <button className='footerButton' onClick={handleClearForm}>Clear/Reset Form</button>
        <button className='footerButton' onClick={handleOpenEmail}>Email Report...</button>
      </div>
    </div>
  )
}

export default SewerReportInput;