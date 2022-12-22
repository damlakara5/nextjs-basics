import React, { Fragment } from 'react'
import Head from 'next/head'
import { MongoClient } from 'mongodb'
import MeetupList from "../components/meetups/MeetupList"


const HomePage = (props) => {
  return (
    <Fragment>
        <Head>
            <title>Meetups</title>
            <meta 
                name='description'
                content='Browse a huge list of highly active React meetups'
            />
        </Head>
        <MeetupList meetups = {props.meetups} />
    </Fragment>
  )
}

/* export async function  getServerSideProps ( context) {
    const req = context.req
    const res = context.res
    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    }
} */

export async function getStaticProps() {
    //fetch data from mongodb
    const client = await MongoClient.connect('mongodb+srv://damla:Damla123.@cluster0.gywvewv.mongodb.net/meetups?retryWrites=true&w=majority')

        //hold database that we connect 
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

       const meetups = await  meetupsCollection.find().toArray()
       client.close()
    //always returns an object
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()

            }))
        },
        //with revalidate the page is updated regularly after deployment
        revalidate: 10
    }
}


export default HomePage