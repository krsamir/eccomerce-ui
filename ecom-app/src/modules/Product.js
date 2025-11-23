class Product {
  barcode = "";
  createdAt = "";
  createdBy = "";
  description = "";
  entityIId = "";
  hsnId = "";
  id = null;
  isActive = false;
  isDeleted = true;
  name = "";
  unit = "";
  unitType = "";
  updatedAt = "";
  updatedBy = "";
  uuid = "";

  constructor({
    barcode = "",
    createdAt = "",
    createdBy = "",
    description = "",
    entityIId = "",
    hsnId = "",
    id = null,
    isActive = false,
    isDeleted = true,
    name = "",
    unit = "",
    unitType = "",
    updatedAt = "",
    updatedBy = "",
    uuid = "",
  }) {
    this.barcode = barcode;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.description = description;
    this.entityIId = entityIId;
    this.hsnId = hsnId;
    this.id = id;
    this.isActive = isActive;
    this.isDeleted = isDeleted;
    this.name = name;
    this.unit = unit;
    this.unitType = unitType;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
    this.uuid = uuid;
  }

  get(attributeName = "*") {
    if (attributeName === "*") {
      return this;
    }
    if (typeof attributeName !== "object") {
      throw Error("Provide array of attribute names.");
    }
    if (attributeName?.length === 0) {
      throw Error("Attributes cannot be empty.");
    }
    const keys = Object.keys(this);
    const allowed = new Set([...keys]);
    const allAllowed = attributeName.every((v) => allowed.has(v));
    if (!allAllowed) {
      throw Error("Attribute is not in allowed list. Provide a valid name");
    }
    if (attributeName?.length > 0) {
      console.info(this);
      return attributeName.reduce((acc, value) => {
        acc[value] = this[value];
        return acc;
      }, {});
    }
  }
  static create({
    barcode = "",
    description = "",
    entityIId = "",
    hsnId = "",
    id = null,
    isActive = false,
    isDeleted = true,
    name = "",
    unit = "",
    unitType = "",
    uuid = "",
  }) {
    return new Product({
      barcode,
      description,
      entityIId,
      hsnId,
      id,
      isActive,
      isDeleted,
      name,
      unit,
      unitType,
      uuid,
    });
  }
}

export default Product;
