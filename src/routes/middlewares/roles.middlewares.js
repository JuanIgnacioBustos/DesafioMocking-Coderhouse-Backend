export const adminRoleAuth = (req, res, next) => {
        if (req.user.role === "admin") {
        next();
        }
        else {
        res.send({ status: "failure", details: "You don't have access. Must be an admin" })
        }
    }
    
    export const userRoleAuth = (req, res, next) => {
        if (req.user.role === "user") {
        next();
        }
        else {
        res.send({ status: "failure", details: "You don't have access. Must be an user" })
        }
    }