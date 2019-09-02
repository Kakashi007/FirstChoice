// eslint-disable
// this is an auto generated file. This will be overwritten

//===============filters items on category=================
export const getOnCategoryQuery = `query getOnCategoryQuery($category: String) {
  getOnCategory(category: $category) {
    items {
      id
      title
      category
      rate
      descriptionUrl
      ImageUrl
      quantity
    }
    nextToken
  }
}
`;

// ======================================
//=============== search on title =========
export const searchOnTitleQuery = `query searchOnTitleQuery($toSearchFor:String) {
  listItems(filter: {
    title : {
      contains : $toSearchFor
    }
  }) {
    items {
      id
      title
      category
      rate
      descriptionUrl
      ImageUrl
      quantity
    }
  }
}
`;

//====================================================

//========== filter on rate =========================
export const filterOnRateQuery = `query filterOnRateQuery($toFilterOn:[Int]) {
  listItems(filter: {
    rate : {
      between : $toFilterOn
    }
  }) {
    items {
      id
      title
      category
      rate
      descriptionUrl
      ImageUrl
      quantity
    }
  }
}
`;
//====================================================
export const getOnCategory = `query GetOnCategory($category: String) {
  getOnCategory(category: $category) {
    items {
      id
      title
      category
      descriptionUrl
      ImageUrl
      quantity
      rate
    }
    nextToken
  }
}
`;
export const getOnTitle = `query GetOnTitle($title: String) {
  getOnTitle(title: $title) {
    items {
      id
      title
      category
      descriptionUrl
      ImageUrl
      quantity
      rate
    }
    nextToken
  }
}
`;
export const getOnCustomerId = `query GetOnCustomerId($customerId: String) {
  getOnCustomerId(customerId: $customerId) {
    items {
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
    nextToken
  }
}
`;
export const getOnSub = `query GetOnSub($sub: String) {
  getOnSub(sub: $sub) {
    items {
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
    nextToken
  }
}
`;
export const getCustomer = `query GetCustomer($id: ID!) {
  getCustomer(id: $id) {
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
export const listCustomers = `query ListCustomers(
  $filter: ModelCustomerFilterInput
  $limit: Int
  $nextToken: String
) {
  listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getDriver = `query GetDriver($id: ID!) {
  getDriver(id: $id) {
    sub
    name
    email
    delivery_pincode
    address
    phone_number
  }
}
`;
export const listDrivers = `query ListDrivers(
  $filter: ModelDriverFilterInput
  $limit: Int
  $nextToken: String
) {
  listDrivers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      sub
      name
      email
      delivery_pincode
      address
      phone_number
    }
    nextToken
  }
}
`;
export const getOrder = `query GetOrder($id: ID!) {
  getOrder(id: $id) {
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
export const listOrders = `query ListOrders(
  $filter: ModelOrderFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getItem = `query GetItem($id: ID!) {
  getItem(id: $id) {
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
export const listItems = `query ListItems(
  $filter: ModelItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      category
      descriptionUrl
      ImageUrl
      quantity
      rate
    }
    nextToken
  }
}
`;
