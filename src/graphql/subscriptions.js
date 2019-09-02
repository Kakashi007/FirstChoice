// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateCustomer = `subscription OnCreateCustomer {
  onCreateCustomer {
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
export const onUpdateCustomer = `subscription OnUpdateCustomer {
  onUpdateCustomer {
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
export const onDeleteCustomer = `subscription OnDeleteCustomer {
  onDeleteCustomer {
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
export const onCreateDriver = `subscription OnCreateDriver {
  onCreateDriver {
    sub
    name
    email
    delivery_pincode
    address
    phone_number
  }
}
`;
export const onUpdateDriver = `subscription OnUpdateDriver {
  onUpdateDriver {
    sub
    name
    email
    delivery_pincode
    address
    phone_number
  }
}
`;
export const onDeleteDriver = `subscription OnDeleteDriver {
  onDeleteDriver {
    sub
    name
    email
    delivery_pincode
    address
    phone_number
  }
}
`;
export const onCreateOrder = `subscription OnCreateOrder {
  onCreateOrder {
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
export const onUpdateOrder = `subscription OnUpdateOrder {
  onUpdateOrder {
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
export const onDeleteOrder = `subscription OnDeleteOrder {
  onDeleteOrder {
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
export const onCreateItem = `subscription OnCreateItem {
  onCreateItem {
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
export const onUpdateItem = `subscription OnUpdateItem {
  onUpdateItem {
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
export const onDeleteItem = `subscription OnDeleteItem {
  onDeleteItem {
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
