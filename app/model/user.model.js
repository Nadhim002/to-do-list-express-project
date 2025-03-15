import dBCallWithPromise from "../config/promiseBasedDbCalls.js"


export class User{

    constructor( user ){

      this.user_name =  user.userName 
      this.user_mail =  user.userMail

    }


    addUser(){

        const sqlQuery = "insert into users ( user_name , user_mail )  values( ? , ?  ) "
        const values = [ this.user_name , this.user_mail ]
        return dBCallWithPromise.run( sqlQuery , values )
        
    }

    static deleteUser( id ){ 

      const sqlQuery = "delete from users where user_id = ? "
      const values = [id]

      return dBCallWithPromise.run( sqlQuery , values )

    }

}