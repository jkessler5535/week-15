import './App.css';
import {useState, useEffect} from 'react'



function App() {

  const MOCK_API_URL= 'https://64b3331d38e74e386d55eda0.mockapi.io/users'

  const [users, setUsers] = useState([{}])

  const [newUserName, setNewUserName] = useState('')
  
  const [newUserJobTitle, setNewUserJobTitle] = useState('')
  
  const [newUserCompanyName, setNewUserCompanyName] = useState ('')
  
  //updatedName, updatedJobTitle, and updatedCompanyName
  const [updatedName, setUpdatedName] = useState('')
  const [updatedJobTitle, setUpdatedJobTitle] = useState('')
  const [updatedCompanyName, setUpdatedCompanyName] = useState('')




function getUsers(){
  fetch(MOCK_API_URL)
  .then(data => data.json())
  .then(data => setUsers(data))
}

useEffect(() => {
  getUsers()
  console.log(users)
}, [])

function deleteUser(id){
  fetch(`${MOCK_API_URL}/${id}`, {
    method: "DELETE"
  }) .then(() => getUsers())
}

function postNewUser(e){
  e.preventDefault()


  fetch(MOCK_API_URL, {
    method: "POST",
    headers:{"Content-type": "application/json"},
    body: JSON.stringify({
    name: newUserName,
    jobTitle: newUserJobTitle,
    companyName: newUserCompanyName,
    })
  }).then(() => getUsers())
}

function updateUser(e, userObject){
  e.preventDefault()

  let updatedUserObject = {
    ...userObject,
    name: updatedName ,
    jobTitle: updatedJobTitle,
    companyName: updatedCompanyName,
  }

  fetch(`${MOCK_API_URL}/${userObject.id}`, {
    method:"PUT",
    body: JSON.stringify(updatedUserObject),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(() => getUsers())

}

  return (
  <div className="App">
  <div className="container card  mt-5 p-5    bg-secondary">
      <form>
        <h3 className="text-light bold text-center mb-5">Simple CRUD Application:</h3>
        <label className="mr-3 text-white" htmlFor='newUserName'>Name:</label>
        <input className="mr-3" onChange={(e) => setNewUserName(e.target.value)} type='text' id='newUserName'></input>
        <label className="mr-3 text-white" htmlFor='newJobTitle'>Job TItle:</label>
        <input className="mr-3" onChange={(e) => setNewUserJobTitle(e.target.value)} type='text' id='newJobTile'></input>
        <label className="mr-3 text-white" htmlFor='newCompanyName'>Company Name:</label>
        <input onChange={(e) => setNewUserCompanyName(e.target.value)} type='text' id='newCompanyName'></input>
        <button className="btn btn-primary ml-3" onClick={(e) => postNewUser(e)}>Submit</button>
      </form>



    {users.map((user, index) => (
    <div className=" bg-light p-5 mt-5" key={index}>
      <div className="pb-5 text-center">
        <label>Name:{user.name}</label><br></br>
        <label>Job Title: {user.jobTitle}</label><br></br>
        <label>Company Name: {user.companyName}</label><br></br>
        <button className="btn btn-danger mt-2" onClick={() => deleteUser(user.id)}>Delete</button>
      </div>

      <div className="text-center">
        <form>
          <h3 className="text-light bg-dark p-2 text-center mb-5">Update This User</h3>
        <div>
          <label className="mr-5 pr-3">Update Name:</label>
          <input onChange={(e) => setUpdatedName(e.target.value)}></input>
        </div>
        <br></br>

        <div>
          <label className="mr-5">Update Job Title:</label>
          <input onChange={(e) => setUpdatedJobTitle(e.target.value)}></input>
          </div>
          <br></br>

        <div>
          <label className="mr-2">Update Company Name:</label>
          <input onChange={(e) => setUpdatedCompanyName(e.target.value)}></input><br></br>
          <button className="btn btn-warning mt-4" onClick={(e) =>updateUser(e, user)}>Update</button>
        </div>
        </form>
      </div>
    </div>
    ))}
    </div>
  </div>
  )
}

export default App;
