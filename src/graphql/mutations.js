// eslint-disable
// this is an auto generated file. This will be overwritten

export const createCustomer = `mutation CreateCustomer($input: CreateCustomerInput!) {
  createCustomer(input: $input) {
    sub
    name
    email
    phone_number
    address
    pincode
    cart {
      itemId
      qty
    }
    rewardPts
    primeCust
  }
}
`;
export const updateCustomer = `mutation UpdateCustomer($input: UpdateCustomerInput!) {
  updateCustomer(input: $input) {
    sub
    name
    email
    phone_number
    address
    pincode
    cart {
      itemId
      qty
    }
    rewardPts
    primeCust
  }
}
`;
export const deleteCustomer = `mutation DeleteCustomer($input: DeleteCustomerInput!) {
  deleteCustomer(input: $input) {
    sub
    name
    email
    phone_number
    address
    pincode
    cart {
      itemId
      qty
    }
    rewardPts
    primeCust
  }
}
`;
export const createDriver = `mutation CreateDriver($input: CreateDriverInput!) {
  createDriver(input: $input) {
    sub
    name
    email
    delivery_pincode
    address
    phone_number
  }
}
`;
export const updateDriver = `mutation UpdateDriver($input: UpdateDriverInput!) {
  updateDriver(input: $input) {
    sub
    name
    email
    delivery_pincode
    address
    phone_number
  }
}
`;
export const deleteDriver = `mutation DeleteDriver($input: DeleteDriverInput!) {
  deleteDriver(input: $input) {
    sub
    name
    email
    delivery_pincode
    address
    phone_number
  }
}
`;
export const createOrder = `mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
    customerId
    driverId
    itemsOrdered {
      itemId
      qty
    }
    orderStatus
    modeOfPayement
    orderCode
    pickedUpTime
  }
}
`;
export const updateOrder = `mutation UpdateOrder($input: UpdateOrderInput!) {
  updateOrder(input: $input) {
    id
    customerId
    driverId
    itemsOrdered {
      itemId
      qty
    }
    orderStatus
    modeOfPayement
    orderCode
    pickedUpTime
  }
}
`;
export const deleteOrder = `mutation DeleteOrder($input: DeleteOrderInput!) {
  deleteOrder(input: $input) {
    id
    customerId
    driverId
    itemsOrdered {
      itemId
      qty
    }
    orderStatus
    modeOfPayement
    orderCode
    pickedUpTime
  }
}
`;
export const createItem = `mutation CreateItem($input: CreateItemInput!) {
  createItem(input: $input) {
    id
    title
    category
    descriptionUrl
    ImageUrl
    quantity
    rate
  }
}
`;
export const updateItem = `mutation UpdateItem($input: UpdateItemInput!) {
  updateItem(input: $input) {
    id
    title
    category
    descriptionUrl
    ImageUrl
    quantity
    rate
  }
}
`;
export const deleteItem = `mutation DeleteItem($input: DeleteItemInput!) {
  deleteItem(input: $input) {
    id
    title
    category
    descriptionUrl
    ImageUrl
    quantity
    rate
  }
}
`;
