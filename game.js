// キャラクターをインスタンス化する
let friend1 = new Friend("あれす", 180, 66, 13, 2, 45);                   // 味方
let friend2 = new Friend("なーしゃ", 110, 16, 12, 3, 45);                 // 味方
let friend3 = new Friend("だすてん", 140, 43, 11, 1, 45);                 // 味方
let enemy1 = new Troll("トロル", 270, 38, 20, "./image/troll.png");      // 敵
let enemy2 = new Dragon("ドラゴン", 380, 68, 6, "./image/dragon.png");


let characters = [];
characters.push(friend1);     // 味方
characters.push(friend2);     // 味方
characters.push(friend3);     // 味方
characters.push(enemy1);      // 敵
characters.push(enemy2);

let gameManage = new GameManage();
let command = new Command();


command.preparetion()