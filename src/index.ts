import * as Hero from './entities/hero';
import * as Weapon from './entities/weapon';
import { Duel, DuelResult } from './service/duel';

type winRate = {
  [key: string]: number;
}

const heroes = [
  new Hero.Warrior('warrior').equip(new Weapon.Sword()),
  new Hero.Priest('priest').equip(new Weapon.WarHammer()),
  new Hero.Mage('mage').equip(new Weapon.Wand()),
  new Hero.Rogue('rogue').equip(new Weapon.Dagger()),
  new Hero.Archer('archer').equip(new Weapon.Bow()),
];

// Let the heroes fight each other.
// Simulate 1000 fights for each pair of heroes.
const duelTable: string[][] = [];
let combatLogs: Hero.CombatLog[] = [];
for (let i = 0; i <= heroes.length; i++) {
  duelTable[i] = [];
  for(let j = 0; j <= heroes.length; j++) {
    if (i === 0 && j === 0) {
      duelTable[i][j] = '';
      continue;
    }
    if (i === 0 && j !== 0) {
      duelTable[i][j] = heroes[j - 1].type;
      continue;
    }
    if (i !== 0 && j === 0) {
      duelTable[i][j] = heroes[i - 1].type;
      continue;
    }
    if (i < j) {
      const wr: winRate = {};
      for (let k = 0; k < 1000; k++) {
        const duel = new Duel(heroes[i-1].copy(), heroes[j-1].copy());
        const result = duel.fight();
        combatLogs = result.combatLogs
      
        wr[result.winner.type] = wr[result.winner.type] ? wr[result.winner.type] + 1 : 1;
      }
      duelTable[i][j] = JSON.stringify(wr);
    }
  }
}
// Show the log of the last fight.
console.log('combatLogs', combatLogs);

// Show the win rate table.
console.table(duelTable);