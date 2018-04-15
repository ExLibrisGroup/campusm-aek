var React = window.React = require("react");
var reactRender = require("-aek/react/utils/react-render");
var {VBox} = require("-components/layout");
var Container = require("-components/container");
var {BannerHeader} = require("-components/header");
var {BasicSegment} = require("-components/segment");
var Form = require("-components/form");
var _ = require("-aek/utils");
var request = require("-aek/request");
var {ErrorMessage,SuccessMessage} = require("-components/message");
var Divider = require("-components/divider");
var Button = require("-components/button");

var Screen = React.createClass({
  // On initial start we want to blank any data or subjects that we have for a form.
  // We also want to set the page to loading as we will be fetching data from a mock service.

  getInitialState:function() {
    return {
      data:{},
      subjects:[],
      loading:true
    };
  },

  componentDidMount:function() {
    // when component is initially rendered - lets fetch the data for the subject lines
    // if the data is exposed publicly, we could retrieve it directly from the client
    // for this demo we are going to fetch the data using an action - this allows us to define the service in Twig syntax and call it serverside
    // - see /src/screens/templates/main.ect
    request.action("get_subjects").end((err,response)=>{
      if(!err && response && response.body) {
        this.setState({subjects:response.body.subjects,loading:false});
      }
      else {
        this.setState({error:"Oops! Something bad happened!",loading:false});
      }
    });
  },

  // this is called every time any of the form fields are modified
  // this can occur on every key press
  change:function(e,fieldName,value) {
    // we must create an entirely new object for the form data
    // if we simply modify the existing object, the reference remains the same and React will not recognise a change when it re-renders
    this.setState({data:_.extend({},this.state.data,{[fieldName]:value})});
  },

  submit:function(e) {
    e.preventDefault();

    this.setState({loading:true});

    // again you could send the data to a public web service here
    // for this demo we will send it to the AEK server with an action
    // the aek server will use AEKEmail to send the data to a person - the recipient can be set in /src/screens/main.ect

    request
      .action("send_feedback")
      .send({
        "data":JSON.stringify(this.state.data)
      })
      .end((err,response)=> {
        if(!err && response && response.body && response.body.success) {
          this.setState({success:true,loading:false});
        }
        else {
          this.setState({error:"Oops, failed to send feedback",loading:false});
        }
      });

  },

  // returns a validation object that can be passes to the Form component.
  // this determines if the form is in a valid state and returns any input specific messages that should be included in the UI
  validate:function() {

    var messages = {};
    var formData = this.state.data;

    // all fields must be filled to be valid
    var valid = !!formData.subject && !!formData.email && !!formData.feedback;

    // also check email address is valid
    if(formData.email && !(_.validateEmail(formData.email))) {
      valid = false;
      // if invalid present a error message to the user
      messages.email = "Sorry, this is not a valid email address";
    }

    return {valid,messages};

  },


  render:function() {

    var content;

    if(!this.state.loading) {

      if(this.state.success) {
        content = <SuccessMessage heading="Thank You">Your feedback has been submitted.</SuccessMessage>;
      }

      else if(this.state.error) {
        content = <ErrorMessage heading="Error">{this.state.error}</ErrorMessage>;
      }
      else {

        var fields = [
          {
            name:"subject",
            type:"select",
            options:this.state.subjects
          },
          {
            name:"email",
            required:true,
            icon:"rocket",
            type:"email"
          },
          {
            name:"feedback",
            type:"textarea"
          }
        ];

        var validation = this.validate();

        var formBottom = [
          <Divider/>,
          <Button type="submit" disabled={!validation.valid} variation="positive">Submit</Button>
        ];


        content = <Form fields={fields} data={this.state.data} onChange={this.change} onSubmit={this.submit} validation={validation} formBottom={formBottom} />;

      }
    }


    return (
      <Container>
        <VBox>
          <BannerHeader theme="alt" icon="edit" key="header" data-flex={0}>Feedback</BannerHeader>
          <BasicSegment loading={this.state.loading}>
            {content}
          </BasicSegment>
        </VBox>
      </Container>
    );
  }
});

reactRender(<Screen/>);
