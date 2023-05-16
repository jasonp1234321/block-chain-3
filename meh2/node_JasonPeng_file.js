const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash=""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    /*used to make a hash and store information */
    calculateHash(){
        return SHA256(this.index+this.previousHash+this.timestamp+JSON.stringify(this.data)).toString();
    }
    /*makes a hash using this information */
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock(){
        return new Block(0, "3/01/2009", "Genesis Block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock){
        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.hash - newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i=1; i < this.chain.length; i++){
        	const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1]; 
            if(currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }
            if(prevBlock.hash != prevBlock.calculateHash()){
                return false;
            }
            return true;
        }
    }
}

let btCoin = new Blockchain();
btCoin.addBlock(new Block(1, "1/2/2022", {name:"TM", amount:4}));
btCoin.addBlock(new Block(2, "2/2/2022", {name:"TMI", amount:4}));
btCoin.addBlock(new Block(3, "3/2/2022", {name:"TMII", amount:4}));
btCoin.addBlock(new Block(4, "4/2/2022", {name:"TMIII", amount:4}));
btCoin.chain[1].hash = btCoin.chain[1].calculateHash();
console.log("Is the chain valid?" + btCoin.isChainValid());
console.log(JSON.stringify(btCoin, null, 4));

