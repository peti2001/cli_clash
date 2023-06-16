import { Hero, Combat } from './hero';

export interface Ability {
    name: string;
    activate(combat: Combat, target: Hero): void;
}

export enum AbilityType {
    ArmourBoost = 'Armour Boost',
    Dodge = 'Dodge',
    FireStorm = 'Fire Storm',
    HeadShot = 'Head Shot',
    Heal = 'Heal',
    Null = 'Null',
}

export class NullAbility implements Ability {
    name: string = AbilityType.Null;

    activate(combat: Combat): void {}
}

export class ArmourBoost implements Ability {
    name: string = AbilityType.ArmourBoost;

    activate(combat: Combat): void {
        combat.targetArmor += 10;
    }
}

export class Dodge implements Ability {
    name: string = AbilityType.Dodge;

    activate(combat: Combat): void {
        combat.targetEvasion += 100;
    }
}

export class FireStorm implements Ability {
    name: string = AbilityType.FireStorm;

    activate(combat: Combat, target: Hero): void {
        combat.attackerWeaponDamage += 20;
    }
}

export class HeadShot implements Ability {
    name: string = AbilityType.HeadShot;

    activate(combat: Combat, target: Hero): void {
        combat.attackerWeaponDamage += 15;
    }
}

export class Heal implements Ability {
    name: string = AbilityType.Heal;

    activate(combat: Combat, hero: Hero): void {
        hero.hp += 10;
    }
}

export const abilities: Ability[] = [new ArmourBoost(), new Dodge()];
