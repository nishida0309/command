
class Message {
  static printMessage(text) {
    messageView.innerHTML = text;
  }
  static addMessage(text) {
    messageView.innerHTML += text;
  }
}

class Friend {
  constructor(name, maxHp, offense, speed, herb, herbPower) {
    this.name = name;
    this.type = 'friend';
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.liveFlag = true;
    this.offense = offense;
    this.speed = speed;
    this.herb = herb;
    this.herbPower = herbPower;

    this.command = '';
    this.target = "";
  }
  getMainParameter() {
    return "<b>" + this.name + "</b><br>"
      + "体力 " + this.hp + "<br>"
      + "薬草 " + this.herb + "<br>";
  }

  getCommand(event) {
    if (event === 'start') {
      let text = ['<div><b id="friendName">' + this.name + '</b></div>',
        '<div id="attackCommand">攻撃</div>',
        '<div id="recoveryCommand">薬草</div>']
      return text;
    }
  }
  setEventHandler(event) {
    if (event === "start") {
      attackComannd.addEventListener('click', command.callback);
      recoveryCommand.addEventListener("click", command.callback);
    }
  }
  action() {
    if (this.hp > 0) {
      switch (this.command) {
        case "enemyCommand":
          this.attack();
          break;
        case "recoveryCommand":
          this.recovery();
          break;
        default:
          Message.printMessage.apply(this.name + "はボーッとした<br>")

      }
    }
  }
  attack() {
    if (this.target.liveFlag) {
      this.target.hp - +this.offense;
      if (this.target.hp < 0) {
        this.target.hp = 0;
      }
      Message.printMessage(this.name + "の攻撃<br>" + this.target.name + "に" + this.offense + "のダメージを与えた！<br>")
    } else {
      Message.printMessage(this.name + "の攻撃・・・<br>" + this.target.name + "は倒れている<br>")
    }
  }

  recovery() {
    // 薬草なし
    if (this.herb <= 0) {
      Message.printMessage(this.name + "は薬草を・・・<br>薬草がない！<br>");
      return
    }
    if (this.maxHp == this.hp) {
      Message.printMessage(this.name + "は薬草を・・・<br>これ以上回復できない！<br>")
      return
    }
    let heal = this.herbPower;
    if (this.maxHp - this.hp < this.herbPower) {
      heal = this.maxHp - this.hp;
    }
    this.hp += heal;
    --this.herb;
    Message.printMessage(this.name + "は薬草を飲んだ<br>体力が" + heal + "回復した！<br>")
  }

}

class Enemy {
  constructor(name, hp, offense, speed, path) {
    this.name = name,
      this.type = 'enemy';
    this.hp = hp;
    this.liveFlag = true;
    this.offense = offense;
    this.speed = speed;
    this.path = path
  }
  action() {
    if (this.hp > 0) {
      this.attack();
    }
  }
}

class Troll extends Enemy {
  constructor(name, hp, offense, speed, path) {
    super(name, hp, offense, speed, path);
  }
  attack() {
    let f = characters[searchLivedCharacterRamdom('friend')];
    f.hp -= this.offense;
    if (f.hp < 0) {
      f.hp = 0;
    }
    if (f.hp < 0) {
      f.hp = 0
    }
    if (f.liveFlag) {
      Message.printMessage(this.name + '顔沿いかかってきた<br>' + f.name + "は" + this.offense + "のダメージを受けた！<br>");
    } else {
      Message.printMessage(this.name + "の攻撃・・・<br>" + f.name + "は倒れている<br>")
    }

  }
}


class Dragon extends Enemy {
  constructor(name, hp, offense, speed, path) {
    super(name, hp, offense, speed, path);
  }
  attack() {
    if (getRandomIntInclusive(0, 4) === 4) {
      Message.printMessage("ドラゴンは<br>グフッグフッと咳き込んでいる・・・<br>");
      return
    }
    let f = characters[searchLivedCharacterRamdom('friend')];
    f.hp -= this.offense;

    if (f.hp < 0) {
      f.hp = 0
    }

    if (f.liveFlag) {
      Message.printMessage(this.name + "は炎を吹いた<br>" +
        f.name + "は" + this.offense + "のダメージを受けた！<br>")
    }
    else {
      Message.printMessage(this.name + "の攻撃・・・<br>" + f.name + "は倒れている<br>")
    }
  }
}

