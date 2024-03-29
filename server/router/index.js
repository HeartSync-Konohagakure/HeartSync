const ChatController = require("../controllers/chatController");
const MatchesController = require("../controllers/matchesController");
const UserController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorizationUser = require("../middlewares/authorization");
const errorHandler = require("../middlewares/errorHandler");

const router = require("express").Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "HeartSync landing page"})
})

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use(authentication);

router.get("/users",UserController.fetchUsers);
router.get("/users/profile", authorizationUser, UserController.userProfile);
router.put("/users", authorizationUser, UserController.updateUser);
router.delete("/users", authorizationUser, UserController.deleteUser);

router.post("/users/like/:idUser", MatchesController.likeUser);
router.post("/users/unlike/:idUser", MatchesController.dislike);
router.get("/users/matches", MatchesController.fetchMatch);

router.post("/chat/:idUser", ChatController.createChat);
router.get("/chat/find", ChatController.getUserChat);

router.post("/message", ChatController.sendMessage);
router.get("/message/:ChatId", ChatController.fetchMessage);

router.use(errorHandler);

module.exports = router