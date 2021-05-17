import { Link } from '@material-ui/core';
import React, { useState } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import SendIcon from '@material-ui/icons/Send';
import 'bootstrap/dist/css/bootstrap.min.css';


const Card = () => {

  const [liketoggle,setLikeToggle] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const [commText,setCommText] = useState('');


  const toggleClick = () => {
    setLikeToggle(!liketoggle)
  }

  const toggleComtClick = () => {
    setCommentToggle(!commentToggle);
  }

  


  return(
    <>
      <div className=' container-fluid posts'>
        <div className='row'>
          <div className='col-md-8 bg-light post'>
            <div className='border-bottom my-3 p-2'>
              <Link to='/profile'>ProfileName</Link>
              <p className='my-3'>Somedecription about post if exists</p>
            </div>
            <div className='image border-bottom p-2'>
              <img src='https://source.unsplash.com/collection/190727/600x400' alt='thisImage'/>
            </div>

            <div className='p-2 d-flex justify-content-center'>
              {liketoggle ? (<button className='m-2 btn btn-outline-primary' onClick={toggleClick}><ThumbUpIcon/></button>) : (<button className='m-2 btn btn-outline-secondary' onClick={toggleClick}><ThumbUpAltOutlinedIcon/></button>) }
              

              {commentToggle ? 
              (
                <form>
                  <div className='d-flex'> 
                    <button className='m-2 btn btn-outline-primary' onClick={toggleComtClick}><CommentOutlinedIcon/></button>
                    <input type='text' style={{marginLeft:'100px'}} placeholder='comment here' onChange={(event)=>{setCommText(event.target.value)}} className='form-control'/>
                    <button className='m-2 btn btn-outline-primary' onClick={()=>{
                      console.log(commText);
                    }}><SendIcon/></button>
                  </div>
                </form>
              ) : 
              (
                <div> 
                  <button className=' m-2 btn btn-outline-primary' onClick={toggleComtClick}><CommentOutlinedIcon/></button> 
                </div>
              )
              }
                
              </div>
            </div>

          </div>
        </div>

    </>
  );
}

export default Card;