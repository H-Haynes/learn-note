import { Card, NormalCard, Joker } from "./types";
import { Mark, Color } from "./enums";

export class Deck {
    private cards: Card[] = [];
    constructor(cards?: Card[]) {
        if (cards) {
            this.cards = cards;
        } else {
            this.init();
        }
    }

    private init(): void {
        const marks = Object.values(Mark);
        const colors = Object.values(Color);
        for (const m of marks) {
            for (const c of colors) {
                var card: NormalCard = {
                    color: c,
                    mark: m,
                    getStr() {
                        return this.color + this.mark;
                    },
                };
                this.cards.push(card);
            }
        }
        let joker: Joker = {
            type: "small",
            getStr() {
                return "小王";
            },
        };
        this.cards.push(joker);
        joker = {
            type: "big",
            getStr() {
                return "大王";
            },
        };
        this.cards.push(joker);
    }

    print(): void {
        let result: string = "\n";
        this.cards.forEach((card, i) => {
            result += card.getStr() + "\t";
            if ((i + 1) % 4 === 0) {
                result += "\n";
            }
        });
        console.log(result);
    }
    /**
     * 洗牌
     */
    shuffle1() {
        // 方法1
        this.cards = this.cards.sort(() => (Math.random() > 0.5 ? 1 : -1));
    }
    shuffle2() {
        for (let i = 0; i < this.cards.length; i++) {
            const targetIndex = this.getRandom(0, this.cards.length);
            const temp = this.cards[i];
            this.cards[i] = this.cards[targetIndex];
            this.cards[targetIndex] = temp;
        }
    }
    private getRandom(min: number, max: number) {
        const desc = max - min;
        return Math.floor(Math.random() * desc - min);
    }

    /**
     * 发牌 最终4个数组，3个17张，1个3张 [Deck,Deck,Deck,Deck]
     * 或使用对象(这里使用对象)
     */
    publish(): publishResult {
        //返回元祖类型,或者做成4个类
        let player1: Deck, player2: Deck, player3: Deck, surplus: Deck;
        player1 = this.takeCards(17);
        player2 = this.takeCards(17);
        player3 = this.takeCards(17);
        surplus = new Deck(this.cards);
        return {
            player1,
            player2,
            player3,
            surplus,
        };
    }

    /**
     *
     * @param n 取多少张π
     * 返回一个新建的并指定牌面的Deck对象
     */
    private takeCards(n: number): Deck {
        var cards: Card[] = [];

        for (var i = 0; i < n; i++) {
            //随机取n张牌
            var random = this.getRandom(0, this.cards.length);
            cards.push(this.cards.splice(random, 1)[0] as Card);
        }
        return new Deck(cards);
    }
}
/**
 * 发牌结果
 */
interface publishResult {
    player1: Deck;
    player2: Deck;
    player3: Deck;
    surplus: Deck;
}
