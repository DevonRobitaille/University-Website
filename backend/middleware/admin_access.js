module.exports = (req, res, next) => {
    console.log("PERMISSION ID: " + req.user_permission)
    if (req.user_permission > 1 || req.user_permission === null || req.user_permission === undefined) {
        return res.status(403).json({error: 'Forbidden'})
    }
    next();
}
