import React, { Component } from 'react';
import SignatureCanvas from 'react-signature-canvas';

class ReactSignatureCanvasField extends Component{

  constructor(props){
    super(props);
    this.state = {
      ...props,
      width: props.uiSchema["ui:options"] && props.uiSchema["ui:options"].width || 400,
      height: props.uiSchema["ui:options"] && props.uiSchema["ui:options"].height || 150
    }
  }

  componentDidMount(){
    if(!this.state.readonly && this.sigCanvas)
      this.sigCanvas.fromDataURL(this.state.formData);
  }

  _clear(e){
    e.preventDefault();

    const confirmed = confirm("Clear the signature?")
    if(confirmed){
      this.sigCanvas.clear();
      this.state.onChange();
    }else{
      return false;
    }
  }

  render(){
      return (
        <div style={{position: "relative", width: this.state.width+41, minHeight: this.state.height+40}}>

          {!this.state.readonly ?
            <div>
              <SignatureCanvas
                ref={(ref) => { this.sigCanvas = ref }}
                penColor='black'
                canvasProps={{
                  width: this.state.width,
                  height: this.state.height,
                  className: 'sigCanvas',
                  style: {border: "#ddd 3px dashed", borderRadius: 4}
                }}
                backgroundColor="#fafafa"
                onEnd={(value) => this.state.onChange(this.sigCanvas.toDataURL(value))}
              />
              { this.sigCanvas && !this.sigCanvas.isEmpty() ?
              <button
                className="btn btn-secondary d-print-none"
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: this.state.height+6,
                  fontSize: 16,
                  fontWeight: '700',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderWidth: 3
                }}
                onClick={this._clear.bind(this)}>&times;</button>
              : null }
            </div>
          :
            (this.state.formData ?
              <img style={{minHeight: this.state.height}} src={this.state.formData} />
            :
              <div style={{minHeight: this.state.height, fontWeight: "700", lineHeight: this.state.height+"px", color: "#666", backgroundColor: "#fafafa", textAlign: "center"}}>No Signature</div>
            )
          }
          <div className="sigSalutation">
            <h6 style={{paddingTop: 10, marginTop: 15, borderTop: "#444 1px solid"}}>{this.state.schema.title}</h6>
          </div>
        </div>
      );

  }

}

export default ReactSignatureCanvasField;
