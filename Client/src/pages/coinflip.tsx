import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function coinflip() {
  const [imageSrc, setImageSrc] = useState("images/coin.png");

  const changeImage = () => {
    setImageSrc("images/catlaughing.jpg"); // Byt bild
    setTimeout(() => {
      setImageSrc("images/coin.png"); // Byt tillbaka efter 5 sekunder
    }, 5000);
  };

  return (
    <div className="container">
      <img className="game-images" src={imageSrc} alt="coin" />
      <button className="btn btn-primary mt-3" onClick={changeImage}>
        Vinn pengar knappen
      </button>
    </div>
  );
}

export default coinflip;
