const room = async (req, res, next) => {
    try {
        console.log(req.admin);
        next();
    } catch (err) {
        res.status(400).send({
            err: 'You did not have permission to do this action!',
        });
    }
};

module.exports = room;
