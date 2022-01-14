import { Request, Response } from "express";
import {listings} from "./listings"
import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 9000;
app.use(bodyParser.json());



// list listings route

app.get('/listings', (_req: Request, res: Response) => {
  return res.send(listings);
});


// delete listings

app.post('/delete-listing', (req: Request, res: Response) => {

  const id:string = req.body.id;
  for(let i=0; i<listings.length; i++){
    if(listings[i].id === id){
      return res.send(listings.splice(i,1));
    }
 } })

app.listen(port);
