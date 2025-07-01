import { NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import nodemailer from "nodemailer";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { DateFormat } from "@/utils/dateFormat";

// your numberToWords function...
function numberToWords(num) {
  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
    "Sixteen", "Seventeen", "Eighteen", "Nineteen"
  ];

  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  const convertTwoDigits = (n) => {
    if (n < 20) return ones[n];
    const t = Math.floor(n / 10);
    const o = n % 10;
    return tens[t] + (o ? "-" + ones[o] : "");
  };

  const convertThreeDigits = (n) => {
    const h = Math.floor(n / 100);
    const rem = n % 100;
    if (h === 0) return convertTwoDigits(rem);
    return ones[h] + " Hundred" + (rem ? " and " + convertTwoDigits(rem) : "");
  };

  if (num === 0) return "Zero";

  if (num < 1000) return convertThreeDigits(num);

  if (num < 100000) {
    const th = Math.floor(num / 1000);
    const rem = num % 1000;
    const thousandPart = convertThreeDigits(th) + " Thousand";
    return thousandPart + (rem ? " " + convertThreeDigits(rem) : "");
  }

  return "Number too large";
}

// Create React PDF component
const InvoiceDocument = ({ jsonParse }) => (
  <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.centerText}>
          <Text style={[styles.heading, styles.bold]}>DRUGCARTS</Text>
          <Text>Portion A First Floor, No.50, Pedariyar Koil Street, Seven Wells, Chennai-600001</Text>
          <Text>Email: drugcartspro@gmail.com, Website: www.drugcarts.com</Text>
        </View>

        {/* Invoice Info */}
        <View style={styles.row}>
          <View style={[styles.half]}>
            <Text style={styles.bold}>Invoice #: {jsonParse.orderId}</Text>
          </View>
          <View style={{ width: "50%", textAlign: "center" }}>
            <Text style={[styles.subHeading, styles.bold]}>INVOICE</Text>
          </View>
          <View style={[styles.half, { textAlign: "right" }]}>
            <Text style={styles.bold}>Date: {DateFormat(jsonParse.createdAt)}</Text>
            <Text style={styles.bold}>Buyer's Order No: {jsonParse.orderId}</Text>
          </View>
        </View>

        {/* Shipping/Payment Info */}
        <View style={[styles.row, styles.section]}>
          <View style={[styles.half]}>
            <Text style={styles.bold}>Courier: Air</Text>
          </View>
          <View style={[styles.half, { textAlign: "center" }]}>
            <Text style={styles.bold}>Payment Terms: Bank Transfer</Text>
          </View>
          <View style={[styles.half, { textAlign: "right" }]}>
            <Text style={styles.bold}>Delivery: By Air EMS</Text>
          </View>
        </View>

        {/* Bill To / Ship To */}
        <View style={[styles.row, styles.section]}>
          <View style={styles.half}>
            <Text style={styles.bold}>Bill To / Buyer:</Text>
            <Text>{jsonParse.shippingInfo.cus_name} {jsonParse.shippingInfo.lastname}</Text>
            <Text>{jsonParse.shippingInfo.address}</Text>
            <Text>{jsonParse.shippingInfo.town}</Text>
            <Text>{jsonParse.shippingInfo.state}, {jsonParse.shippingInfo.country} - {jsonParse.shippingInfo.postcode}</Text>
            <Text>Mobile: {jsonParse.shippingInfo.phone}</Text>
          </View>
          <View style={styles.half}>
            <Text style={styles.bold}>Ship To / Delivery At:</Text>
            <Text>{jsonParse.shippingInfo.cus_name} {jsonParse.shippingInfo.lastname}</Text>
            <Text>{jsonParse.shippingInfo.address}</Text>
            <Text>{jsonParse.shippingInfo.town}</Text>
            <Text>{jsonParse.shippingInfo.state}, {jsonParse.shippingInfo.country} - {jsonParse.shippingInfo.postcode}</Text>
            <Text>Mobile: {jsonParse.shippingInfo.phone}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { width: "10%" }]}>S.No</Text>
            <Text style={[styles.tableCellHeader, { width: "30%" }]}>Product</Text>
            <Text style={[styles.tableCellHeader, { width: "15%" }]}>Packing</Text>
            <Text style={[styles.tableCellHeader, { width: "15%" }]}>Quantity</Text>
            <Text style={[styles.tableCellHeader, { width: "15%" }]}>Unit</Text>
            <Text style={[styles.tableCellHeader, { width: "15%" }]}>Amount</Text>
          </View>

          {/* Table Rows */}
          {jsonParse.orderItems.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <Text style={[styles.tableCell, { width: "10%" }]}>{index + 1}</Text>
              <Text style={[styles.tableCell, { width: "30%" }]}>{item.product_name}</Text>
              <Text style={[styles.tableCell, { width: "15%" }]}>{item.packageName}</Text>
              <Text style={[styles.tableCell, { width: "15%" }]}>{item.quantity}</Text>
              <Text style={[styles.tableCell, { width: "15%" }]}>{item.price}</Text>
              <Text style={[styles.tableCell, { width: "15%" }]}>Rs.{item.price}</Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.section}>
          <Text>Amount In Words: {numberToWords(jsonParse.itemsPrice)} Rupees Only</Text>
          <Text>Shipping Charges: Rs. 0</Text>
          <Text style={styles.bold}>TOTAL: Rs. {jsonParse.itemsPrice}</Text>
        </View>

        {/* Declaration */}
        <View style={styles.section}>
          <Text style={styles.bold}>Declaration:</Text>
          <Text>Hereby we declare that all the informations given in this is correct and true to our knowledge.</Text>
        </View>

        {/* Bank Details */}
        <View style={styles.section}>
          <Text style={[styles.centerText, styles.bold]}>Bank Details</Text>
          <Text>Beneficiary: Drugcarts</Text>
          <Text>Beneficiary Address: {jsonParse.shippingInfo.address}, {jsonParse.shippingInfo.town}, {jsonParse.shippingInfo.state}, {jsonParse.shippingInfo.country} - {jsonParse.shippingInfo.postcode}</Text>
          <Text>Bank Name: Kotak Mahindra Bank</Text>
          <Text>Swift Code: KKBKINBBCPC</Text>
          <Text>IBAN: 401011023808</Text>
          <Text>Details: Purchasing goods for Invoice #{jsonParse.orderId}</Text>
          <Text>Invoice Amount: {jsonParse.itemsPrice} INR</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.centerText}>Thank you for ordering at the Drugcarts online store.</Text>
          <Text style={styles.centerText}>If you have any questions, contact us: +91 99206 11567</Text>
        </View>

      </Page>
    </Document>
);
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  container: {
    width: "100%",
  },
  centerText: {
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  heading: {
    fontSize: 24,
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 18,
    marginVertical: 10,
  },
  section: {
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  half: {
    width: "50%",
    padding: 5,
  },
  table: {
    display: "table",
    width: "auto",
    marginTop: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#e4e4e4",
  },
  tableCell: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  smallText: {
    fontSize: 8,
  },
});

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Only POST requests allowed" }, { status: 405 });
  }

  const { to, subject, message } = await req.json();
  const jsonParse = JSON.parse(message);

  const htmlContent = `<!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice - Million Health Pharmaceuticals</title>
  <style>
  .container {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  }
  table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  }
  table, th, td {
  border: 1px solid #000;
  }
  th, td {
  padding: 8px;
  text-align: left;
  }
  .no-border td {
  border: none;
  }
  .center {
  text-align: center;
  }
  .bold {
  font-weight: bold;
  }
  </style>
  </head>
    <body>
      <div class="container">
  <table class="border">
    <tr>
      <td colspan="8" style="text-align: center;">
        <strong><h1>DRUGCARTS</h1></strong>
              <p>Portion A First Floor, No.50, Pedariyar Koil Street, Seven Wells, Chennai-600001</p>
              <p>Email: drugcartspro@gmail.com, Website: www.drugcarts.com</p>
      </td>
    </tr>
    <tr style="text-align:center;">
      <td colspan="2">
          <strong>Invoice #:${jsonParse.orderId}</strong>
      </td>
      <td colspan="4" style="text-align:center;font-size:24px;">
          <strong>Invoice</strong>
      </td>
      <td colspan="2">
          <strong>Date: ${DateFormat(jsonParse.createdAt)}</strong><br/>
          <strong>Buyers Order No: ${jsonParse.orderId}</strong>
      </td>
    </tr>
    <tr style="text-align:center;">
      <td colspan="2"><strong>Courier:Air </strong></td>
      <td colspan="4"><strong>Payment Terms: Bank Transfer  </strong></td>
      <td colspan="2"><strong>Delivery : By Air EMS</strong></td>
    </tr>
    <tr>
      <td colspan="4">
      <strong>Bill To/Name of the Buyer:</strong>
      <p style="text-transform: capitalize">${jsonParse.shippingInfo.cus_name} ${jsonParse.shippingInfo.lastname},</p>
      <p>${jsonParse.shippingInfo.address},</p>
      <p>${jsonParse.shippingInfo.town}</p>
      <p>${jsonParse.shippingInfo.state}, ${jsonParse.shippingInfo.country} - ${jsonParse.shippingInfo.postcode}</p>
      <strong>Mobile: ${jsonParse.shippingInfo.phone}</strong>
      </td>
      <td colspan="4">
      <strong>Ship To/Delivery At:</strong>
      <p style="text-transform: capitalize">${jsonParse.shippingInfo.cus_name} ${jsonParse.shippingInfo.lastname},</p>
      <p>${jsonParse.shippingInfo.address},</p>
      <p>${jsonParse.shippingInfo.town}</p>
      <p>${jsonParse.shippingInfo.state}, ${jsonParse.shippingInfo.country} - ${jsonParse.shippingInfo.postcode}</p>
      <strong>Mobile: ${jsonParse.shippingInfo.phone}</strong>
      </td>
    </tr>
    </table>
    <table>
      <tr>
        <th style="width:10%;">S.NO</th>
        <th colspan="2">Product</th>
        <th>Packing</th>
        <th>Quantity</th>
        <th>Unit</th>
        <th>Amount</th>
      </tr>
      ${jsonParse?.orderItems
        .map((order, i) => `
          <tr>
            <td>${i + 1}</td>
            <td colspan="2">${order?.product_name}</td>
            <td>${order?.packageName}</td>
            <td>${order?.quantity}</td>
            <td>${order?.price}</td>
            <td>Rs.${order?.price}</td>
          </tr>
        `).join('')}
       <tr>
        <td colspan="4">Amount In Words: </td>
        <td colspan="2">Shiping Charges: </td>
        <td><strong>Rs. 0</strong></td>
      </tr>
      <tr>
        <td colspan="4">${numberToWords(jsonParse.itemsPrice)} Rupees Only </td>
        <td colspan="2"><strong>TOTAL :</strong> </td>
        <td><strong>Rs. ${jsonParse.itemsPrice}</strong></td>
      </tr>
      <tr>
        <td colspan="4">D.L.No:2391/M Z1/20B , 2391/M Z1/21B </td>
        <td colspan="3">IEC.No.0415026121. </td>
      </tr>
      <tr>
        <td colspan="4"><strong>Declaration :</strong><br/>
        <p>Hereby we declare that all the informations given
         in this is correct an true to our knowledge</p></td>
        <td colspan="3">
        <strong>for Drugcarts</strong> </br></br></br>
        <strong>PROP/AUTH.SIGN</strong>
        </td>
      </tr>
       <tr>
        <td colspan="7" style="text-align:center;"><strong>Bank Details</strong></td>
       </tr>
       <tr>
        <td colspan="2"><strong>BENEFICIAR </strong></td>
        <td colspan="5"><p>Drugcarts </p></td>
       </tr>
       <tr>
        <td colspan="2"><strong>BENEFICIAR ADDRESS </strong></td>
        <td colspan="5">
        <p>${jsonParse.shippingInfo.cus_name} ${jsonParse.shippingInfo.lastname}, <br/> ${jsonParse.shippingInfo.phone}, <br/> ${jsonParse.shippingInfo.email}, <br/> ${jsonParse.shippingInfo.address}, <br/> ${jsonParse.shippingInfo.town}, <br/> ${jsonParse.shippingInfo.state}, <br/> ${jsonParse.shippingInfo.country}, <br/> ${jsonParse.shippingInfo.postcode}</p></td>
       </tr>
       <tr>
        <td colspan="2"><strong>BENEFICIAR BANK ADDRESS </strong></td>
        <td colspan="5"><p>KOTAK MAHINDRA BANK </p></td>
       </tr>
       <tr>
        <td colspan="2"><strong>SWIFT CODE  </strong></td>
        <td colspan="5"><p>KKBKINBBCPC </p></td>
       </tr>
       <tr>
        <td colspan="2"><strong>IBAN  </strong></td>
        <td colspan="5"><p>401011023808 </p></td>
       </tr>
       <tr>
        <td colspan="2"><strong>DETAILS  </strong></td>
        <td colspan="5"><p>Purchasing Goods for the invoice number #${jsonParse.orderId} </p></td>
       </tr>
       <tr>
        <td colspan="2"><strong>INVOICE AMOUNT </strong></td>
        <td colspan="2"><p> ${jsonParse.itemsPrice} </p></td>
        <td colspan="3"><p>CURRENCY : INR </p></td>
       </tr>
       <tr>
        <td colspan="7" style="text-align:center;">
        Thank you for ordering at the Drugcarts online store.<br/>
        If you have any questions, you can email us at the following Phone No : +91 99206 11567
        </td>
       </tr>
    </table>
  </div>
    </body>
  </html>`;

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Render PDF document to stream
    const pdfStream = await renderToStream(<InvoiceDocument jsonParse={jsonParse} />);

    // Read stream into buffer
    const chunks = [];
    for await (let chunk of pdfStream) {
      chunks.push(chunk);
    }
    const pdfBuffer = Buffer.concat(chunks);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
      attachments: [
        {
          filename: `Invoice.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "Email sent successfully!", info });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
