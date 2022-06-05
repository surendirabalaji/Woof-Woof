import React from 'react'
import {FiMoreVertical} from 'react-icons/fi'
import {FcLike} from 'react-icons/fc'
import {SiDatadog} from 'react-icons/si'
import {GoLocation} from 'react-icons/go'
import {MdOutlineContactPhone} from 'react-icons/md'
import {TbVaccine} from 'react-icons/tb'
import {useEffect,useState} from 'react'
import Pop from './Pop'

function ProfilePage  ({forwardUsername})  {
  const [Post, setPost] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  useEffect(() => {
       getPost();
  }, [refreshCount])    
  
console.log(forwardUsername.username)

  const getPost = async ()=>{
      const res = await fetch("http://localhost:8000/Profile",{
          credentials: 'include',
          method: 'POST',
          headers :{
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
           },
          body : JSON.stringify({
            "uname": forwardUsername.username
       })
      })
      const reponse = await res.json()
      setPost(await reponse.result)
      console.log(Post);
  }  
  
  return (
    <div className="feed">   
    <div className="refresh">
        <button onClick={() => setRefreshCount(refreshCount + 1)}>refresh</button>
    </div>    
    {Post && Post.length && Post.map((post) => {
                var string = post.fname;
                var new_string = string.replace("publicimages","");
                var new_string1 = 'http://localhost:8000/'+new_string;
        return (<div className="feedWrapper">
            <div className='feedTop'>
                <div className="feedTopLeft">      
                    <span className="feedUserName">{post.user}</span>
                    <span className="feedTime">5 mins ago</span>
                </div>
                <div className="feedTopRight">
                    <FiMoreVertical/>
                </div>
            </div>
            <div className="feedCenter">
                <img src={new_string1} alt='' className='feedImg'/><br/>
                <div className='feedCenterBottom'>
                    <span className="feedBreedName"><SiDatadog/><h5>{post.name}</h5></span>
                    <span className="feedLocation"><GoLocation/><h5>{post.location}</h5></span>
                    <span className="feedContact"><MdOutlineContactPhone/><h5>{post.phone}</h5></span>
                    <span className="feedVaccination"><TbVaccine/><h5>{post.vaccine}</h5></span>     
                </div> 
            </div>
            <div className="feedBottom">
                <span className="feedLike"><FcLike/></span>
                <span className="feedLikeCounter">20 People Liked it</span>
            </div>
            <Pop/>
        </div>);
    })} 

</div>
  )
}

export default ProfilePage