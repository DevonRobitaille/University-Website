module.exports = (req, res, next) => {
    if (req.user_permission === 2 || req.user_permission === null || req.user_permission === undefined) {
        return res.status(403).json({error: 'Forbidden'})
    }
    next();
}
