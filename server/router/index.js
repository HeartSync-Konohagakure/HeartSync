const UserController = require("../controllers/userController");
const errorHandler = require("../middlewares/errorHandler");

const router = require("express").Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "HeartSync landing page"})
})

router.post("/register", UserController.register);

router.use(errorHandler);

module.exports = router