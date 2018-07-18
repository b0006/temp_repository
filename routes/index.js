var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', {
        head: 'Добро пожаловать в игру "Шашки"',
        choose_mode_game : "Y"
    });

});

router.post('/game/', function(req, res, next) {
    let mode_game = req.body.mode_game;
    let level_game = req.body.game_level;

    let arResponse = {
        head: 'Добро пожаловать в игру "Шашки"',
        choose_mode_game : "Y"
    };

    if(mode_game === "CP") {
        arResponse = {
            head : "Выберите сложность",
            mode_game : mode_game,
            choose_level : "Y"
        };

        if(level_game) {
            arResponse = {
                head : "Шашки",
                mode_game : mode_game,
                level : level_game,
                load_board : "Y",
            };
        }
    }
    else if (mode_game === "PP") {
        arResponse = {
            head : "Шашки",
            mode_game : mode_game,
            load_board : "Y"
        };
    }


    res.render('index', arResponse);

});

module.exports = router;
