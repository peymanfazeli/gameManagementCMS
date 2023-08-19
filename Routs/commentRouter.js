const { Router } = require("express");
const commentRoute = Router();

const Games = require("../DB/schemas/games");
const Comments = require("../DB/schemas/comments");

commentRoute.get('/comments',async(request,response)=>{
    const{userId}=request.params;
    if(userId){
        let user=await User
        return response.json({user:user})
    }
});

module.exports = commentRoute;
