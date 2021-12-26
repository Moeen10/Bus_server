const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()

// use middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dg42d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
    res.send(" ## Server Running well ✅✅")
})



async function run() {

    try {
        await client.connect();
        const database = client.db("BusWebsite");
        const busCollection = database.collection("Buses");
        const userCollection = database.collection("users");
        const reviewCollection = database.collection("reviews");
        const paymentRecord = database.collection("paymentRecord");
       
      
        app.get('/myRecord/:email', async (req, res) => {
                const email = req.params.email;
                const query = { email: email }
                const myRecord = await paymentRecord.find(query).toArray()
                console.log(myRecord)

                res.send(myRecord)
            })



      

      



      

        // // load single user
        app.get('/userInfo/:email', async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const result = await userCollection.findOne(query)
            // console.log("ki",result)
            res.send(result)
        })

    


        // add user to database when they register
        app.post('/addUsers', async (req, res) => {
            const user = req.body;
            const result = await userCollection.insertOne(user);
            const fres = result;
            // console.lof("hoise ",fres)
            res.send(result)
        })


        app.post('/paymentRecord', async (req, res) => {
            const paymentInfo = req.body;
            // console.log("hoise payment",paymentInfo)

            const result = await paymentRecord.insertOne(paymentInfo);
            const fres = result;
            res.send(result)
        })
// --------------------------

        app.put('/updateAmount', async (req, res) => {
            
            const money = req.body;
            console.log("Money",money)

            // console.log(user)
            const filter = { email: user.email };
            const updateDoc = {
                $set:{
                    amount: money.amount

                }
    
              };
              console.log("replace",replacement)
              const result = await userCollection.replaceOne(filter,updateDoc);
            res.json(result)
        })









        app.put('/addUsers', async (req, res) => {
            
            const user = req.body;
            console.log(user)
            const filter = { email: user.email };
            console.log("asenai",filter)
            const updateDoc = {
                $set: {
                    amount: 500 
                    
                },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.json(result)
        })



         // load all users and check they are admin or not
        app.get('/user/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            const user = await userCollection.findOne(query);
            console.log(user);
            let isAdmin = false
            if (user?.role === 'admin') {
                isAdmin = true
            }

            res.json({ isAdmin })

        })


        // make user admin 
        app.put('/makeAdmin', async (req, res) => {
            
            const user = req.body;
            console.log(user)
            const filter = { email: user.email };
            const updateDoc = {
                $set: {
                    role: 'admin' 
                    
                },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
            res.json(result)
        })


   



    }

    finally {
        // await client.close();
    }
}


run().catch(console.dir);

















app.listen(port, () => {
    console.log(`app listening at :${port}`)
})