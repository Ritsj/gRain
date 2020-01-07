import React, { Component } from 'react';
import { Segment, Button, Select, Form, Image } from 'semantic-ui-react';

import { postAttachment } from '../../api/http/attach.js';

var FormData = require('form-data');

const endPo = [
  {
    // if line is checked show lineNbr field
    key: 'customercreditnote',
    text: 'Customer Credit Note',
    value: 'customercreditnote'
    // line: true
  },
  // if line is checked show lineNbr field
  {
    key: 'customerdebitnote',
    text: 'Customer Debit Note',
    value: 'customerdebitnote'
    // line: true
  },
  // if line is checked show lineNbr field
  {
    key: 'customerinvoice',
    text: 'Customer Invoice',
    value: 'customerinvoice'
    // line: true
  },
  {
    // if line is checked show lineNbr field
    key: 'customeroverduecharge',
    text: 'Customer Overdue Charge',
    value: 'customeroverduecharge'
    // line: true
  },
  {
    // don't show lineNbr field
    key: 'inventory',
    text: 'Inventory',
    value: 'inventory'
    // line: false
  },
  {
    // if line is checked show lineNbr field
    key: 'journaltransaction',
    text: 'Journal Transaction',
    value: 'journaltransaction'
    // line: true
  },
  {
    // if line is checked show lineNbr field
    key: 'salesorder',
    text: 'Sales Order',
    value: 'salesorder'
    // line: true
  },
  {
    // if line is checked show lineNbr field
    // +document type: document and line
    key: 'supplierinvoice',
    text: 'Supplier Invoice',
    value: 'supplierinvoice'
    // line: true
  }
];

// Component for posting attachments
export default class Attachment extends Component {
  // Initiate state for activeTypeButton, DocNumValue, LineNumValue, EndPoSel, Line: True/False
  state = {
    activeTypeButton: 'Document',
    showLine: '',
    docNum: '',
    lineNum: '',
    endPoSel: '',
    selectedFile: {
      file: null,
      fileUrl: null
    }
  };

  // handle changing doc/line state and setting lineNum to null
  handleTypeButtonClick = (e, { name }) => this.setState({ activeTypeButton: name }); /* lineNum: '' */
  // handleChange
  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  // handle file upload
  handleFile = e => {
    if (typeof e.target.files[0] !== 'undefined') {
      this.setState({ selectedFile: { file: e.target.files[0], fileURL: URL.createObjectURL(e.target.files[0]) } });
    } else {
      console.log('No file is selected');
    }
  }
  prepareData () {
    return new Promise(
      resolve => {
        const { activeTypeButton, endPoSel, docNum, lineNum, selectedFile } = this.state;

        let targetUrl = endPoSel + '/' + docNum;
        if (activeTypeButton === 'Line') {
          targetUrl = targetUrl + '/' + lineNum;
        }

        const submittedContent = new FormData();
        submittedContent.append('file', selectedFile.file);
        submittedContent.append('target', targetUrl);

        resolve(submittedContent);
        console.log('Data is prepared');
        for (var value of submittedContent.values()) {
          console.log(value);
        }
      }
    );
  }

  async sendData (submittedContent) {
    return new Promise(
      resolve => {
        this.setState({ endPoSel: '', docNum: '', lineNum: '', selectedFile: { file: null, fileURL: null } });
        let response;

        postAttachment.call({
          form: submittedContent
        }, (err, res) => {
          if (err) {
            console.log('Error:' + err);
          } else {
            console.log('Success:' + res);
            response = res;
            return response;
          }
          resolve(response);
          console.log('Data is being sent');
        });
      }
    );
  }

  async handleTransaction () {
    try {
      console.log('Before assigning values');

      let submittedContent = await this.prepareData();
      let response = await this.sendData(submittedContent);

      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }
  // handleSubmit of form
  handleSubmit = e => {
    e.preventDefault();

    (async () => {
      await this.handleTransaction();
    })();
    /*
    const { activeTypeButton, endPoSel, docNum, lineNum, selectedFile } = this.state;
    // fill formdata with file
    const formData = new FormData();
    formData.append('file', selectedFile.file);
    // set target URL to be endpoint and document
    let targetUrl = endPoSel + '/' + docNum;
    // if line is activated, add line to targetUrl
    if (activeTypeButton === 'Line') {
      targetUrl = targetUrl + '/' + lineNum;
    }
    for (var value of formData.values()) {
      console.log(value);
    }
    // clear values on submit
    this.setState({ endPoSel: '', docNum: '', lineNum: '', selectedFile: { file: null, fileURL: null } });

    postAttachment.call({
      target: targetUrl,
      data: formData
    }, (err, res) => {
      if (err) {
        console.log('Error:' + err);
      } else {
        console.log('Success:' + res);
      }
    }); */
  }

  renderLineButton () {
    const { activeTypeButton } = this.state;
    // for now, only inventory does not have line attachments, so hardcoding below...
    if (this.state.endPoSel === '/inventory') {
      return (
        <Button
          name='Document'
          type='Button'
          fluid
          onClick={this.handleTypeButtonClick}
          content='Document'
          active={activeTypeButton === 'Document'}
        />
      );
    } else {
      return (
        <Button.Group fluid>
          <Button
            name='Document'
            type='Button'
            onClick={this.handleTypeButtonClick}
            content='Document'
            active={activeTypeButton === 'Document'}
          />
          <Button.Or />
          <Button
            name='Line'
            type='Button'
            onClick={this.handleTypeButtonClick}
            content='Line'
            active={activeTypeButton === 'Line'}
          />
        </Button.Group>
      );
    }
  }

  renderShowLine () {
    const { lineNum } = this.state;
    // hide line if User swaps Endpoint to inventory
    if (this.state.endPoSel === '/inventory') {
      return null;
    } else {
      if (this.state.activeTypeButton !== 'Line') {
        return null;
      } else {
        return (
          <Form.Input
            fluid
            name='lineNum'
            label='Line Number'
            placeholder='Enter Line Number'
            value={lineNum}
            onChange={this.handleChange}
          />
        );
      }
    }
  }

  render () {
    const { activeTypeButton, endPoSel, lineNum, docNum } = this.state;
    // const showLine = this.state.activeTypeButton === 'Line';
    const imageHere = this.state.selectedFile.file !== null;
    return (
      <div>
        <Segment>
          Post Attachment
          <Form onSubmit={this.handleSubmit}>
            <Form.Field
              name='endPoSel'
              control={Select}
              options={endPo}
              placeholder='Select endpoint...'
              value={endPoSel}
              onChange={this.handleChange}
            />
            {this.renderLineButton()}
            <Form.Input
              fluid
              name='docNum'
              label='Document Number'
              placeholder='Enter Document Number'
              value={docNum}
              onChange={this.handleChange}
            />
            {this.renderShowLine()}
            <input id='file' type='file' onChange={this.handleFile} />
            <Form.Button type='submit' fluid content='Attach' />
          </Form>
        </Segment>
        <Segment>
          <h1>Current Values:</h1>
          {activeTypeButton} <br />
          {endPoSel} <br />
          {docNum} <br />
          {lineNum} <br />
          {
            imageHere === true &&
            <div>
              {this.state.selectedFile.file.name}
            </div>
          }
          <Image fluid src={this.state.selectedFile.fileURL} />
        </Segment>
        <Segment>
          <h1>Submitted values:</h1>
        </Segment>
      </div>
    );
  }
}
