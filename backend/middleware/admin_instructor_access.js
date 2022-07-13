module.exports = (req, res, next) => {
    // Allow permission_id to be 1 or 2 (admin / instructor)
    if (req.user_permission > 2 || req.user_permission === null || req.user_permission === undefined) {
        return res.status(403).json({error: 'Forbidden'})
    }
    next();
}
