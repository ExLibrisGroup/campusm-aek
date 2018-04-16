let React = window.React = require("react");
let reactRender = require("-aek/react/utils/react-render");
let Container = require("-components/container");
let Form = require("-components/form");
let Panel = require("-components/panel");
let {VBox} = require("-components/layout");
let {BannerHeader} = require("-components/header");
let {BasicSegment} = require("-components/segment");
let {Button} = require("-components/button");
let {SuccessMessage} = require("-components/message");
let _ = require("-aek/utils");
let request = require("-aek/request");
let ImagePicker = require("-aek/client-tools/image-picker");

// Set Fields to be non on start up.
// We will generate these later.
let fields = [];

let Screen = React.createClass({
  // Set Inital state for this project.
  getInitialState:function() {
    return {
      formData:{},
      response:{success:false,error:false},
      validation:false,
      loading:true
    };
  },

  componentDidMount:function() {
    // Options for the Campus can be hard coded or could be dynamic.
    // In this case we are going to use hard coded.
    let options = [
      ["North Campus","NC"],
      ["East Campus","EC"],
      ["West Campus","WC"],
      ["South Campus","SC"]
    ];

    // Setting up for fields.
    // Can be edited if needs be.
    // Just some Default Fields.
    let labels = ["Feedback","Campus","Place","Picture","Observation or improvement proposal"];
    fields.push(
      {name:"email",label:"Email",type:"text"},
      {name:"feedback",label:labels[0],type:"text",required:true},
      {name:"select",label:labels[1],type:"select",options:options},
      {name:"place",label:labels[2],type:"text",required:true},
      {name:"comments",label:labels[4],type:"textarea",required:true}
    );

    this.setState({loading:false});
  },


  onChange:function(e,name,value) {
    // On Change is fired any time a field has been updated.
    // You can console log formData here and see this in real time on your browsers console log
    let formData = _.extend({},this.state.formData,{[name]:value});
    this.setState({formData:formData});
  },

  validate:function() {
    // Sample Validation just checking all required fields have some data.
    let valid = true;
    let messages = {};
    let formData = this.state.formData;
    // Check all requied fields have been completed
    fields.forEach(function(field) {
      let val = formData[field.name];
      if(field.required && !val) {
        valid = false;
        return;
      }
    });
    return {valid,messages};
  },

  // ImagePicker
  getImage:function(e) {
    e.preventDefault();
    // Creating a new image picker.
    let imagePicker = new ImagePicker({
      width:500,
      height:500,
      format:"jpg",
      sizing:"usercrop",
      quality:85
    });

    // On complete we are going to update state with these three fields.
    imagePicker.on("complete",(data)=>{
      let {imageData,format,meta} = data;
      let {filename} = meta || {};
      this.setState({format,imageData,filename});
    });

    // If we have an error show the user with an alert.
    imagePicker.on("error",function(message) {
      alert(message);
    });

    // If a user clicks then hits cancel then prompt them to choose and image.
    imagePicker.on("cancel",function() {
      alert("You must choose an image");
    });
  },

  // Send formData and ImagePicker data
  sendEmail:function() {
    // Set loading to show the user we are doing something.
    this.setState({loading:true});
    // Get form data
    let form = this.state.formData;
    // Get image data
    let imageData = this.state.imageData;
    // Get format of the image
    let format = this.state.format;
    // Set Email address to send this all to.
    let mailto = "simon.bonds@exlibrisgroup.com";
    // Success message to show if no error.
    let success = "Thank you for your observation or improvement proposal. We will be in touch shortly.";

    // Send request to the ECT file. main.ect
    request.action('feedback').send({mailto:mailto,imageData:imageData,format:format,success:success,feedback:form.feedback,select:form.select,place:form.place,comments:form.comments,email:form.email}).end((err, response) => {
      if(!err && response) {
        // response.body contains the data sent from {{aek.respond}} in main.ect
        this.setState({response:response.body,loading:false});
      }
    });

  },

  render:function() {
    let content;
    // Check validation everytime we render.
    let validation = this.validate();
    // Set loading to a variable that can be used in Render.
    let loading = this.state.loading;
    // Set Title of page
    let title = "Feedback Reporting";
    // Set subtitle of the page.
    let subtext = "Tell us about ideas for this campus";
    // Set CTA for Photo Button
    let tag = "Click here to upload a photo";
    // Set text for Submit button.
    let submit = "Submit";

    if(this.state.response.success === true)
    {
      // If we have a state of success meaning the message has been sent
      // then show the success message and a close button
      // Show message
      content =
      <span>
        <SuccessMessage style={{textAlign:"left"}}>{this.state.response.info}</SuccessMessage>
        <p style={{textAlign:"center",valign:"middle"}}>
          <Button href="campusm://home">Close</Button>
        </p>
      </span>;
    }
    else if(!loading) {
      // Show form
      // If we are not in a success state the assume we are still using the form.
      content =
      <div>
        <p style={{textAlign:"center"}}><b>{tag}</b><br /><Button onClick={this.getImage} icon="photo">{this.state.filename}</Button></p>
        <Form data={this.state.formData} validation={validation} fields={fields} onChange={this.onChange}/>
        <p><Button fluid onClick={this.sendEmail} loading={this.state.loading} disabled={!validation.valid} letiation="mondragon">{ submit }</Button></p>
      </div>;
    }

    // What we are outputting to the DOM on each render
    return (
      <Container>
        <VBox>
          <Panel>
            <BannerHeader subtext={ subtext } theme="prime" key="header" flex={0} style={{"margin":"0px","padding":"0px"}}>{ title }</BannerHeader>
            <BasicSegment loading={this.state.loading}>
              { content }
            </BasicSegment>
          </Panel>
        </VBox>
      </Container>
    );

  }

});

reactRender(<Screen/>);
