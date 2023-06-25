function validateForm() {
  // Get form field values
  const company = document.getElementById('company').value;
  const owner = document.getElementById('owner').value;
  const item = document.getElementById('item').value;
  const quantity = document.getElementById('quantity').value;
  const weight = document.getElementById('weight').value;
  const requestShipment = document.getElementById('request-shipment').value;
  const trackingId = document.getElementById('tracking-id').value;
  const shipmentSize = document.getElementById('shipment-size').value;
  const boxCount = document.getElementById('box-count').value;
  const specifications = document.getElementById('specifications').value;
  const checklistQuantity = document.getElementById('checklist-quantity').value;

  // Regular expression patterns for validation
  const alphanumericPattern = /^[a-zA-Z0-9\s]+$/;
  const stringPattern = /^[a-zA-Z\s]+$/;
  const integerPattern = /^\d+$/;
  const floatPattern = /^\d+(\.\d+)?$/;
  const sizePattern = /^\d+(x\d+)?(x\d+)?$/;

  // Perform validation for each field except the date field
  if (company.trim() !== '' && !alphanumericPattern.test(company)) {
    alert('Invalid Company. Only alphanumeric characters are allowed.');
    return false;
  }
  if (owner.trim() !== '' && !alphanumericPattern.test(owner)) {
    alert('Invalid Owner. Only alphanumeric characters are allowed.');
    return false;
  }
  if (item.trim() !== '' && !stringPattern.test(item)) {
    alert('Invalid Item. Only letters and spaces are allowed.');
    return false;
  }
  if (quantity.trim() !== '' && !integerPattern.test(quantity)) {
    alert('Invalid Quantity. Please enter a valid integer value.');
    return false;
  }
  if (weight.trim() !== '' && !floatPattern.test(weight)) {
    alert('Invalid Weight. Please enter a valid floating-point value.');
    return false;
  }
  if (requestShipment.trim() !== '' && !stringPattern.test(requestShipment)) {
    alert('Invalid Request for Shipment. Only letters and spaces are allowed.');
    return false;
  }
  if (trackingId.trim() !== '' && !stringPattern.test(trackingId)) {
    alert('Invalid Tracking ID. Only letters and spaces are allowed.');
    return false;
  }
  if (shipmentSize.trim() !== '' && !sizePattern.test(shipmentSize)) {
    alert('Invalid Shipment Size. Please enter a valid size in the format LxBxH.');
    return false;
  }
  if (boxCount.trim() !== '' && !integerPattern.test(boxCount)) {
    alert('Invalid Box Count. Please enter a valid integer value.');
    return false;
  }
  if (specifications.trim() !== '' && !stringPattern.test(specifications)) {
    alert('Invalid Specifications. Only letters and spaces are allowed.');
    return false;
  }
  if (checklistQuantity.trim() !== '' && !integerPattern.test(checklistQuantity)) {
    alert('Invalid Checklist Quantity. Please enter a valid integer value.');
    return false;
  }

  // If all fields are valid, allow the form submission
  return true;
}
