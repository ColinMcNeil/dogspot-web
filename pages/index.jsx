import Link from 'next/link'
import Page from '../layouts/main'
const names = ['Doggo', 'Pupper', 'Dog', 'Pupperoni', 'Pup']
const siteKey = 'J3kaznhTYdYEkk0no7RRP5orjzIrt5L2'
class Index extends React.Component {
  constructor() {
    super()
    const index = Math.floor(Math.random() * names.length) 
    this.state = { text: names[index], time: 10}
  }
  componentDidMount=()=> {
    const script = document.createElement("script");
    script.src = "https://authedmine.com/lib/captcha.min.js";
    script.async = true;
    document.body.appendChild(script);

    const script2 = document.createElement("script");
    script2.innerHTML = "function captchaCallback(){localStorage.setItem('captcha', 'done');window.location.reload(false); }";
    script2.async = true;
    document.body.appendChild(script2);

    const captcha = localStorage.getItem('captcha')
    this.setState({ captcha })
    setInterval(() => {
      this.setState({time: this.state.time - 1})
    }, 1000);
  }
  render = () => 
    <Page>
      <div className="container">
        <h1>Welcome to DogSpot</h1>
        <p>
          DogSpot by <a href="https://colinmcneil.me/" target="_blank" noopener="true">Colin McNeil</a>&nbsp;
          is a simple webapp to identify dog breeds. It utilizes MobileNet,
          a neural network developed by TensorFlow and Google.
        </p>
        {this.state.captcha || this.state.time<1 ?
          <Link href='/upload'><button>Upload New {this.state.text}</button></Link> :
          <div className="coinhive-captcha" data-hashes="256" data-key={siteKey} data-callback="captchaCallback">
            <em>
              Loading Captcha...<br />
              If it doesn't load, please disable Adblock!
              (or click <Link href='/upload'>here</Link>)
		      </em>
          </div>
        }
        
       
      </div>
      <style jsx>{`
        .container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction:column;
          align-items: center;
          justify-content: center;
        }
        p {
          max-width: 600px;
        }
      `}
      </style>
    </Page>
}
  

export default Index
