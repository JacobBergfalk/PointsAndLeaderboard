import Button from "react-bootstrap/Button";
import postFlip from "../assets/Methods/postFlipMethod"
//import fetchData from "../assets/Methods/getBalanceMethod"

function FlipButtonTest () {

    return (
        <div >
            <Button variant = "primary" onClick = {postFlip}> 
                Flip
            </Button>
        </div>
      );

}

export default FlipButtonTest