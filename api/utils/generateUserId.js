// let customerCounter = 1;

// function generateCustomerId() {
//     const customerId = `CUS${String(customerCounter).padStart(3, '0')}`;
//     customerCounter++;
//     return customerId;
// }

async function generateCustomerId(count) {
    const customerId = `CUS${String(count).padStart(3, '0')}`;
    return customerId;
}

module.exports = generateCustomerId;