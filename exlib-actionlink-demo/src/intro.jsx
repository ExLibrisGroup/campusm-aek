var React = require("-aek/react");
var Page = require("-components/page");
var {BannerHeader, Header} = require("-components/header");
var {Segment,BasicSegment} = require("-components/segment");
var SearchBox = require("../components/searchBox");
var Divider = require("-components/divider");
var LibraryData = require("../data/library-data");
var _ = require("-aek/utils");

require("../code/JsBarcode-1.5/CODE39.js");
require("../code/JsBarcode-1.5/JsBarcode.js");

var BarCode = React.createClass({
    componentDidMount: function(){
      var content = this.props.content;
      var options = this.props.options;
      JsBarcode(this.refs.barcode.getDOMNode(),content,options);
    },

    render:function() {
      return (
        <img id="pass" ref="barcode" />
      );
    }
});

var Index = React.createClass({
  getInitialState: function(){
    return {};
  },

  componentDidMount: function(){
    this.getUser();
    this.getUserFees();
    this.getLoans();
  },

  getUserFees: function(){
    var isCached = LibraryData.getFees((err,fees)=>{
      if(err) {
        LibraryData.fetchFees((err,fees)=>{
          if(!err && fees) {
            this.setState({feeInfo:fees.fee});
          }
        });
      }
      else if(fees) {
        this.setState({feeInfo:fees.fee});
      }
    });

    // if data was cached data, lets try and update it in the background
    if(isCached) {
      LibraryData.fetchFees((err,fees)=>{
        if(!err && fees) {
          this.setState({feeInfo:fees.fee});
        }
      });
    }
  },

  getUser: function(){
    var isCached = LibraryData.getUsers((err,user)=>{
      if(err) {
        LibraryData.fetchUsers((err,userinfo)=>{
          if(!err && userinfo) {
            this.setState({userinfo:userinfo});
          }
        });
      }
      else if(user) {
        this.setState({userinfo:user});
      }
    });

    // if data was cached data, lets try and update it in the background
    if(isCached) {
      LibraryData.fetchUsers((err,userinfo)=>{
        if(!err && userinfo) {
          this.setState({userinfo:userinfo});
        }
      });
    }
  },

  getLoans: function(){
    var isCached = LibraryData.getLoans((err,loans)=>{
      if(err) {
        LibraryData.fetchLoans((err,loaninfo)=>{
          if(!err && loaninfo) {
            this.setState({loaninfo:loaninfo.item_loan});
          }
        });
      }
      else if(loans) {
        this.setState({loaninfo:loans.item_loan});
      }
    });

    // if data was cached data, lets try and update it in the background
    if(isCached) {
      LibraryData.fetchLoans((err,loaninfo)=>{
        if(!err && loaninfo) {
          this.setState({loaninfo:loaninfo.item_loan});
        }
      });
    }
  },

  render:function() {

    var data = this.props.data["details"].personal;
    var name = data.firstname + " " + data.lastname;
    var userDetails = this.state.userinfo;
    var loanInfo = this.state.loaninfo;
    var feesInfo = this.state.feeInfo;
    var feesTotal = 0;
    var finesTotal = 0;
    var loading = !loanInfo && !userDetails && !feesInfo;

    if(!loading){

      if(!_.isArray(loanInfo)){
        var loans = [];
        loans.push(loanInfo);
        loanInfo = loans;
      }

      if(!_.isArray(feesInfo)){
        var fees = [];
        fees.push(feesInfo);
        feesInfo = fees;
      }

      var loansLength = loanInfo.length;

      if(feesInfo){
        for (let entry of feesInfo) {
          feesTotal = feesTotal + parseInt(entry.balance);
        }
      }
      if(loanInfo){
        for (let loan of loanInfo) {
          if(loan.loan_fine){
            finesTotal = finesTotal + parseInt(loan.loan_fine);
          }
        }
      }
    }

    return (
      <Page>
        <BasicSegment nopadding loading={loading}>
          <BannerHeader theme="yellowTheme" iconAlign="right" subtext="Home Screen" icon="book" level="3" style={{fontWeight: "200", padding: "0"}}>Library Services</BannerHeader>
          <SearchBox ctx={this.props.ctx} />

          <BannerHeader theme="yellowTheme" iconAlign="right" level="3" icon="user" style={{fontWeight: "200", padding: "0"}}>Welcome Back - {name}</BannerHeader>
          <BasicSegment>
            <Header dividing level="4" icon="payment">Your library pass</Header>
            <Segment textAlign="center" theme="yellowTheme">
              <BarCode content={data.id} options={{format:"CODE39",displayValue:false,fontSize:40}} />
            </Segment>


            <Header dividing level="4" icon="pie chart">Your account overview</Header>
            <div className="ui labeled icon fluid yellowTheme three item menu snapShotBox" style={{marginTop:"0", borderRadius:"0"}}>
              <a className="item active" href="#/loans">
                <i className="book icon"></i> <b>Total Loans</b><Divider/><h3>{loansLength}</h3>
              </a>
              <a className="item active" href="#/fees">
                <i className="dollar icon"></i> <b>Total Fees</b><Divider/><h3>${feesTotal}.00</h3>
              </a>
              <a className="item active" href="#/fees">
                <i className="dollar icon"></i> <b>Total Fines</b><Divider/><h3>${finesTotal}.00</h3>
              </a>
            </div>
          </BasicSegment>
        </BasicSegment>
      </Page>
    );
  }

});

module.exports = Index;
