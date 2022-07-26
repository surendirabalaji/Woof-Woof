import React from 'react'
import {FiMoreVertical} from 'react-icons/fi'
import {FcLike} from 'react-icons/fc'
import {SiDatadog} from 'react-icons/si'
import {GoLocation} from 'react-icons/go'
import {MdOutlineContactPhone} from 'react-icons/md'
import {TbVaccine} from 'react-icons/tb'
import {useEffect,useState} from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import classes from './ProfilePage.module.css'

function ProfilePage  ({forwardUsername})  {
  const [Post, setPost] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const [Phone, setPhone] = useState('');
  const [Auser,setAuser] = useState('');
  const [User, setUser] = useState('');
  const [Aid,setAid] = useState('');
  const [Fname, setFname] = useState('');
  const [Status, setStatus] = useState('');
  const [Post1,setPost1] = useState([]);
  const [Post2,setPost2] = useState([]);
  var string;
  useEffect(() => {
       getPost();
  }, [refreshCount])    

  const getPost = async ()=>{
      console.log("getting post")
        
      const res = await fetch("http://localhost:8000/Profile",{
          credentials: 'include',
          method: 'POST',
          headers :{
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
           },
          body : JSON.stringify({
            uname: forwardUsername.username
       })
      })
      console.log(forwardUsername.username)
      const reponse = await res.json()
      console.log(reponse)
      let res1 = reponse.result1
      let res2 = reponse.result2
      console.log(res1);
      if(reponse.result && reponse.result.length){
        console.log("result")
        setPost(await reponse.result)
      }
      if(reponse.result1 && reponse.result1.length){
        console.log("result1")
        setPost1(res1)
        console.log(Post1)
      }
      if(reponse.result2 && reponse.result2.length){
        console.log("result2")
        setPost2(res2)
      
      }
    
  }
  async function submitHandler(event,onSubmitProps){
    event.preventDefault();
    await setUser(document.getElementById('puser').value)
    await setAid(document.getElementById('paid').value)
    await setFname(document.getElementById('pimg').src)

  /*  let fd= new FormData()
    fd.append('Auser',Auser)
    fd.append('phone',Phone)
    fd.append('User', User)
    fd.append('aid',Aid)?*/
    if(!User || !Aid) {
        return;
    }
    const formData = {
        Auser,Phone,User,Aid,Fname,Status
    }
    console.log(formData)
    let res =  await fetch("http://localhost:8000/AdopterPop",{
            method : 'POST',
            headers :{
                   'Accept' : 'application/json',
                   'Content-Type': 'application/json'
            },
            body : JSON.stringify(formData)
    })
    const result = await res.json();
    console.log(result);
    setAuser('')
    setPhone('')
    }
 
  return (
    <div className="feed">   
        <div className="refresh">
            <button className={classes.rbtn} onClick={() => {console.log(refreshCount); setRefreshCount(refreshCount + 1)}}>Refresh</button>
        </div> 
        {!Post || !Post.length && <div></div>}
        {Post && Post.length ? Post.map((post) => {
            string = post.fname;
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
                    <img src={new_string1} alt='' className='feedImg' id='pimg'/><br/>
                    <div className='feedCenterBottom'>
                        <span className="feedBreedName"><SiDatadog/><h5>{post.name}</h5></span>
                        <span className="feedLocation"><GoLocation/><h5>{post.location}</h5></span>
                        <span className="feedContact"><MdOutlineContactPhone/><h5>{post.phone}</h5></span>
                        <span className="feedVaccination"><TbVaccine/><h5>{post.vaccine}</h5></span>     
                    </div> 
                </div>
                <div className="feedBottom">
                    <span className="feedLike"><FcLike/></span>
                    <span className="feedLikeCounter">'Rescued' is my favourite breed</span>
                </div>
                <div>
                    <Popup trigger={<button className={classes.btn}>Edit</button>}  modal position="right center">
                    <div className={classes.Upload}>
                        <div className={classes.Wrapper}>
                        <form onSubmit={submitHandler} method="POST" className={classes.form} enctype="multipart/form-data" action='/Upload'>
                        <div className={classes.control}>    
                                    <label htmlFor="aid">Animal ID</label>
                                    <input type="text" value ={post.a_id} name="aid" id="paid"  size="30" maxLength={30} required disabled  />
                                </div>                           
                                <div className={classes.control}>    
                                    <label htmlFor="User">User Name</label>
                                    <input type="text" value ={post.user} name="user" id="puser"  size="30" maxLength={30} required disabled  />
                                </div> 
                                <div className={classes.control}>    
                                        <label htmlFor="Auser">Adopter Name</label>
                                        <input type="text" name="Auser" id="Auser" size="30" maxLength={30} placeholder="Enter the Adopter Name" required onChange={(e)=> setAuser(e.target.value)}/>
                                </div>               


                                <div  className={classes.control}>    
                                        <label htmlFor="phone">Phone</label>
                                        <input type="number" id="phone" name="phone" value={Phone} placeholder="Enter a valid Phone number" size="12" required onChange={(e)=> setPhone(e.target.value)}/>
                                </div>     
                                <div className={classes.control}>
                                    <label htmlFor="Status" >Status</label>
                                    <select id="status"  name="status" required onChange={(e)=> setStatus(e.target.value)}>
                                    <option value="none" selected disabled hidden>Select an Option</option>
                                    <option value="Adopt">Adopted</option>
                                    <option value="Foster">Fostered</option>
                                    </select>
                                </div>
                                <div className={classes.actions}>
                                        <button type="submit" id="submit" name="submit" onSubmit={submitHandler}>SUBMIT</button>
                                </div>
                                </form>
                        </div>
                    </div>
                    </Popup>
                </div>
            </div>);
        }) :
        <div></div>} 


{!Post1 || !Post1.length && <div></div>}
        {Post1 && Post1.length ? Post1.map((post) => {

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
                    <img src={post.fname} alt='' className='feedImg' id='pimg'/><br/>
                    <div className='feedCenterBottom'>
                        <span className="feedBreedName"><SiDatadog/><h5>Adopter: {post.adname}</h5></span>       
                        <span className="feedContact"><MdOutlineContactPhone/><h5>Adopter Phone:{post.adphone}</h5></span>
                       
                    </div> 
                </div>
                <div className="feedBottom">
                    <span className="feedLike"><FcLike/></span>
                    <span className="feedLikeCounter">'Rescued' is my favourite breed</span>
                </div>
            </div>);
        }) :
        <div></div>} 

        {!Post2 || !Post2.length && <div></div>}
        {Post2 && Post2.length ? Post2.map((post) => {

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
                    <img src={post.fname} alt='' className='feedImg' id='pimg'/><br/>
                    <div className='feedCenterBottom'>
                        <span className="feedBreedName"><SiDatadog/><h5>Foster Name: {post.fosname}</h5></span>       
                        <span className="feedContact"><MdOutlineContactPhone/><h5>Foster Phone:{post.fosphone}</h5></span>
                       
                    </div> 
                </div>
                <div className="feedBottom">
                    <span className="feedLike"><FcLike/></span>
                    <span className="feedLikeCounter">20 People Liked it</span>
                </div>
            </div>);
        }) :
        <div></div>} 
    </div>
  )
}

export default ProfilePage;