require('dotenv').config()

const express = require('express');
const cors = require('cors')
const app = express();

const { ApolloServer, gql } = require('apollo-server-express');
const { applyMiddleware } = require('graphql-middleware');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


const SpotifyWebApi = require('spotify-web-api-node')
const bodyParser = require('body-parser');


// main().catch(err => console.log(err));

app.use(cors())
app.use(bodyParser.json())

const typeDefs2 = gql`
    type Query {
        hello: String!
    }`


const server = new ApolloServer({
    typeDefs,
    resolvers
})

async function startApolloServer() {
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const server = new ApolloServer({ schema });

    await server.start()
    
    server.applyMiddleware({ app });

    await mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
    .then(() => {
        console.log('FOUND THE DB!');
        return app.listen({port: process.env.SERVER_PORT});
    })


//  #  app.listen(process.env.SERVER_PORT)
}


startApolloServer()


// WEBSOCKET STUFF
const io = require('socket.io')(3001, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log('Socket connected');
})



// SPOTIFY STUFF
const credentials = {
    redirectUri: 'http://localhost:3000',
    clientId: 'b4ae8ca338c348bfba00ad3f62230966',
    clientSecret: '55c4be8339254eb2867a89b06f1baf7d',
  }

app.post("/spotifylogin", (req, res) => {
    const code = req.body.spotifyCode
    console.log(code)
    const spotifyApi = new SpotifyWebApi(credentials)

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch((err)=> {
        console.log(err)
        res.sendStatus(400)
    })
})

app.get('/hey', (req, res) => {
    console.log(req.body)
    res.send('Hey now dog!')
})



