import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'
import NewMeetupForm from "../../components/meetups/NewMeetupForm"

const NewMeetupPage = () => {
    const router = useRouter()
    const addMeetupHandler = async (enteredMeetup) => {
      //same server for frontend 
      //this will send a request to this new-meetup file in the api folder
        const response = await fetch('/api/new-meetup', {
          method: 'POST',
          body: JSON.stringify(enteredMeetup),
          headers: {
            'Content-Type' :  'application/json'
          }
        })

        const data = await response.json()
        console.log(data)

        router.push('/')
    }
  return (
    <div>
        <Head>
            <title>Add a New Meetup</title>
            <meta 
                name='description'
                content='Browse a huge list of highly active React meetups'
            />
        </Head>
        <NewMeetupForm  onAddMeetup = {addMeetupHandler}/>
    </div>
  )
}

export default NewMeetupPage