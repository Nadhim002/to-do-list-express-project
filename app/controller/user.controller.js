import {User} from "../model/user.model.js"

// @desc   Create new user
// @route  POST /user/

export function addUser( req , res , next ){

    const user = new User( req.body )

    user.addUser()
        .then( ([lastId , _ ]) => { res.status(200).json({ msg : `Created user with id - ${lastId}`}) } )
        .catch( err => next(err) )

}

// @desc   Delete user using ID
// @route  POST /user/:id

export function deleteuser( req , res , next ){


    const idToDelete = parseInt( req.params.id )

    if ( isNaN( idToDelete ) ){ 
        res.status(400).json({ msg: `User ID must be a Number` })
        return
    }

    User.deleteUser(idToDelete)
    .then( ( [_ , change ]) => {

      if (change) {
        res.status(200).json({ msg: `The user with ${idToDelete} is deleted` })
        return
      }
  
      res.status(400).json({ msg: `The User with ${idToDelete} is not Found` })

    }
    )
    .catch( err => next(err) )

}

