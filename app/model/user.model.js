import { db , userTable } from "../config/drizzle.config.js"
import { eq } from "drizzle-orm"


export class User{

    constructor( user ){

      this.user_name =  user.userName 
      this.user_mail =  user.userMail

    }


    async addUser(){

      return  db.insert( userTable )
              .values( {
                userName : this.user_name , 
                userMail : this.user_mail
              } )
              .returning()

        
    }

    static deleteUser( id ){ 

      return db.delete( userTable )
              .where( eq( userTable.userId , id ) )
              .returning()
    }

}