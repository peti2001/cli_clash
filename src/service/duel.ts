import * as Hero from '../entities/hero';

export interface DuelResult {
    winner: Hero.Hero;
    loser: Hero.Hero;
    combatLogs: Hero.CombatLog[];
}

export class Duel {
    hero1: Hero.Hero;
    hero2: Hero.Hero;

    constructor(hero1: Hero.Hero, hero2: Hero.Hero) {
        this.hero1 = hero1;
        this.hero2 = hero2;
    }

    fight(): DuelResult {
        const result: DuelResult = {
            winner: Hero.NullHero,
            loser: Hero.NullHero,
            combatLogs: [],
        }
        try {
            while (true) {
                if (Math.random() >= 0.5) {
                    result.combatLogs.push(this.hero1.attack(this.hero2));
                    result.combatLogs.push(this.hero2.attack(this.hero1));
                } else {
                    result.combatLogs.push(this.hero2.attack(this.hero1));
                    result.combatLogs.push(this.hero1.attack(this.hero2));
            }
            }
        } catch (e) {
            if (this.hero1.isDead()) {
                result.winner = this.hero2;
                result.loser = this.hero1;
            }
            if (this.hero2.isDead()) {
                result.winner = this.hero1;
                result.loser = this.hero2;
            }
        }

        return result;
    }
}