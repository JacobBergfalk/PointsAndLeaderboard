const postFlip = async () => {

    try{
        const response = await fetch('http://localhost:8080/game', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify( {
                    "choice": "tails",
                    "betAmount": 25
                }
            )
        });
        const result = response.json();
        return result;

    } catch (error){

        console.error("Error", error);
   
    }

}

export default postFlip;