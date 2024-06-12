let customerCounter = 1;

function generateCustomerId() {
    const customerId = `CUS${String(customerCounter).padStart(3, '0')}`;
    customerCounter++;
    return customerId;
}

module.exports = generateCustomerId;