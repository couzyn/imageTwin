import React from 'react'
import './style/index.css';
import UploadIcon from './img/upload.svg'
import DeleteIcon from './img/delete.svg'
import ImageEditor from './components/ImageEditor';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = { imageSources: [] }

    this.handleUpload = this.handleUpload.bind(this)
    this.deleteImage = this.deleteImage.bind(this)
  }

  /* 
  ------  FILE UPLOAD -------
      * reads file stream
      * renders image
      * creates image object with source and dimensions
      * adds object to store    
   */
  handleUpload = (e) => {
    var image = { src: '', width: 0, height: 0 }
    image.src = URL.createObjectURL(e.target.files[0])
    var objectUrl = URL.createObjectURL(e.target.files[0])
    var imageEl = new Image()
    imageEl.src = objectUrl
    imageEl.onload = function () {
      image.width = this.width
      image.height = this.height
    }

    this.setState({ imageSources: [...this.state.imageSources, image] })
    e.target.value = ""
  }

  /*
  ------  DELETE IMAGE -------
      * delets image pbject from store
  */
  deleteImage = (image) => {
    var filteredImageSources = this.state.imageSources.filter(src => {
      return src !== image
    })
    this.setState({ imageSources: filteredImageSources })
    URL.revokeObjectURL(image)
  }


  render() {
    return (
      <div className="App">

        {/*---- LIST OF IMAGE EDITORS ---- */}
        {this.state.imageSources.map((item, index) => {
          return (
            <div className="container" key={index}>
              <h1> Image {(index + 1)} </h1>
              <ImageEditor image={item} index={index} />
              <button className="delete-btn" onClick={() => this.deleteImage(item)} aria-label="delete">
                <img src={DeleteIcon} alt="an icon showing a trash can" />
              </button>
            </div>
          )
        })}

        {/*---- UPLOAD IMAGE BUTTON ---- */}
        <form>
          <label id="upload-image-button" htmlFor="file">
            <img src={UploadIcon} alt="an icon showing an upload symbol" />
            Add new Image

            {/* hidden  */}
            <input onChange={this.handleUpload} type="file" accept="image/jpeg, image/png" name="image" id="file" />
         
          </label>
        </form>
      </div>
    );
  }
}

export default App;
