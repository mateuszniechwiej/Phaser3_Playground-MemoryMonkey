const memoryMonkeyGame = document.querySelector('#mm-game');

const config = {
    
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    parent: 'mm-game',
    backgroundColor: "0",

    scene: {
        preload,
        create,
        //update

    }
}

const game = new Phaser.Game(config)
var size = (0.4);


function preload() {

    this.load.atlas('numbers', 'assets/Numbers.png', 'assets/numbers.json');

}

function create() {
    // checkUserData();
    let sprites = [];
    // array x i array y zapisane w 1 array-u o nazwie coords (tzw nested arrays)
    let coords = [[], []];
    const x = 0;
    const y = 1;

    /*
    Generate X coords
    */
    for (let i = 100; i < 900; i += 110) {
        coords[x].push(i);
    }

    /*
    Generate Y coords
    */
    for (let i = 100; i < 600; i += 110) {
        coords[y].push(i);
    }
    let allCoordsPairs = [];
    // funkcja poròwnujaca dodajce kordynaty 
    function isArrayInArray(arr, arr2) {
        let array2_as_string = JSON.stringify(arr2); // zamieniamy liste na string by latwiej prownać z gòwna lista allCoordsPairs

        let contains = arr.some(function (same) {
            return JSON.stringify(same) === array2_as_string;// sprawdzamy czy sa takie same
        });
        console.log(contains)
        return contains;// oddajemy bool true lub false
    }
    // funkcja mieszajaca kolejnoscia indexow w array-x i arrayu -y
    function shuffle() {

        let allX = coords[0].sort(() => Math.random() - 0.5); // losowe ustawienie X-òw
        let allY = coords[1].sort(() => Math.random() - 0.5); // losowe ustawienie Y-òw
        let drawnX = allX[0];// pierwszy x z listy
        let drawnY = allY[0];// pierwszy y z listy
        let pairXY = [drawnX, drawnY]
        // jesli lista jest pusta lub funckcja daje bool false(czyli nie sa takie same)
        if (allCoordsPairs.length === 0 || !isArrayInArray(allCoordsPairs, pairXY)) {
            allCoordsPairs.push(pairXY)// dodjemy kordynaty do listy
        } else {
            shuffle() // jak nie losujemy numery jeszcze raz
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
        sprites[step] = this.add.image(xx, yy, 'numbers', `sprite${step+1}`).setInteractive();
        sprites[step].id = step+1;
        this.time.addEvent({
            delay:2000,
            callback: () => {
                sprites[step].setFrame(`spriteBlank`);
            }
        });
        sprites[step].setScale(size);
    }
    // dodawanie click event by odkrywac karty w odpwoiedzniej kolejności jak nie to game over
    let index =1;
    console.log(sprites[0]);
    sprites.forEach(function (sprite){
        sprite.on('pointerdown', function (pointer){
            if(sprite.id === index) {
                sprite.setFrame(`sprite${index}`);
                index +=1;
            } else {
                alert('Game Over');
            }
        });
    });
    // for (let i=0;sprites.length; i++) {
    //     console.log(sprites[i]);
    //     sprites[i].on('pointerdown', function (pointer) {
    //         let index =1;
    //         if(sprites[i].id === index) {
    //             sprites[i].setFrame(`sprite${i + 1}`);
    //             index +=1;
    //         } else {
    //             alert('Game Over');
    //         }
    //     });
    }
    // let id = step+1;
        
    //     sprites[step].on('pointerdown', function (pointer) {
    //         if (sprites[step].id === step+1){
    //             sprites[step].setFrame(`sprite${step + 1}`);
    //             id +=1;
    //         } else {
    //             sprites[step].setFrame(`spriteBlank`);
    //             blank = true;
    //         }
    //     });