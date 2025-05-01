import { ethereum, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Transfer as USDCTransferEvent } from "../generated/UsdcToken/Usdc";
import { Transfer } from "../generated/schema";

// Call handler for native ETH transfers
export function handleEthTransfer(call: ethereum.Call): void {
  // We're only interested in transactions that transfer ETH
  if (call.transaction.value > BigInt.fromI32(0)) {
    const transferId = call.transaction.hash.toHex();
    let transfer = new Transfer(Bytes.fromHexString(transferId));

    transfer.from = call.from;
    transfer.to = call.to;
    transfer.value = call.transaction.value;
    transfer.asset = "ETH";
    transfer.blockNumber = call.block.number;
    transfer.blockTimestamp = call.block.timestamp;
    transfer.transactionHash = call.transaction.hash;

    transfer.save();
  }
}

export function handleUSDCTransfer(event: USDCTransferEvent): void {
  const logIndexStr = event.logIndex.toString();
  const paddedLogIndex =
    logIndexStr.length % 2 === 0 ? logIndexStr : "0" + logIndexStr;
  const id = event.transaction.hash.toHex() + paddedLogIndex;
  const transfer = new Transfer(Bytes.fromHexString(id));
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.value = event.params.value;
  transfer.asset = "USDC"; // Tag as USDC
  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;
  transfer.transactionHash = event.transaction.hash;
  transfer.save();
}
