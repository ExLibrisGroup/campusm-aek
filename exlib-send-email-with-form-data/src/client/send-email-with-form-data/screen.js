import React from "react";
import {
  BannerHeader,
  BasicSegment,
  Button,
  Container,
  Form,
  request,
  VBox
} from "@ombiel/aek-lib";
import {extend, has, isEmpty} from "lodash";
import {Notifier, validateEmail} from "@ombiel/cm-lib";

export default class Screen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      data: {},
      subjects: [],
      loading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this); 
  }

  componentDidMount() {
    // Get the items to populate the drop down menu 
    request.action("get-items").end((err,response) => {
      if (!err && response && response.body) {
        this.setState({subjects: response.body.subjects, loading: false});
      }
      else {
        this.setState({loading: false}, () => {
          this.showMessage(true); 
        });
      }
    });
  }

  // Update the state every time a form field is modified
  handleChange = (e, name, value) => {
    const prevState = this.state.data; 
    const data = extend({}, prevState, {[name]: value});
    this.setState({data: data}); 
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({loading: true});

    request
    .action("send-email")
    .send({data: JSON.stringify(this.state.data)})
    .end((err, response) => {
      if (!err && response && !isEmpty(response.body) && has(response.body, 'success')) {
        this.setState({loading: false}, () => {
          this.showMessage(false); 
        });
      }
      else {
        this.setState({loading: false}, () => {
          this.showMessage(true); 
        });
      }
    });
  }

  showMessage(error) {
    const title = error ? "Error" : "Success"; 
    const message = error ? "An error has occurred." : "Your submission was successful!"; 
    const level = error ? "error" : "success"; 

    Notifier.add({
      title: title,
      message: message,
      level: level,
      dismissible: true
    });
  }
  
  validate() {
    var messages = {};
    var formData = this.state.data;

    // Check that all fields have values 
    var valid = formData.subject && formData.recipient && formData.input;

    // Check if email is valid 
    if (formData.recipient && !(validateEmail(formData.recipient))) {
      valid = false;
      messages.recipient = "Sorry, this is not a valid email address";
    }

    return {valid, messages};
  }

  render() {
    const loading = this.state.loading; 
    const data = this.state.data; 
    const dropDownItems = this.state.subjects; 
    const validation = this.validate();
    const fields = [
      {name: "subject", label: "Email Subject", required: true, type: "select", options: dropDownItems},
      {name: "recipient", label: "Email Recipient", required: true, type: "email"},
      {name: "input", label: "Email Body", required: true, type: "textarea"}
    ];
    
    return (
      <Container>
        <VBox>
          <BannerHeader theme="alt" key="header" data-flex={0}>
            Send Email With Form Data
          </BannerHeader>
          <BasicSegment loading={loading}>
            <div>
              <Form 
                fields={fields} 
                data={data} 
                onChange={this.handleChange} 
                validation={validation} 
              />
              <div style={{textAlign: "center", marginTop: "1em"}}>
                <Button type="submit" disabled={!validation.valid} onClick={this.handleClick}> 
                  Submit 
                </Button>
              </div>
            </div>
          </BasicSegment>
        </VBox>
      </Container>
    );
  }
}
