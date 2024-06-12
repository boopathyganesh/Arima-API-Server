const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [
    {
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  invoiceDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
