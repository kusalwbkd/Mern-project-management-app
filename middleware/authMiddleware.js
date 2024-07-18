import { BadRequestError, UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js"
import { verifyJWT } from "../utils/tokenUtils.js"

export const authenticateUser=(req,res,next)=>{
const{token}=req.cookies
console.log(token);
if(!token){
    throw new UnauthenticatedError('authentication invalid')
}

try {
    const {userId,role}=verifyJWT(token)
  req.user={userId,role}
    next()
} catch (error) {
    throw new UnauthenticatedError('authentication invalid')
}
   
}


 export const authorizePermissions=(...roles)=>{

return(req,res,next)=>{
    if(!roles.includes(req.user.role)){
throw new UnauthorizedError('unauthorized to access this route')
    }
    next()
}
    
} 

/* 
export const authorizePermissions=(req,res,next)=>{
   if(!(req.user.role === 'admin')){
    throw new UnauthorizedError('unauthorized to access this route')
   }
    next()
} */

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) {
      throw new BadRequestError('Demo User. Read Only!');
    }
    next();
  };