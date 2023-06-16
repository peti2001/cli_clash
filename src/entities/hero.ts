import { NullWeapon, Weapon } from './weapon';
import { Ability, NullAbility, ArmourBoost, Heal, FireStorm, Dodge, HeadShot } from './ability';

/**
 * CombatLog is a class that holds all the information about a combat.
 * Can be used for debugging and displaying information to the combat.
 */
export class CombatLog {
    attackerName: string = '';
    targetName: string = '';
    finalDamage: number = 0;
    weaponDamage: number = 0;
    damageAfterSkills: number = 0;
    appliedArmor: number = 0;
    isAvaded: boolean = false;
    isMissed: boolean = false;
    attackerStartHp: number = 0;
    attackerEndHp: number = 0;
    targetStartHp: number = 0;
    targetEndHp: number = 0;
    attackAbility: Ability = new NullAbility();
    defendAbility: Ability = new NullAbility();
}

export class Combat {
    attackerWeaponDamage: number = 0;
    targetEvasion: number = 0;
    targetArmor: number = 0;
}


export class Hero implements BaseHero {
    name = '';
    type = HeroType.Null;
    hp = 0;
    armor = 0;
    evasion = 0;
    weapon: Weapon = new NullWeapon();
    attackAbility: Ability = new NullAbility();
    defendAbility: Ability = new NullAbility();

    constructor(name: string) {
        this.name = name;
    }

    getDamage(): number {
        return this.weapon.minDamage + Math.random() * (this.weapon.maxDamage - this.weapon.minDamage);
    }

    equip(weapon: Weapon): Hero {
        let canUse = false;
        for (let allowedType of weapon.allowedHeros) {
            if (allowedType === this.type) {
                canUse = true;
                break;       
            }
        }
        if (!canUse) {
            throw new Error(this.name + ' cannot use ' + weapon.name);
        }
        this.weapon = weapon;

        return this;
    }

    isDead(): boolean {
        return this.hp <= 0;
    }

    attack(target: Hero): CombatLog {
        if (this.isDead()) {
            throw new Error("Cannot attack, " + this.name + " is dead");
        }
        if (target.isDead()) {
            throw new Error("Cannot attack, " + target.name + " is dead");
        }
        let damage = this.getDamage();

        const combatLog = new CombatLog();
        const combat = new Combat();

        combat.attackerWeaponDamage = damage;
        combat.targetArmor = target.armor;
        combat.targetEvasion = target.evasion;
        const isMissed = Math.random() >= this.weapon.hitChance
        const isAvaded = Math.random() <= combat.targetEvasion/100;

        combatLog.weaponDamage = damage;
        combatLog.attackerStartHp = this.hp;
        combatLog.targetStartHp = target.hp;
        combatLog.attackerName = this.name;
        combatLog.targetName = target.name;
        combatLog.isAvaded = isAvaded;
        combatLog.isMissed = isMissed;

        // Use abilities, improve damage of the attacker or improve armor of the target or heal
        if (Math.random() <= 0.1) {
            this.attackAbility.activate(combat, this);
            combatLog.attackAbility
        }
        if (Math.random() <= 0.1) {
            target.defendAbility.activate(combat, target);
            combatLog.defendAbility = target.defendAbility;
        }
        combatLog.appliedArmor = combat.targetArmor;

        damage = combat.attackerWeaponDamage - Math.floor(combat.targetArmor / 3)
        combatLog.finalDamage = damage;

        if (!isMissed && !isAvaded) {
            target.hp -= Math.max(damage, 0);
        } else {
            combatLog.finalDamage = 0;
        }

        combatLog.targetEndHp = target.hp;
        combatLog.attackerEndHp = this.hp;

        return combatLog;
    }

    copy(): Hero {
        const hero = new Hero(this.name);
        hero.type = this.type;
        hero.hp = this.hp;
        hero.armor = this.armor;
        hero.evasion = this.evasion;
        hero.weapon = this.weapon;
        hero.attackAbility = this.attackAbility;
        hero.defendAbility = this.defendAbility;

        return hero;
    }
}

export interface BaseHero {
    name: string;
    type: HeroType;
    hp: number;
    armor: number;
    evasion: number;
    attackAbility: Ability;
    defendAbility: Ability;
}

export enum HeroType {
    Warrior = 'Warrior',
    Priest = 'Priest',
    Mage = 'Mage',
    Rogue = 'Rogue',
    Archer = 'Archer',
    Null = '',
}

export class Warrior extends Hero {
    type = HeroType.Warrior;
    hp = 100;
    defendAbility = new ArmourBoost();
    armor = 5;
    evasion = 20;
}

export class Priest extends Hero {
    type = HeroType.Priest;
    hp = 90;
    defendAbility = new Heal();
    armor = 4;
    evasion = 20;
}

export class Mage extends Hero {
    type = HeroType.Mage;
    hp = 70;
    attackAbility = new FireStorm();
    armor = 1;
    evasion = 5;
}

export class Rogue extends Hero {
    type = HeroType.Rogue;
    hp = 80;
    attackAbility = new Dodge();
    armor = 3;
    evasion = 30;
}

export class Archer extends Hero {
    type = HeroType.Archer;
    hp = 80;
    attackAbility = new HeadShot();
    armor = 2;
    evasion = 15;
}

export const NullHero = new Hero('Null Hero');