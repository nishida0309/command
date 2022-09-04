import Message from './Message.js'

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
export default Friend
