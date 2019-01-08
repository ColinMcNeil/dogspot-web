export default ({ children }) => (
  <div>
    {children}
    <style jsx global>{`
    @import url('https://fonts.googleapis.com/css?family=Poppins');
    html, body {
      margin:0;
      padding: 0;
      font-family: 'Poppins';
      color: #101f35;
      /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#2edaea+0,7db9e8+100 */
      background: #2edaea; /* Old browsers */
      background: -moz-linear-gradient(top, #2edaea 0%, #7db9e8 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top, #2edaea 0%,#7db9e8 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom, #2edaea 0%,#7db9e8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2edaea', endColorstr='#7db9e8',GradientType=0 ); /* IE6-9 */
      background-repeat: no-repeat;
      background-size: auto;
      min-height: 100%;
    }
    button, label {
      border: solid white 2px;
      outline: none;
      padding: 1em 2em;
      font-size: 1.3em;
      background: none;
      font-weight: bold;
      color: white;
      border-radius: 4px;
      transition ease 0.2s all;
    }
    button:hover, label:hover {
      cursor: pointer;
      background: #101f35;
      border-color: transparent;
    }
  `}</style>
  </div>

)
