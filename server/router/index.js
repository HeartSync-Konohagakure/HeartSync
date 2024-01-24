const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

const router = require("express").Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "HeartSync landing page"})
})

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

router.get("/users",UserController.fetchUsers);

router.use(errorHandler);

module.exports = router