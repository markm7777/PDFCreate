import React from 'react';
import logo from './ROBERTDEYL_Logo02.jpg';
import './register-files';

const PDFDocument = require('pdfkit').default;
const blobStream = require('blob-stream');

class SewerReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blob: '',
      date: '',
      customerName: '',
      address: '',
      city: '',
      state: 'CA',
      zip: '',
      findings: '',
      videos: [''],  
      recommendations: '',
      payment: '275.00',
      paymentMethod: 'cash',
      checkNo: '',
      sewerReplacementCost: '7000.00'
    }
  }

  handleAddVideo = (i) => {
    this.setState({videos: [...this.state.videos, '']});
  }

  handleDeleteVideo = (i) => {
    if (this.state.videos.length > 1) {
      let newArr = this.state.videos.filter((item, index) => index !== i)
      this.setState({videos: newArr});
    }

    // this.setState({videos: [...this.state.videos, '']});
  }

  handleVideoChange = (e, index) => {
    let videoArr = [...this.state.videos];
    videoArr[index] = e.currentTarget.value;
    this.setState({videos: videoArr});
  }


  handleCreatePreview = () => {
    this.createBlob('');
  }

  handleCreatePDF = () => {
    this.createBlob(`${this.state.date}-${this.state.customerName}.pdf`);
  }

  handleClearForm = () => {
    this.setState({
      blob: '',
      date: '',
      customerName: '',
      address: '',
      city: '',
      state: 'CA',
      zip: '',
      findings: '',
      videos: [''],  
      recommendations: '',
      payment: '275.00',
      paymentMethod: 'cash',
      checkNo: '',
      sewerReplacementCost: '7000.00'
    })
  }

  saveData = (blob, fileName) => {
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
 
  createBlob = (fileName) => {
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

    let dateStr = this.state.date;
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
      .text(`${this.state.customerName}`)
      
      .font('Helvetica-Oblique')
      .text(`Job Address: `, 52, 210, {continued: true})
      .font('Helvetica-Bold')        
      .text(`${this.state.address}`)
      .text(`${this.state.city}, ${this.state.state} ${this.state.zip}`, 138, 230)

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
      .text(`${this.state.findings}`, 30, 430)

    doc
      .fontSize(10)
      .text('Robert Deyl Plumbing, Inc.', 30, 705)  
      .text('Page 1 of 2', 470, 705)  
  
    doc.addPage(); //////////////////////////////////////////////////////////////////////////////////////////

    doc
      .fontSize(18)
      .text('Videos*                                                                                         ',30, 50, {underline: true}) 

    let vPos = 80;
    this.state.videos.map((item, i) => {
      if (i !== 0) {
        vPos += doc.heightOfString(this.state.videos[i - 1], {width: 600}) + 5;
      }
      return(
        doc
        .fontSize(12)
        .fillColor('blue')
        .text(`${item}`, 30, vPos, {link:`${item}`, underline: true})
      )
    })
        
    // doc
    //   .fontSize(12)
    //   .fillColor('blue')
    //   .text(`${this.state.videos}`, 30, 80, {link:`${this.state.videos}`, underline: true});

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
      .text(`${this.state.recommendations}`, 30, 240)

    doc
      .font('Helvetica-Oblique')
      .text(`Note: If a perfect sewer line is desired, then a replacement of the four-inch clay piping on the property should be considered ($${this.state.sewerReplacementCost}). With this option we would still need to continue the inspection of the remaining piping going into the street.`, 30, 520)
      .font('Helvetica')

    doc
      .fontSize(18)
      .text('Payment                                                                                       ',30, 580, {underline: true}) 

    doc
      .fontSize(12)
      .text(`Total paid for sewer inspection: $ ${this.state.payment} (${this.state.paymentMethod === 'cash' ? 'cash' : `check # ${this.state.checkNo}`})`,30, 610) 

    doc
      .fontSize(10)
      .text('Robert Deyl Plumbing, Inc.', 30, 705)  
      .text('Page 2 of 2', 470, 705)  
  
    doc.end();
  
    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      this.setState({blob:stream.toBlobURL('application/pdf')});
      if (fileName) {
         this.saveData(blob, fileName)
      }  
    });
  }    

  render() {
    return (
      <div id='sewerReportDiv'>
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
              {/* <input type='date' style={{width: '200px'}} onChange={this.handleDateChange} value={this.state.date}></input> */}
              <input type='date' style={{width: '200px'}} onChange={(e) => this.setState({date: e.currentTarget.value})} value={this.state.date}></input>
              
            </div>
            <div>
              <label className='alignedLabels'>Customer Name:</label>
              <input style={{width: '650px', marginTop: '5px'}} onChange={(e) => this.setState({customerName: e.currentTarget.value})} value={this.state.customerName}></input>
            </div>
          </fieldset>

          <fieldset style={{ marginTop: '10px'}}>
            <legend style={{color: 'white'}}>Job Address</legend>
            <div>
              <label className='alignedLabels'>Address:</label>
              <input style={{width: '650px', marginTop: '0px'}} onChange={(e) => this.setState({address: e.currentTarget.value})} value={this.state.address}></input>
            </div>
            <div>
              <label className='alignedLabels'>City:</label>
              <input style={{width: '650px', marginTop: '5px'}} onChange={(e) => this.setState({city: e.currentTarget.value})} value={this.state.city}></input>
            </div>
            <div>
              <label className='alignedLabels'>State:</label>
              <input style={{width: '50px', marginTop: '5px'}} onChange={(e) => this.setState({state: e.currentTarget.value})} value={this.state.state}></input>
            </div>
            <div>
              <label className='alignedLabels'>Zip Code:</label>
              <input style={{width: '50px', marginTop: '5px'}} onChange={(e) => this.setState({zip: e.currentTarget.value})} value={this.state.zip}></input>
            </div>
          </fieldset>

          <h2>Findings</h2>
          <textarea style={{width: '845px', height: '500vh', minHeight: '200px', resize:'none'}} onChange={(e) => this.setState({findings: e.currentTarget.value})} value={this.state.findings}></textarea>

          <h2>Videos</h2>
          {this.state.videos.map((item, i) => {
            return (
              <div id='videoEntryDiv' key={i}>
                <input style={{width: '780px'}} onChange={(e) => this.handleVideoChange(e, i)} value={this.state.videos[i]}></input>            
                <button className='videoButtons' onClick={() => this.handleAddVideo(i)}>+</button>
                <button className='videoButtons' onClick={() => this.handleDeleteVideo(i)}>-</button>
              </div>
            )
          })}


          {/* <textarea style={{width: '845px', height: '60px', minHeight: '75px', resize:'none'}} onChange={(e) => this.setState({videos: e.currentTarget.value})} value={this.state.videos}></textarea> */}

          <h2>Recommendations</h2>
          <textarea style={{width: '845px', height: '100px', minHeight: '200px', resize:'none'}} onChange={(e) => this.setState({recommendations: e.currentTarget.value})} value={this.state.recommendations}></textarea>
          <div>
            <label id='totalReplacementCostLabel'>Total sewer replacement cost: $</label>
            <input style={{width: '70px', marginTop: '5px'}} onChange={(e) => this.setState({sewerReplacementCost: e.currentTarget.value})} value={this.state.sewerReplacementCost}></input>
          </div>

          <h2>Payment</h2>
          <div>
            <label>Total paid for sewer inspection: $ </label>
            <input style={{width: '70px', marginTop: '5px', marginRight: '20px'}} onChange={(e) => this.setState({payment: e.currentTarget.value})} value={this.state.payment}></input>
            <input type="radio" id="cash" name="payment" onClick={() => this.setState({paymentMethod: 'cash'})} onChange={e => {}} checked={this.state.paymentMethod === 'cash'}></input>
            <label htmlFor="cash">Cash</label>
            <input type="radio" id="check" name="payment" onClick={() => this.setState({paymentMethod: 'check'})} onChange={e => {}} checked={this.state.paymentMethod === 'check'}></input>
            <label htmlFor="check">Check  #</label>
            <input id='checkNo' style={{width: '70px', marginLeft: '5px'}} onChange={(e) => this.setState({checkNo: e.currentTarget.value})} value={this.state.checkNo}></input>
          </div>

          <div id='buttonDiv'>
            <button className='footerButton' onClick={this.handleCreatePreview}>Preview Report</button>
            <button className='footerButton' onClick={this.handleCreatePDF}>Save As PDF</button>
            <button className='footerButton' onClick={this.handleClearForm}>Clear/Reset Form</button>
          </div>

        </div>

        <div id='sewerReportPreviewDiv'>
        <h2>Preview</h2>
          <iframe title="preview" src={this.state.blob} width="600" height="725"></iframe>;
        </div>
      </div>
    )
  }
}

export default SewerReport;