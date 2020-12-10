import { BigInt } from "@graphprotocol/graph-ts"
import {
  gods,
  SeasonStarted,
  QualityChanged,
  CardsMinted,
  Transfer
} from "../generated/gods/gods"
import { Card, Player, Season, TransferCard } from "../generated/schema"

import {createcard, createplayer} from "../src/helpers/helpers"


export function handleSeasonStarted(event: SeasonStarted): void {
  let seasonid=BigInt.fromI32(event.params.id).toString()
  let season = Season.load(seasonid);
  if (season == null) {
    season = new Season(seasonid);
  }
  season.high=BigInt.fromI32(event.params.high)
  season.low=BigInt.fromI32(event.params.low)
  season.name=event.params.name
  season.save()
}

export function handleQualityChanged(event: QualityChanged): void {
  let card=createcard(event.params.tokenId)
  card.quality=event.params.quality
  card.save()
}

export function handleCardsMinted(event: CardsMinted): void {
  var j=BigInt.fromI32(0)
  var arrayproto=event.params.protos
  var arrayquality=event.params.qualities
  for (let i=0;i<event.params.protos.length;i++)
  {
    let card=createcard(event.params.start+j)
    card.proto=arrayproto[i]
    card.quality=arrayquality[i]
    card.save()
    j=j+BigInt.fromI32(1)
  }
}


export function handleTransfer(event: Transfer): void {
  let card=createcard(event.params.tokenId)
  let oldplayer=createplayer(event.params.from)
  let newplayer=createplayer(event.params.to)
  let transf = TransferCard.load(event.transaction.hash.toHex()+'-'+event.params.tokenId.toString());
  if (transf == null) {
    transf = new TransferCard(event.transaction.hash.toHex()+'-'+event.params.tokenId.toString());
  }
  transf.from=oldplayer.id
  transf.to=newplayer.id
  transf.save()
  card.owner=newplayer.id
  card.save()
}



