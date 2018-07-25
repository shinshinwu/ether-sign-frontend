// ropsten contract address setting
const address = '0x704448aaff62c1ae2665cafbb641b5826672168d';

// ganache contract address
// const address = '0x0249e50e1b83cae3bb3f16604c7de4cecc260886';

var ABI = [
    {
      "constant": false,
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "documentCounter",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "signer",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "delegate",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "documentId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "title",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "content",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "time",
          "type": "uint64"
        }
      ],
      "name": "DocumentSigned",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "signer",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "delegate",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "documentId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "time",
          "type": "uint64"
        }
      ],
      "name": "SignerAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "signer",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "delegate",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "time",
          "type": "uint64"
        }
      ],
      "name": "Authorized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "signer",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "delegate",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "time",
          "type": "uint64"
        }
      ],
      "name": "Deauthorized",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "Pause",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "Unpause",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_title",
          "type": "string"
        },
        {
          "name": "_content",
          "type": "string"
        },
        {
          "name": "_signer",
          "type": "address"
        }
      ],
      "name": "signDocument",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_documentId",
          "type": "uint256"
        },
        {
          "name": "_signer",
          "type": "address"
        }
      ],
      "name": "addSigner",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_delegate",
          "type": "address"
        }
      ],
      "name": "authorize",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "deauthorize",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_signer",
          "type": "address"
        }
      ],
      "name": "getDelegate",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_signer",
          "type": "address"
        },
        {
          "name": "_delegate",
          "type": "address"
        }
      ],
      "name": "isDelegate",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]

export {address, ABI}
