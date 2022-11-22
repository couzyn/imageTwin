import React from 'react'
import BBox from './BBox'

class ImageEditor extends React.Component {


    /*
    ------- IMAGE EDITOR CLASS ---------
    * props: image object, index
    */
    constructor(props) {
        super(props)

        this.state = {
            formData: { xPos: '', yPos: '', width: '', height: '' },
            bBoxes: [],
            message: '',
            focus: false,
            image: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }


    // Syncs FormData store with input values
    handleChange = (e) => {
        if (e.target.value !== '') {
            let targetValueInt = ''
            try {
                targetValueInt = parseInt(e.target.value)
            }
            catch {
                console.error("non integers entered")
            }
            this.setState({ formData: { ...this.state.formData, [e.target.id]: targetValueInt } })
        }
        else {
            this.setState({ formData: { ...this.state.formData, [e.target.id]: '' } })
        }

    }

    // Adds a BBox to the store and resets the Form
    handleSumbit = (e) => {
        e.preventDefault()

        const width = this.state.formData.width
        const height = this.state.formData.height
        const xPos = this.state.formData.xPos
        const yPos = this.state.formData.yPos

        const image = this.props.image

        // Check if box is > 0 
        if (width <= 0 || height <= 0) {
            const message = 'Please add a width and height'
            this.setState({ message: message })
            return
        }

        // Check if box is within image bounds 
        if (xPos + width > image.width
            || yPos + height > image.height) {
            const message = 'Your box overflows the image. Please draw a box that fits into ' + image.width + 'px x ' + image.height + 'px.'
            this.setState({ message: message })
            return
        }

        // Create new box with relative positioning for responsiveness
        const newBBox = {
            xPos: (xPos / this.props.image.width) * 100,
            yPos: (yPos / this.props.image.height) * 100,
            width: (width / this.props.image.width) * 100,
            height: (height / this.props.image.height) * 100
        }

        // Draw new Box and reset form
        this.setState({
            bBoxes: [...this.state.bBoxes, newBBox],
            formData: { xPos: '', yPos: '', width: '', height: '' },
            message: '',
            focus: true
        })

    }


    /* This dirty fixes a weird rendering race condition,
    where the image dimensions are loaded a second after mounting
    and are not updated -- if this was a real project, I'd look into
    properly fixing this */
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                image: this.props.image
            })
        }, 100)
    }


    render() {
        return (
            <div className="editor">

                { /* ----------- IMAGE AND BBOXES ----------- */}
                <div className="image-container">
                    <img className={this.state.focus ? '--focus' : ''} src={this.props.image.src} alt={'the uploaded image: ' + (this.props.index + 1)} />
                    {
                        this.state.bBoxes.map((value, index) => {
                            return (
                                <BBox key={index} props={value} />
                            )
                        })
                    }
                </div>

                { /* ----------- DIMENSIONS HINT ----------- */}
                <p className="dimensions">
                    Image Dimensions: {this.props.image.width} x {this.props.image.height}
                </p>

                <div>


                    { /* ----------- BBOX INPUT AREA ----------- */}
                    <form className="b-box-form" onSubmit={this.handleSumbit}>
                        <div className="input-group">
                            <label htmlFor="xPos">
                                <span> X Position </span>
                                <input id="xPos" value={this.state.formData.xPos} onChange={this.handleChange} placeholder="enter x" type="number" min="0"></input>
                            </label>
                            <label htmlFor="yPos">
                                <span> Y Position </span>
                                <input id="yPos" value={this.state.formData.yPos} onChange={this.handleChange} placeholder="enter y" type="number" min="0"></input>
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="width">
                                <span> Width </span>
                                <input id="width" value={this.state.formData.width} onChange={this.handleChange} placeholder="enter width" type="number" min="0"></input>
                            </label>
                            <label htmlFor="height">
                                <span> Height </span>
                                <input id="height" value={this.state.formData.height} onChange={this.handleChange} placeholder="enter height" type="number" min="0"></input>
                            </label>
                        </div>

                        { /* ----------- ERROR MESSAGE ----------- */}
                        <p className="hint-message">{this.state.message}</p>

                        { /* ----------- SUBMIT ----------- */}
                        <input className="add-box-btn" type="submit" value="Draw B-Box" />
                    </form>
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}


export default ImageEditor