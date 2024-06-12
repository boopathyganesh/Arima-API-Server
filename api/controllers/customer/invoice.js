const Invoice = require('../../models/customer/invoice');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.generateInvoice = async (req, res) => {
  try {
    const { customerName, customerEmail, items } = req.body;

    // Calculate total amount
    const totalAmount = items.reduce((total, item) => total + item.quantity * item.price, 0);

    // Create invoice
    const newInvoice = new Invoice({
      customerName,
      customerEmail,
      items,
      totalAmount,
    });

    // Save invoice to database
    const savedInvoice = await newInvoice.save();

    // Generate PDF
    const pdfPath = path.join(__dirname, `../../../src/uploads/invoices/invoice-${savedInvoice._id}.pdf`);
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(25).text('Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice ID: ${savedInvoice._id}`);
    doc.text(`Invoice Date: ${savedInvoice.invoiceDate}`);
    doc.text(`Customer Name: ${savedInvoice.customerName}`);
    doc.text(`Customer Email: ${savedInvoice.customerEmail}`);
    doc.moveDown();
    doc.text('Items:');
    savedInvoice.items.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.description} - Quantity: ${item.quantity}, Price: ${item.price}`);
    });
    doc.moveDown();
    doc.text(`Total Amount: ${savedInvoice.totalAmount}`);
    doc.end();

    res.status(201).json({ message: 'Invoice generated successfully', invoice: savedInvoice, pdfPath });
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ message: 'An error occurred while generating the invoice' });
  }
};

exports.getInvoice = async (req, res) => {
  try {
    const invoiceId = req.query.id;
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({ invoice });
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ message: 'An error occurred while fetching the invoice' });
  }
};
