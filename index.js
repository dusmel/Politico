import morgan from 'morgan';
import express from 'express';
import routes from './server/routes/routes';


const app = express();


if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}


app.use(express.json());
app.use(routes);


app.get('/', (req, res) => {
  res.status(200).send('Welcome to POLITICO');
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port} ...`);
});


export default app;
