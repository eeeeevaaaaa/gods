import {BigInt, Address} from "@graphprotocol/graph-ts/index";
import {Card, Player} from "../../generated/schema";

export function createcard(cardid: BigInt): Card {
    let card = Card.load(cardid.toString());
    if (card == null) {
        card = new Card(cardid.toString());
    }
    card.save()
    return card as Card
}

export function createplayer(address: Address): Player {
    let player = Player.load(address.toHex());
    if (player == null) {
        player = new Player(address.toHex());
    }
    player.save()
    return player as Player
}