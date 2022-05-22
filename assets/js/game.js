const memoryMonkeyGame = document.querySelector("#mm-game");

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    parent: "mm-game",
    backgroundColor: "0",

    scene: {
        preload,
        create,
    },
};

const game = new Phaser.Game(config);
var size = 0.4;

function preload() {
    this.load.atlas("numbers", "assets/Numbers.png", "assets/numbers.json");
}

function create() {
<<<<<<< HEAD
    // checkUserData();
=======
    //checkUserData();
>>>>>>> b7541f580a5ff35abb1abdda04cd00a705db8ae0
    let sprites = [];
    // array x i array y zapisane w 1 array-u o nazwie coords (tzw nested arrays)
    let coords = [[], []];
    const x = 0;
    const y = 1;

    /*
    Generate X coords
    */
    for (let i = 300; i < 1100; i += 110) {
        coords[x].push(i);
    }

    /*
    Generate Y coords
    */
    for (let i = 200; i < 700; i += 110) {
        coords[y].push(i);
    }
    let allCoordsPairs = [];
    // funkcja poròwnujaca dodajce kordynaty
    function isArrayInArray(arr, arr2) {
        let array2_as_string = JSON.stringify(arr2); // zamieniamy liste na string by latwiej prownać z gòwna lista allCoordsPairs

        let contains = arr.some(function (same) {
            return JSON.stringify(same) === array2_as_string; // sprawdzamy czy sa takie same
        });
        console.log(contains);
        return contains; // oddajemy bool true lub false
    }
    // funkcja mieszajaca kolejnoscia indexow w array-x i arrayu -y
    function shuffle() {
        let allX = coords[0].sort(() => Math.random() - 0.5); // losowe ustawienie X-òw
        let allY = coords[1].sort(() => Math.random() - 0.5); // losowe ustawienie Y-òw
        let drawnX = allX[0]; // pierwszy x z listy
        let drawnY = allY[0]; // pierwszy y z listy
        let pairXY = [drawnX, drawnY];
        // jesli lista jest pusta lub funckcja daje bool false(czyli nie sa takie same)
        if (
            allCoordsPairs.length === 0 ||
            !isArrayInArray(allCoordsPairs, pairXY)
        ) {
            allCoordsPairs.push(pairXY); // dodjemy kordynaty do listy
        } else {
            shuffle(); // jak nie losujemy numery jeszcze raz
        }
        console.log(`allCordsPairs: ${allCoordsPairs}`);
        return drawnX, drawnY; // i w wyniku tej funcji dostajemy nowe kordynaty x i y
    }

    for (let step = 0; step < 9; step++) {
        // przy kazdym loopie odpalamy funkcje mieszajaca)
        shuffle();
        // l
        let xx = coords[0][0];
        let yy = coords[1][0];
        sprites[step] = this.add
            .image(xx, yy, "numbers", `sprite${step + 1}`)
            .setInteractive();
        // nadaje id dla kazdego sprite-a.
        sprites[step].id = step + 1;
        // this.time.addEvent({
        //     delay: 2000,
        //     callback: () => {
        //         sprites[step].setFrame(`spriteBlank`);
        //     },
        // });
        sprites[step].setScale(size);
    }
    // dodawanie click event by odkrywac karty w odpwiedzniej kolejności jak nie to game over
    let number = 2;
    let firstClick = true;
    // funkcja opózniajaca dzialanie w JS
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    function gameOver() {
        this.registry.destroy(); // destroy registry
        this.events.off();﻿ // disable all active events
        this.scene.restart();﻿﻿﻿﻿ // restart current scene
    }
        sprites.forEach(function (sprite) {
            sprite.on("pointerdown", function (pointer) {
                if (sprite.id ===1) {
                    for (let i = 1; i < sprites.length; i++) {
                        sprites[i].setFrame(`spriteBlank`);
                        firstClick = false;
                        sprite.destroy();
                    }
                } else if (sprite.id === number) {
                    sprite.destroy();
                    number += 1;
                } else {
                    sprites.map(sprite => {
                        sprite.setFrame(`sprite${sprite.id}`);
                    });
                    sleep(300).then(() => {
                        if (!alert('Game Over')) { window.location.reload(); }
                    });
                                       
                }
                
            });
            
        });
}
