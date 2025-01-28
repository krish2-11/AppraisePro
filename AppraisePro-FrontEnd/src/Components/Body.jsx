import React from 'react'
import '../Design/Body.css'
import Card from './Card';

const Body = () => {
  return (
    <div className='body'>
            <div className='greetings'>Welcome To AppraisePro</div>
            <div className='user-card'>
                <Card key='1' name='Administration Portal' link='/admin' url='/admin.png'/>
                <Card key='2' name='Faculty Portal' link='/faculty/login' url='/lecture.png'/>
            </div>
    </div>
  )
}

export default Body