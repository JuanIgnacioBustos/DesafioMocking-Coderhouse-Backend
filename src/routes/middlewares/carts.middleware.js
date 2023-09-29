export const verifyCartAccess = (req, res, next) => {
        if (req.user.cart === req.params.cid)  {
        next() /*  Todo bien (el carrito es el del usuario) */
        }
        else {
        res.send({status: "failure", details: "You can only use your cart"})
        }
    }