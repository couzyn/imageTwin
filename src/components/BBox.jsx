 /*
------- BBOX / Functinoal components ---------
* props: xPos, yPos, width, height as % of the image
*/

const BBox = ({props}) => {

    const style = {
        left: props.xPos + '%',
        top: props.yPos + '%',
        width: props.width + '%',
        height: props.height + '%'
    }
    return (
    <div className="b-box" style={style}/>
    )
}
export default BBox