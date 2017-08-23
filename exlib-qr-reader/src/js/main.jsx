var React = window.React = require('react');
var reactRender = require('-aek/react/utils/react-render');
var Container = require('-components/container');
var { VBox } = require('-components/layout');
var { BasicSegment, Segment } = require('-components/segment');
var { Button } = require('-components/button');
var Header = require('-components/header');



// Using Image picker to get the image from the device or to get the user to upload.
// https://npm.campusm.net/-/docs/@ombiel/aek-lib/0.2.24/pages/client-tools/image-picker
var ImagePicker = require('@ombiel/aek-lib/client-tools/image-picker');

// QrCode reader is a third party module
// https://www.npmjs.com/package/qrcode-reader
var QrCode = require('qrcode-reader');

// Initialised the QR code system.
var qr = new QrCode();

var background = {
  backgroundColor: '#333'
};

var Screen = React.createClass({

  // On inital load set everything to null.
  getInitialState: function () {
    return {
      qrCode: null,
      qrImage: null
    };
  },
  // On mount start QR reader and launch image picker
  componentDidMount: function () {
    this.initialiseQR();
    this.launchImagePicker();
  },

  initialiseQR: function () {
    qr.callback = (error, result) => {
      if (error) {
        alert(error);
        return;
      }
      alert(result);
      this.setState({
        qrCode: result.result
      });
    };
  },
  launchImagePicker: function () {
    // Set parameters for the QR reader.
    var imagePicker = new ImagePicker({
      width: 500,
      height: 500,
      format: 'png',
      quality: 80,
      camera: 'back',
      save: 'yes',
      sizing: 'contain',
      overlay: 'https://portal-ap.campusm.exlibrisgroup.com/assets/campusM/demoAPAC/liam/overlay.png'
    });

    // Once done create an image and then pass this to the QR reader to decode.
    imagePicker.on('complete', (data) => {
      var img = new Image();
      img.src = `data:image/${data.format};base64,${data.imageData}`;
      qr.decode(img.src);
      this.setState({
        qrImage: img.src
      });
    });
    // Error alert the user
    imagePicker.on('error', function (message, details) {
      alert(message);
      alert(details);
    });
    // Cancel alert the user.
    imagePicker.on('cancel', function () {
      alert('You must choose an image');
    });
  },
  render: function () {
    // Check if decoded text is a url if so create a button. Otherwise create a header and show the text.
    var button;
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
                              '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                              '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                              '(\\#[-a-z\\d_]*)?$','i');

    if(this.state.qrCode){
      if(!pattern.test(this.state.qrCode)){
        button = <Header level={2} style={{fontWeight: "200", padding: "0"}} textAlign="center" variation="prime">{this.state.qrCode}</Header>;
      }else{
        button = <Button variation="positive" style={{margin: "0"}} href={this.state.qrCode}>{this.state.qrCode}</Button>;
      }
    }


    return (
      <Container>
        <VBox style={background}>
          <BasicSegment>
            { this.state.qrImage
              ?
              <Segment textAlign="center">
                <img className="ui centered medium image" src={this.state.qrImage} />
              </Segment>
              :
              null
            }
            { this.state.qrCode
              ?
              <Segment textAlign="center">
                {button}
              </Segment>
              :
              null
            }
          </BasicSegment>
        </VBox>
      </Container>
    );
  }
});

reactRender(<Screen/>);
