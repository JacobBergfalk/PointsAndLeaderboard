import { app } from "./router/start";


/**
* App Variables
*/


const PORT : number = 8080;


/**
* Server Activation
*/


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});