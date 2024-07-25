# TheKicksCorner Smart Contract

## Overview

TheKickCorner is a smart contract written in Solidity that allows an owner to add products and users to buy them. This contract is deployed on the Ethereum blockchain. It provides basic functionalities for managing products and their purchase.

## Features

- Add new products (only by the owner)
- Buy products by paying the required amount
- Track products bought by users
- Withdraw funds collected from product sales (only by the owner)

## Contract Details

### State Variables

- **owner**: Address of the contract owner.
- **productCount**: Counter to keep track of the number of products.
- **products**: Mapping from product ID to the `Product` struct.
- **buyers**: Mapping from product ID to the buyer's address.
- **userProducts**: Mapping from user address to an array of product IDs that the user has bought.

### Structs

- **Product**: Defines the structure of a product with the following properties:
  - `id`: Unique identifier for the product.
  - `name`: Name of the product.
  - `amount`: Amount required to buy the product.

### Events

- **ProductAdded**: Emitted when a new product is added.
  - `id`: Product ID.
  - `name`: Product name.
  - `amount`: Product amount.
- **ProductBought**: Emitted when a product is bought.
  - `id`: Product ID.
  - `buyer`: Address of the buyer.

### Modifiers

- **onlyOwner**: Restricts function access to the contract owner.

### Functions

#### `constructor()`

Sets the contract deployer as the owner.

#### `addProduct(uint _amount, string memory _name) external onlyOwner`

Adds a new product to the contract.
- `_amount`: Amount required to buy the product.
- `_name`: Name of the product.

#### `buyProduct(uint _id, uint _amount) external payable`

Allows a user to buy a product by providing the required amount.
- `_id`: ID of the product to buy.
- `_amount`: Amount provided for the product.

#### `getUserProducts(address _user) external view returns (uint[] memory)`

Returns the list of product IDs bought by a user.
- `_user`: Address of the user.

#### `getAllProducts() external view returns (Product[] memory)`

Returns the list of all products.

#### `withdrawFunds() external onlyOwner`

Allows the owner to withdraw all funds collected from product sales.

## Usage

### Adding a Product

Only the owner can add products.

```solidity
addProduct(uint _amount, string memory _name)
```

### Buying a Product

Users can buy products by providing the required amount.

```solidity
buyProduct(uint _id, uint _amount)
```

### Getting User Products

Retrieve the list of products bought by a specific user.

```solidity
getUserProducts(address _user)
```

### Getting All Products

Retrieve the list of all products.

```solidity
getAllProducts()
```

### Withdrawing Funds

The owner can withdraw all the funds collected from product sales.

```solidity
withdrawFunds()
```

## License

©️ CodeinX '24