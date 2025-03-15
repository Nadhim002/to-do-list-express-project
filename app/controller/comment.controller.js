 import { Comment } from "../model/comment.model.js"

export function createComment( req , res , next  ){

    const comment =  new Comment( req.body )

    if( ! comment.comment_content ){
        res.status(400).json( { err : `Need Comment content to add comment` } )
        return
    }

    console.log( comment  )

    if( isNaN( comment.project_id  ) || isNaN( comment.task_id  )  ){
        res.status(400).json( { err : `Enter Proper Project ID or Task ID` } )
        return
    }

    comment.createComment()
        .then( ([ lastId , _ ])  => { res.status(200).json({ msg : `Comment has been added with id - ${lastId}`}) } )
        .catch( err => next(err) )

  }

export function getComment( req , res , next  ){


    const projectId = req.params.projectId

    if( isNaN( projectId )   ){
        res.status(400).json( { err : `Enter Valid Project Id` } )
        return
    }

    Comment.getComment( projectId  )
        .then( commentsData => res.status(200).json(commentsData) )
        .catch( err => next(err) )

  }

export function updateComment( req , res , next  ){ 

    const commentId = req.params.id 
    const contentToUpdate = req.body.commentContent

    if( isNaN( commentId )   ){
        res.status(400).json( { err : `Enter Valid Comment Id` } )
        return
    }

    if( ! contentToUpdate ){
        res.status(400).json( { err : `Need Comment content to update comment` } )
        return
    }

    Comment.updateComment( commentId , contentToUpdate )

    .then( ( _ , changes ) => {

        if(changes){
            res.status(200).json({msg : `Comment with id - ${commentId} has been Updated`})
            return
        }

        res.status(400).json({msg : `Comment with id - ${commentId} has been found`})

    } )
    .catch( err => next(err) )
    

 }

export function deleteComment( req , res , next  ){ 

    const commentId = req.params.id 

    if( isNaN( commentId )   ){
        res.status(400).json( { err : `Enter Valid Comment Id` } )
        return
    }

    Comment.deleteComment(  commentId )

        .then( ( _ , changes ) => {

            if(changes){
                res.status(200).json({msg : `Comment with id - ${commentId} has been deleted`})
                return
            }

            res.status(400).json({msg : `Comment with id - ${commentId} has been found`})

        } )
        .catch( err => next(err) )


 }


// const dictionary = { content : "Hello World" , task_id : null }


// console.log( " task_id " , Number( dictionary.task_id ) )
// console.log( " project_id " , Number( dictionary.project_id ) )

// if( isNaN( dictionary.project_id  ) || isNaN( dictionary.task_id  )  ){

//     console.log({ err : `Need Comment content to add comment` } )
    
// } 