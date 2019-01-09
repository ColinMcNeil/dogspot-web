import mobilenet from '../lib/model'
import Page from '../layouts/main'

class Upload extends React.Component {
  constructor() {
    super()
    this.model = new mobilenet()
    this.state = { name: 'Derp', file: null, status:'Loading Neural Network', predictions:[]}
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
    if (localStorage.getItem('mobilenet')) {
      this.setState({status: 'Loading from saved model'})
      await this.model.load('indexeddb://mobilenet')
      this.setState({status: this.model.status})
    }
    else {
      this.setState({ status: 'Downloading model...(<1MB)' })
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
        {this.state.file ? <img src={this.state.file} ref={this.img} />:''}
        {this.state.file ? <div className="guesses">
          {
            this.state.predictions
              .filter(prediction => prediction.probability > 0.1)
              .map(prediction => (
                <div>
                  <p>
                    <h4>Breed:</h4>
                    {prediction.className}
                  </p>
                  <p>
                    <h4>Probability:</h4>
                    {' ' + Math.floor(prediction.probability * 100)} %
                  </p>
                </div>
              )
              )
          }
        </div>
        : ''}
          
        <style jsx>{`
          .container{
            display: flex;
            flex-wrap:wrap;
            padding: 1em;
            justify-content: center;
            align-items:center;
          }
          .container > *{
            flex-basis: 25%;
            margin: 20px;
            min-width: 200px;
          }
          
          h4 {
            margin: 5px  0;
          }
          .uploader {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1em;
            height: 50vh;
          }
          #file-upload{
            display: none;
          }
          .custom-file-upload {
            transition: ease 0.2s all;
          }
          .left {
            height: auto;
          }
        `}
        </style>
      </div>
    </Page>
    

}
export default Upload
