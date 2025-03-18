 import { Comment } from "../model/comment.model.js"

// @desc  Create new comment
// @route  POST /comment

export function createComment( req , res , next  ){

    const comment =  new Comment( req.body )

    if( ! comment.commentContent ){
        res.status(400).json( { err : `Need Comment content to add comment` } )
        return
    }

    if( isNaN( comment.projectId  ) || isNaN( comment.taskId  )  ){
        res.status(400).json( { err : `Enter Proper Project ID or Task ID` } )
        return
    }

    comment.createComment()
        .then( ( createdComment )  =>  res.status(200).json( createdComment )  )
        .catch( err => next(err) )

  }

// @desc  Get Commnets by ProjectId
// @route  GET /comment/:projectId

export function getComment( req , res , next  ){

    const projectId = req.params.projectId
    const pageSize = parseInt(req.body?.pageSize) || 10 
    const lastSeenCommentId = parseInt( req.body?.lastSeenCommentId ) || 0 


    if( isNaN( projectId )   ){
        res.status(400).json( { err : `Enter Valid Project Id` } )
        return
    }

    Comment.getComment( projectId   ,  pageSize  , lastSeenCommentId   )
        .then( commentsData => res.status(200).json(commentsData) )
        .catch( err => next(err) )

  }

// @desc  Updates comment content
// @route  PATCH /comment/:id

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

    .then( (  updatedComment ) => {

        if( updatedComment.length > 0  ){
            res.status(200).json( updatedComment )
            return
        }

        res.status(400).json({err : `Comment with id - ${commentId} has not been found`})

    } )
    .catch( err => next(err) )
    

 }

// @desc  Delete the comment
// @route  DELETE /comment/:id

export function deleteComment( req , res , next  ){ 

    const commentId = req.params.id 

    if( isNaN( commentId )   ){
        res.status(400).json( { err : `Enter Valid Comment Id` } )
        return
    }

    Comment.deleteComment(  commentId )

        .then( ( deletedComment  ) => {

            if( deletedComment.length > 0  ){
                res.status(200).json( deletedComment )
                return
            }

            res.status(400).json({ err : `Comment with id - ${commentId} has been found`})

        } )
        .catch( err => next(err) )


 }

