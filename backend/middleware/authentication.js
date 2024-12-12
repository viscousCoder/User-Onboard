// const { validateToken } = require("../services/auth");

// function checkForAuthenticationCookie(cookieName) {
//   return (req, res, next) => {
//     const tokenCookieValue = req.cookies[cookieName];
//     if (!tokenCookieValue) {
//       return next();
//     }

//     try {
//       const userPaylaod = validateToken(tokenCookieValue);
//       req.user = userPaylaod;
//     } catch (error) {}
//     return next();
//   };
// }

// module.exports = { checkForAuthenticationCookie };

const { handleCheckToken } = require("../services/token");
async function checkAuthentication(){
    return (req,res,next)=>{
        const token = req.headers.authorization
        if()
    }
}
