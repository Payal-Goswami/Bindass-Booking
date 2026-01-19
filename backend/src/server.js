import 'dotenv/config';
import app from './app.js';
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/", (req, res)=>{
  res.send("Hi! I am root:)");
})