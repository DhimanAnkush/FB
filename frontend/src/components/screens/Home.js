import Card from './Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect} from 'react'
import { Link,useHistory } from 'react-router-dom';
import Homenav from './Homenav';
import {UserContext} from '../../App';
import {InputGroup,FormControl} from "react-bootstrap";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';



const Home = (props) => {
  const history = useHistory();
  const [data,setData] = useState([]);
  const {state,dispatch} = React.useContext(UserContext)
  const [user,setUser] = useState('')
  const [searching, setSearching] = useState([]);
  const [searchBar, setSearchBar] = useState(false);

    useEffect(()=>{


      

      fetch('/allpost',{
        method:"get",
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("jwt"),
        }
      }).then(res=>res.json()).then(result=>{
        setData(result.posts)
      });
    },[])
    
    const updateHome = (result) =>{
      const newData = data.filter(item=>{
        return item._id !== result._id;
      })
      setData(newData);
    }

    const updateData = (result) =>{
      const newData = data.map((item)=>{
        if(item._id===result._id)
        {
          return result;
        }
        else{
          return item;
        }
      })
      setData(newData);
    }

const searched = (query) =>{
  setUser(query)

  fetch('/search-users',{
    method:'post',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      query,
    })
  }).then(res=>res.json()).then(results=>setSearching(results))
}






  const createPost = () => {
    history.push('/create')
  }
  return (
    <>
    <div className='container-fluid'>
        <Homenav />
        
        <div className='row'>

        <div className='col-md-6 post' style={{backgroundColor:'#23395b'}}>
         
          <div>
          <InputGroup className="p-3" size='lg'>
            <FormControl
              aria-label="Example text with button addon"
              aria-describedby="basic-addon1"
              placeholder='Search' 
              
              onFocus = {(e) => (e.target.placeholder = '')}
              onBlur = {(e) => {
                setSearchBar(false);
                e.target.placeholder = 'Search'
              }}
              onChange = {(e) => {
                console.log(e.target.value)
              searched(e.target.value)
              }}
              onClick = {() => {
                setSearchBar(true);
              }}

              />
              <h2>{searching.map(item=>{
                return item.name;              })}</h2>
            <Button className='text-light' onClick={searched} variant="primary"><SearchIcon/></Button>
          </InputGroup>

          {
            searchBar ? (
              <div className='d-grid text-dark rounded-3' style={{background:'#161925'}} data-aos="fade-down">
              
                {/* {
                  props.comments.map(record => {
                    return (
                      <>
                        <h6 className=''>{record.postedBy.name}</h4>
                        <h6 className=''> <span style={{ fontWeight: "500"}} className='border-bottom comment'></span>{record.text}</h6>
                      </>
                    )
                  })
                } */}
                <Link exact className='itemsInSearch m-3 h-50' to=''>NamesHere</Link> 
                <Link exact className='itemsInSearch m-3 h-50' to=''>NamesHere</Link> 
                <Link exact className='itemsInSearch m-3 h-50' to=''>NamesHere</Link> 
                <Link exact className='itemsInSearch m-3 h-50' to=''>NamesHere</Link> 
                <Link exact className='itemsInSearch m-3 h-50' to=''>NamesHere</Link> 
              </div>
            ) : (
              <>
              </>
            )
          }
            
          </div>
          <div className='p-3 text-center'>
            <button onClick={createPost} className='btn btn-warning' style={{width:'200px'}}>Create Post </button>
          </div>
        </div>

        </div>
    </div>

    {
      data.map(item=>{
        return (
          <Card body={item.body} postedBy={item.postedBy.name} photo={item.photo} key={item._id} 
          id={item._id}  likes={item.likes} isLiked={item.likes.includes(state._id)} 
          comments={item.comments} postedById={item.postedBy._id} updateFunc={updateData}
          updateHome={updateHome}
          />
        )
      })
    }
      

    </>
  )
}

export default Home;