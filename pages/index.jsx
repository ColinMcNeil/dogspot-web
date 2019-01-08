import Link from 'next/link'
import Page from '../layouts/main'
const names = ['doggo', 'pupper', 'dog', 'pupperoni', 'pup']
class Index extends React.Component {
  constructor() {
    super()
    const index = Math.floor(Math.random()*names.length) 
    this.state = {text:names[index]}
  }
render = () => 
  <Page>
    <div className="container">
      <h1>Welcome to DogSpot</h1>
      <Link href='/upload'><button>New {this.state.text}</button></Link>
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
      
    `}
    </style>
    </Page>
}
  

export default Index
