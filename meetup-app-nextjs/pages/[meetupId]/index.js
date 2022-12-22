import React from 'react'
import { MongoClient, ObjectId } from 'mongodb'
import MeetupDetail from '../../components/meetups/MeetupDetail'

const MeetupDetails = (props) => {
  return (
        <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}   
        />
  )
}


export async function getStaticPaths () {
    //fetch data from mongodb
    const client = await MongoClient.connect('mongodb+srv://damla:Damla123.@cluster0.gywvewv.mongodb.net/meetups?retryWrites=true&w=majority')

        //hold database that we connect 
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        const meetups = await meetupsCollection.find({} , {_id : 1}).toArray()

        client.close()
    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    /*     paths : [
            {
                params: {
                    meetupId : "m1"
                }
            },
            {
                params: {
                    meetupId : "m2"
                }
            },
        ] */
    }
}

export async function getStaticProps (context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb+srv://damla:Damla123.@cluster0.gywvewv.mongodb.net/meetups?retryWrites=true&w=majority')

        //hold database that we connect 
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId( meetupId) })

        client.close()

    console.log(meetupId)
    return {
        props : {
            meetupData : {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address:selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

export default MeetupDetails