import { Color, Mark} from "./enums"

export type Deck = Card[]

export interface Card{
    getStr():string
}

export interface NormalCard extends Card{
    color:Color
    mark:Mark
}

export interface Joker extends Card{
    type:"big"|"small"
}

//export type Deck = (NormalCard|Joker)[];    //联合类型


