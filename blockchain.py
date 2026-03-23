from web3 import Web3
import json

# Connect to local blockchain
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))

# Replace with your contract address
contract_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

# Load ABI
with open("../blockchain/artifacts/contracts/FileStorage.sol/FileStorage.json") as f:
    contract_json = json.load(f)
    abi = contract_json["abi"]

contract = w3.eth.contract(address=contract_address, abi=abi)

# Use account 0 from Hardhat
account = w3.eth.accounts[0]

def store_file_hash(ipfs_hash):
    tx = contract.functions.uploadFile(ipfs_hash).transact({
        "from": account
    })

    receipt = w3.eth.wait_for_transaction_receipt(tx)
    return receipt