import express from 'express';
//controllers
import mailController from "./Controllers/MailController.js";


//app aanmaken
const app = express();
app.use(express.json());

//server aanmaken
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//controller inlezen
mailController(app)