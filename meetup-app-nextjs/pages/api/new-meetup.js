import {MongoClient} from "mongodb"
// api/new-meetup

async function handler(req , res) {
    if( req.method === 'POST'){
        const data = req.body

        const client = await MongoClient.connect('mongodb+srv://damla:Damla123.@cluster0.gywvewv.mongodb.net/meetups?retryWrites=true&w=majority')

        //hold database that we connect 
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        //inserting one new documnet into this collection and the documet is the standart js object
        const result = await  meetupsCollection.insertOne(data)
        console.log(result)

        //close the database connection when we aare done 

        client.close()

        res.status(201).json({
            message: "Meetup inserted"
        })
    }
}

export default handler