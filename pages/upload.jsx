import mobilenet from '../lib/model'
import Page from '../layouts/main'

class Upload extends React.Component {
  constructor() {
    super()
    this.model = new mobilenet()
    this.state = { name: 'Derp', file: null, status:'Loading', predictions:[]}
    this.img = React.createRef();

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
    setTimeout(this.classify, 300)
  }
  classify = () =>{
    const node = this.img.current;
    this.model.predict(node).then((predictions) => {
      this.setState({predictions})
    });
  }
  async componentDidMount() {
    if(localStorage.getItem('mobilenet')){
      await this.model.load('indexeddb://mobilenet')
      this.setState({status: this.model.status})
    }
    else {
      console.log('No model, downloading...')
      await this.model.load();
      const saved = await this.model.save('indexeddb://mobilenet');
      localStorage.setItem('mobilenet', 'saved')
      console.log('Saved Model to indexDB', saved)
      if(saved) this.setState({status:'done'})
    }
  }

  render = () => 
    <Page>
      <div className="container">
        {this.state.status !== 'done' ? this.state.status : ''}
        <div className="uploader">
          {this.state.status === 'done' ?
            <div>
              <label for="file-upload" className={`custom-file-upload ${this.state.file ? 'left':''}`}>
              Upload
              </label>
              <input id="file-upload" type="file" onChange={this.handleChange} />
            </div>
            
            : this.model.status}
        </div>
        <img src={this.state.file} ref={this.img} />
        <div className="guesses">
          {this.state.predictions.map(prediction => (
            <p>{prediction.className} | {Math.floor(prediction.probability*100)}%</p>
          ))}
        </div>
          
        <style jsx>{`
          .container{
            display: flex;
            text-align: center;
            flex-wrap:wrap;
            padding: 1em;
          }
          .container  *{
            flex-basis: 33%;
          }
          
          img {
            width: auto;
            margin: auto;
          }
          #file-upload{
            display: none;
          }
          .custom-file-upload {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,  -50%);
            transition: ease 0.2s all;
          }
          .left {
            left: 10%;
          }
        `}
        </style>
      </div>
    </Page>
    

}
export default Upload