class GameManage {
  constructor() {
    this.actionOrder();
    this.showParameter();
    this.showEnemyImage();
    this.showFirstMessage();
  }
  actionOrder() {
    characters.sort(
      function (a, b) {
        return b.speed - a.speed;
      }
    )
  }
  showParameter() {
    parameterView.innerHTML = '';
    for (let c of characters) {
      if (c.type === 'friend') {
        parameterView.innerHTML += '<div class="parameter">' +
          c.getMainParameter() + '</div>';
      }
    }
    for (let c of characters) {
      if (c.type === 'enemy') {
        console.log(c.name + " " + c.hp);
      }
    }
  }

  showEnemyImage() {
    let i = 0;
    for (let c of characters) {
      if (c.type === "enemy") {
        enemyImageView.innerHTML += '<img id="enemyImage' + characters.indexOf(c) + '" src="' + c.path
          + '" style="position:absolute; left:' + (160 * i++) + 'px; bottom: 0px">';
      }
    }
  }
  showFirstMessage() {
    Message.printMessage("モンスターが現れた<br>");
  }
  removeDiedCharacter() {
    for (let c of characters) {
      if (c.hp <= 0 && c.liveFlag === true) {
        Message.addMessage(c.name + "は倒れた<br>");
        // 生存フラグを落とす
        c.liveFlag = false;

        if (c.type === 'enemy') {
          document.getElementById("enemyImage" + characters.indexOf(c)).remove();
        }

      }
    }
  }
  jadgeWinLose() {
    if (!isAliveByType('friend')) {
      Message.addMessage("全滅しました・・・<br>");
      return "lose";
    }
    if (!isAliveByType('enemy')) {
      Message.addMessage('モンスターをやっつけた<br>');
      return 'win';
    }
    return 'none';
  }

  async battle() {
    let winLose = 'none';
    for (let c of characters) {
      if (c.liveFlag === false) {
        continue;
      }
      await sleep(900)
      c.action();
      await sleep(1100)

      this.showParameter();

      await sleep(900);
      this.removeDiedCharacter();
      await sleep(300);
      winLose = this.jadgeWinLose();

      if (winLose === 'win' || winLose === 'lose') {
        return false
      }
    }
    return true
  }
}


class command {
  constructor() {
    this.friendElementNum = [];
    this.current = 0;
  }
  prepatation() {
    this.friendElementNum.splice(0);
    for (let c of characters) {
      if (c.type === "friend" && c.liveFlag === true) {
        this.friendElementNum.push(characters.indexOf(c))
      }
    }
    let text = characters[this.friendElementNum[this.current]].getCommand('start');
    this.showCommand(text);
    characters[this.friendElementNum[this.current]].setEventHandler("start")
  }
  showCommand(commands) {
    commandView.innerHTML = commands.join('')
  }
}

function sleep(ms) {
  return new Promise(
    function (resolve) {
      // msミリ秒スリープする
      setTimeout(resolve, ms);
    }
  );
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function isAliveByType(type) {
  for (let c of characters) {
    if (c.type === type && c.liveFlag === true) {
      return true
    }
  }
  return false
}

function searchCharacterByName(name) {
  let characterElementNum = [];
  let i = 0;
  for (let c of characters) {
    if (c.name === name) {
      characterElementNum.push(i);
    }
    ++i
  }
  return characterElementNum
}

function searchLivedCharacterByType(type) {
  let characterElementNum = [];
  let i = 0;
  for (let c of characters) {
    if (c.type === type && c.liveFlag === true) {
      characterElementNum.push(i)
    }
    ++i
  }
  return characterElementNum
}

function searchLivedCharacterRamdom(type) {
  let livedCharacter = searchLivedCharacterByType(type);
  let randomValue = getRandomIntInclusive(0, livedCharacter.length - 1);

  return livedCharacter[randomValue];
}