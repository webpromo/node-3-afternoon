
module.exports = function(req,res,next){
    if (req.session.user) {
        next;
    } else {
        session.user = {
            username: '',
            cart: [],
            total: 0
        }
    }
}