import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { MdPrint } from 'react-icons/md';

export default function InvoicePublicView(props) {
    const { invoice = {}, businessDetails = {} } = props;
    const [isPrinting, setIsPrinting] = useState(false);

    const handlePrint = () => {
        setIsPrinting(true);
        window.print();
        setTimeout(() => setIsPrinting(false), 1000);
    };


    return (
        <>
            <Head title={`Invoice ${invoice.formatted_invoice_number}`} />

            <div className="min-h-screen bg-white p-4 print:p-0">
                {/* Print Button - Hidden during print */}
                <div className="print:hidden mb-6 text-center">
                    <button
                        onClick={handlePrint}
                        disabled={isPrinting}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
                    >
                        <MdPrint className="w-5 h-5" />
                        <span>
                            {isPrinting ? "Printing..." : "Print Invoice"}
                        </span>
                    </button>
                </div>

                <div className="max-w-4xl mx-auto bg-white border-2 border-black print:shadow-none">
                    {/* Header */}
                    <div className="border-b-2 border-black">
                        <div className="text-center py-2 border-b border-black">
                            <div className="text-xs">
                                || SHREE GANESHAY NAMAH ||
                            </div>
                            <div className="text-lg font-bold">TAX INVOICE</div>
                            {/* <div className="text-right text-xs absolute top-2 right-4">
                                <div>Original - For Buyer</div>
                                <div>Duplicate - For Assessee</div>
                            </div> */}
                        </div>
                        <div className="text-center py-3 border-b border-black">
                            <h1 className="text-2xl font-bold">
                                {businessDetails.name || "TexPortApp"}
                            </h1>
                            <p className="text-sm">
                                {businessDetails.address ||
                                    businessDetails.link}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 border-b border-black text-xs">
                            <div className="p-2">
                                <div>
                                    <strong>GSTIN:</strong>{" "}
                                    {businessDetails.gst || "-"}
                                </div>
                                <div>
                                    <strong>PAN:</strong>{" "}
                                    {businessDetails.pan || "-"}
                                </div>
                            </div>
                            <div className="p-2 text-center">
                                <div>
                                    <strong>(M):</strong>{" "}
                                    {businessDetails.phone || "-"}
                                </div>
                            </div>
                            {/* <div className="p-2">
                                <div><strong>MSME-UDYAM:</strong> {businessDetails.msme || 'N/A'}</div>
                                <div><strong>MSME Classification:</strong> MICRO</div>
                            </div> */}
                        </div>
                    </div>

                    {/* Party Details */}
                    <div className="grid grid-cols-3 border-b border-black text-xs">
                        <div className="p-3 border-r border-black">
                            <div className="font-bold mb-2">
                                DETAILS OF RECEIVER - BILLED TO
                            </div>
                            <div className="font-bold">
                                {invoice.party?.party_name}
                            </div>
                            <div className="mt-2">{invoice.party?.address}</div>
                            <div className="mt-2">
                                {/* <div><strong>State:</strong> GUJARAT <strong>Code:</strong> 24</div> */}
                                <div>
                                    <strong>GSTIN:</strong>{" "}
                                    {invoice.party?.gst_number || "N/A"}
                                </div>
                            </div>
                        </div>
                        <div className="p-3 border-r border-black">
                            <div className="font-bold mb-2">
                                DETAILS OF CONSIGNEE - SHIPPED TO
                            </div>
                            <div className="font-bold">
                                {invoice.party?.party_name}
                            </div>
                            <div className="mt-2">{invoice.party?.address}</div>
                            <div className="mt-2">
                                {/* <div><strong>State:</strong> GUJARAT <strong>Code:</strong> 24</div> */}
                                <div>
                                    <strong>GSTIN:</strong>{" "}
                                    {invoice.party?.gst_number || "N/A"}
                                </div>
                            </div>
                        </div>
                        <div className="p-3">
                            <div>
                                <strong>Invoice No.</strong>{" "}
                                {invoice.invoice_number}
                            </div>
                            <div>
                                <strong>Date:</strong>{" "}
                                {new Date(invoice.date).toLocaleDateString(
                                    "en-GB"
                                )}
                            </div>
                            <div>
                                <strong>Challan No.</strong>{" "}
                                {invoice.challan?.challan_number}
                            </div>
                            <div>
                                <strong>Date:</strong>{" "}
                                {new Date(invoice.date).toLocaleDateString(
                                    "en-GB"
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Transport Details */}
                    {/* <div className="grid grid-cols-3 border-b border-black text-xs p-2">
                        <div><strong>Transporter:</strong></div>
                        <div><strong>Vehicle No.</strong></div>
                        <div><strong>Broker:</strong> {invoice.party?.broker || 'N/A'}</div>
                    </div> */}

                    {/* Items Table */}
                    <table className="w-full border-collapse text-xs">
                        <thead>
                            <tr className="border-b border-black">
                                <th className="border-r border-black p-2 text-left w-8">
                                    Sr.
                                </th>
                                <th className="border-r border-black p-2 text-left">
                                    Description
                                </th>
                                {/* <th className="border-r border-black p-2 text-center w-20">HSN Code</th> */}
                                <th className="border-r border-black p-2 text-center w-20">
                                    Total Taka
                                </th>
                                <th className="border-r border-black p-2 text-center w-20">
                                    Meters
                                </th>
                                <th className="border-r border-black p-2 text-center w-24">
                                    Basic Rate
                                </th>
                                <th className="p-2 text-right w-28">
                                    Total Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                className="border-b border-black"
                                style={{ height: "200px" }}
                            >
                                <td className="border-r border-black p-2 align-top">
                                    1
                                </td>
                                <td className="border-r border-black p-2 align-top">
                                    <div>{invoice.quality?.quality_name}</div>
                                    <div className="mt-20 text-center">
                                        <div className="border border-black p-1 mb-1">
                                            PAYMENT WITHIN 45 DAYS
                                        </div>
                                        <div className="p-1">
                                            NO DYEING GUARANTEE
                                        </div>
                                    </div>
                                </td>
                                {/* <td className="border-r border-black p-2 text-center align-top">5407</td> */}
                                <td className="border-r border-black p-2 text-center align-top">
                                    {Math.ceil(invoice.challan.total_lots * 12) || 0}
                                </td>
                                <td className="border-r border-black p-2 text-center align-top">
                                    {parseFloat(invoice.total_meter).toFixed(2)}
                                </td>
                                <td className="border-r border-black p-2 text-center align-top">
                                    {parseFloat(invoice.price).toFixed(2)}
                                </td>
                                <td className="p-2 text-right align-top">
                                    {parseFloat(invoice.base_amount).toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Bank Details and Totals */}
                    <div className="grid grid-cols-1 border-b border-black">
                        {/* <div className="border-r border-black">
                            <div className="text-center font-bold text-xs p-2 border-b border-black">
                                -: BANK DETAILS :-
                            </div>
                            <div className="p-3 text-xs">
                                <div>
                                    <strong>Bank:</strong>{" "}
                                    {businessDetails.bank_name ||
                                        "KALUPUR COMMERCIAL CO-OP"}
                                </div>
                                <div>
                                    <strong>A/c No.</strong>{" "}
                                    {businessDetails.account_number ||
                                        "03737600136"}
                                </div>
                                <div>
                                    <strong>IFSC:</strong>{" "}
                                    {businessDetails.ifsc || "KCCB0UDN037"}
                                </div>
                                <div>
                                    <strong>Branch:</strong>{" "}
                                    {businessDetails.branch ||
                                        "UDHNA MAGDALLA ROAD"}
                                </div>
                            </div>
                        </div> */}
                        <div>
                            <table className="w-full text-xs">
                                <tbody>
                                    <tr className="border-b border-black">
                                        <td className="p-2 text-right">
                                            Total Amount Before Tax
                                        </td>
                                        <td className="p-2 text-right border-l border-black">
                                            {parseFloat(
                                                invoice.base_amount
                                            ).toFixed(2)}
                                        </td>
                                    </tr>
                                    {invoice.cgst_percentage > 0 && (
                                        <tr className="border-b border-black">
                                            <td className="p-2 text-right">
                                                Add: CGST {invoice.cgst_percentage}
                                                .00 %
                                            </td>
                                            <td className="p-2 text-right border-l border-black">
                                                {parseFloat(
                                                    invoice.cgst_amount
                                                ).toFixed(2)}
                                            </td>
                                        </tr>
                                    )}
                                    {invoice.sgst_percentage > 0 && (
                                        <tr className="border-b border-black">
                                            <td className="p-2 text-right">
                                                Add: SGST {invoice.sgst_percentage}
                                                .00 %
                                            </td>
                                            <td className="p-2 text-right border-l border-black">
                                                {parseFloat(
                                                    invoice.sgst_amount
                                                ).toFixed(2)}
                                            </td>
                                        </tr>
                                    )}
                                    {invoice.igst_percentage > 0 && (
                                        <tr className="border-b border-black">
                                            <td className="p-2 text-right">
                                                Add: IGST {invoice.igst_percentage}
                                                .00 %
                                            </td>
                                            <td className="p-2 text-right border-l border-black">
                                                {parseFloat(
                                                    invoice.igst_amount
                                                ).toFixed(2)}
                                            </td>
                                        </tr>
                                    )}
                                    <tr className="border-b border-black">
                                        <td className="p-2 text-right">
                                            Sub Total
                                        </td>
                                        <td className="p-2 text-right border-l border-black">
                                            {parseFloat(invoice.subtotal).toFixed(2)}
                                        </td>
                                    </tr>
                                    <tr className="border-b border-black">
                                        <td className="p-2 text-right">
                                            Round Off +
                                        </td>
                                        <td className="p-2 text-right border-l border-black">
                                            {parseFloat(invoice.round_off).toFixed(2)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="grid grid-cols-2 text-xs">
                        <div className="border-r border-black p-3">
                            <div>
                                <strong>Due Date:</strong>{" "}
                                {new Date(
                                    new Date(invoice.date).getTime() +
                                        45 * 24 * 60 * 60 * 1000
                                ).toLocaleDateString("en-GB")}{" "}
                                <strong>Due Days:</strong> 45
                            </div>
                            <div className="mt-2">
                                <strong>NET RATE:</strong>{" "}
                                {parseFloat(invoice.price).toFixed(2)}
                            </div>
                            <div className="mt-2">
                                ₹{" "}
                                {invoice.final_amount
                                    ? new Intl.NumberFormat("en-IN")
                                          .format(invoice.final_amount)
                                          .toUpperCase()
                                          .replace(/,/g, " ") + " ONLY"
                                    : "SEVENTY FOUR THOUSAND ONE HUNDRED TWENTY ONE ONLY"}
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="text-right">
                                <div className="font-bold text-lg">
                                    Total Amount
                                </div>
                                <div className="font-bold text-xl">
                                    {parseFloat(invoice.final_amount).toFixed(
                                        2
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    body {
                        margin: 0;
                    }
                    .print\\:shadow-none {
                        box-shadow: none !important;
                    }
                    .print\\:p-0 {
                        padding: 0 !important;
                    }
                    .print\\:hidden {
                        display: none !important;
                    }
                }
                @media (max-width: 768px) {
                    .max-w-4xl {
                        max-width: 100%;
                    }
                    .text-3xl {
                        font-size: 1.5rem;
                    }
                    .text-xl {
                        font-size: 1.125rem;
                    }
                    .flex {
                        flex-direction: column;
                    }
                    .justify-between {
                        justify-content: flex-start;
                    }
                    .text-right {
                        text-align: left;
                        margin-top: 1rem;
                    }
                    .w-1\/2 {
                        width: 100%;
                    }
                }
            `}</style>
        </>
    );
}
