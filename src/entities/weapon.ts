import { HeroType } from './hero';

export interface Weapon {
    name: string;
    allowedHeros: HeroType[];
    minDamage: number;
    maxDamage: number;
    hitChance: number;
}

export enum WeaponType {
    Sword = 'Sword',
    Dagger = 'Dagger',
    WarHammer = 'War Hammer',
    BattleAxe = 'Battle Axe',
    Bow = 'Bow',
    Wand = 'Wand',
}

export class NullWeapon implements Weapon {
    name = 'None';
    allowedHeros = [HeroType.Warrior, HeroType.Rogue, HeroType.Archer, HeroType.Priest, HeroType.Mage];
    minDamage = 0;
    maxDamage = 0;
    hitChance = 0;
}

export class Sword implements Weapon {
    name = WeaponType.Sword;
    allowedHeros = [HeroType.Warrior, HeroType.Rogue, HeroType.Archer, HeroType.Priest, HeroType.Mage];
    minDamage = 8;
    maxDamage = 12;
    hitChance = 0.9;
}

export class Dagger implements Weapon {
    name = WeaponType.Dagger;
    allowedHeros = [HeroType.Rogue];
    minDamage = 4;
    maxDamage = 5;
    hitChance = 0.98;
}

export class WarHammer implements Weapon {
    name = WeaponType.WarHammer;
    allowedHeros = [HeroType.Priest];
    minDamage = 10;
    maxDamage = 15;
    hitChance = 0.93;
}

export class BattleAxe implements Weapon {
    name = WeaponType.BattleAxe;
    allowedHeros = [HeroType.Warrior];
    minDamage = 12;
    maxDamage = 15;
    hitChance = 0.92;
}

export class Bow implements Weapon {
    name = WeaponType.Bow;
    allowedHeros = [HeroType.Archer];
    minDamage = 7;
    maxDamage = 12;
    hitChance = 0.89;
}

export class Wand implements Weapon {
    name = WeaponType.Wand;
    allowedHeros = [HeroType.Mage];
    minDamage = 10;
    maxDamage = 15;
    hitChance = 0.95;
}