import { Transfer as ETHTransferEvent } from "../generated/NativeETH/NativeETH";
import { Transfer as USDCTransferEvent } from "../generated/UsdcToken/Usdc";
import { Transfer } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

// Handler for ETH transfers
export function handleETHTranfer(event: ETHTransferEvent): void {
  const logIndexStr = event.logIndex.toString();
  const paddedLogIndex =
    logIndexStr.length % 2 === 0 ? logIndexStr : "0" + logIndexStr;
  const id = event.transaction.hash.toHex() + paddedLogIndex;
  const transfer = new Transfer(Bytes.fromHexString(id));
  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.value = event.params.value;
  transfer.asset = "ETH"; // Tag as ETH
  transfer.blockNumber = event.block.number;
  transfer.blockTimestamp = event.block.timestamp;
  transfer.transactionHash = event.transaction.hash;
  transfer.save();
}

// Handler for USDC transfers
export function handleUSDCTranfer(event: USDCTransferEvent): void {
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
