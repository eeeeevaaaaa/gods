import { BigInt } from "@graphprotocol/graph-ts"
import {
  gods,
  ProtoUpdated,
  SeasonStarted,
  QualityChanged,
  CardsMinted,
  ClassPropertySet,
  TokenPropertySet,
  Transfer,
  Approval,
  ApprovalForAll,
  OwnershipTransferred
} from "../generated/gods/gods"
import { Card, Player, Season, TransferCard } from "../generated/schema"

import {createcard, createplayer} from "../src/helpers/helpers"

export function handleProtoUpdated(event: ProtoUpdated): void {
}

export function handleSeasonStarted(event: SeasonStarted): void {
  let season = Season.load(event.params.id.toString());
  if (season == null) {
    season = new Season(event.params.id.toString());
  }
  season.high=event.params.high
  season.low=event.params.low
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
  var arrayquality=event.params.protos
  for (let i=0;i<event.params.protos.length;i++)
  {
    let card=createcard(event.params.start+j)
    card.proto=BigInt.fromI32(arrayproto[i])
    card.quality=BigInt.fromI32(arrayquality[i])
    card.save()
    j=j+BigInt.fromI32(1)
  }
}

export function handleClassPropertySet(event: ClassPropertySet): void {
}

export function handleTokenPropertySet(event: TokenPropertySet): void {
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

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}


