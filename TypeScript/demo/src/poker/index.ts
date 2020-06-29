import { Deck } from "./deck";

var deck =new Deck();

console.log("=========洗牌中==========")
deck.shuffle2();
deck.print();

console.log("==========发牌结果======");

var result = deck.publish();
console.log("============\n玩家1:\n=========")
result.player1.print();
console.log("============\n玩家2\n==========")
result.player2.print();
console.log("============\n玩家3:\n========")
result.player3.print();
console.log("============\n底牌:\n==========");
result.surplus.print();