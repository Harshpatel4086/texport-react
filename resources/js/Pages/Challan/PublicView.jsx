import React from "react";
import { Head } from "@inertiajs/react";

export default function ChallanPublicView({ challan, businessDetails }) {
    // Group items by group_number and create a flat array for table display
    const allItems =
        challan.items?.sort((a, b) => a.sr_number - b.sr_number) || [];

    // Calculate dynamic columns based on data
    const itemsPerColumn = 12;
    const totalColumns = Math.ceil(allItems.length / itemsPerColumn) || 4;
    const maxColumns = Math.max(4, totalColumns); // Ensure at least 4 columns
    const gridCols = maxColumns * 2; // Each column has Sr# and Meter

    // Calculate group totals
    const groupTotals = {};
    challan.items?.forEach((item) => {
        if (!groupTotals[item.group_number]) {
            groupTotals[item.group_number] = 0;
        }
        groupTotals[item.group_number] += parseFloat(item.meter);
    });

    return (
        <>
            <Head title={`Challan ${challan.formatted_challan_number}`} />

            <div className="min-h-screen bg-gray-100 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Main Challan Table */}
                    <div className="bg-white border-2 border-black">
                        {/* Header */}
                        <div className="grid grid-cols-2 border-b-2 border-black">
                            <div className="p-3 text-center border-r-2 border-black">
                                <h1 className="text-lg font-bold uppercase tracking-wide">
                                    {businessDetails?.name || "TexPortApp"}
                                </h1>
                                <div className="text-xs mt-2 leading-tight">
                                    {businessDetails?.address ||
                                        "Address not available"}
                                </div>
                                <div className="text-xs mt-2 grid grid-cols-2 gap-2">
                                    <div className="text-left">
                                        {businessDetails?.phone &&
                                            `(M) : ${businessDetails.phone}`}
                                    </div>
                                    <div className="text-right">
                                        {businessDetails?.gst && (
                                            <div>
                                                <strong>GSTIN : </strong>{" "}
                                                <strong>
                                                    {businessDetails.gst}
                                                </strong>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="grid grid-cols-2 gap-1 text-xs">
                                    <div>Challan No :</div>
                                    <div>
                                        <strong>
                                            {challan.formatted_challan_number}
                                        </strong>
                                    </div>
                                    <div>Date :</div>
                                    <div>
                                        <strong>
                                            {new Date(
                                                challan.date
                                            ).toLocaleDateString("en-GB")}
                                        </strong>
                                    </div>
                                    {/* <div>Quality :</div>
                                    <div><strong>RENIYAL</strong></div>
                                    <div>Broker :</div>
                                    <div><strong>DIRECT</strong></div> */}
                                </div>
                            </div>
                        </div>

                        {/* Buyer and Delivery Info */}
                        <div className="grid grid-cols-2 border-b-2 border-black">
                            <div className="p-3 border-r-2 border-black">
                                <div className="text-xs">
                                    <div>
                                        Buyer :{" "}
                                        <strong>
                                            {challan.party?.party_name}
                                        </strong>
                                    </div>
                                    <div className="mt-1 leading-tight">
                                        {challan.party?.address}
                                    </div>
                                    {challan.party?.gst_number && (
                                        <div className="mt-2">
                                            GSTIN :{" "}
                                            <strong>
                                                {challan.party.gst_number}
                                            </strong>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="text-xs">
                                    <div>
                                        Delivery :{" "}
                                        <strong>
                                            {challan.party?.party_name}
                                        </strong>
                                    </div>
                                    <div className="mt-1 leading-tight">
                                        {challan.party?.address}
                                    </div>
                                    {challan.party?.gst_number && (
                                        <div className="mt-2">
                                            GSTIN :{" "}
                                            <strong>
                                                {challan.party.gst_number}
                                            </strong>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Table Header */}
                        <div className={`grid grid-cols-${gridCols} border-b border-black bg-gray-100`} style={{gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`}}>
                            {Array.from({ length: maxColumns }, (_, colIndex) => (
                                <React.Fragment key={colIndex}>
                                    <div className="p-1 text-center border-r border-black text-xs font-bold">
                                        Sr #
                                    </div>
                                    <div className={`p-1 text-center ${colIndex < maxColumns - 1 ? 'border-r' : ''} border-black text-xs font-bold`}>
                                        Meter
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Table Data Rows - 12 rows exactly */}
                        {Array.from({ length: 12 }, (_, rowIndex) => (
                            <div
                                key={rowIndex}
                                className={`grid grid-cols-${gridCols} border-b border-black`}
                                style={{gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`}}
                            >
                                {Array.from({ length: maxColumns }, (_, colIndex) => {
                                    // Calculate item index for vertical filling (column by column)
                                    const itemIndex = colIndex * 12 + rowIndex;
                                    const item = allItems[itemIndex];
                                    return (
                                        <React.Fragment key={colIndex}>
                                            <div className="p-1 text-center border-r border-black text-xs">
                                                {item ? item.sr_number : ""}
                                            </div>
                                            <div className={`p-1 text-center ${colIndex < maxColumns - 1 ? 'border-r' : ''} border-black text-xs`}>
                                                {item
                                                    ? parseFloat(
                                                          item.meter
                                                      ).toFixed(2)
                                                    : ""}
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        ))}

                        {/* Totals Row - dynamic columns for group totals */}
                        <div className={`grid grid-cols-${maxColumns} border-b-2 border-black bg-gray-50`} style={{gridTemplateColumns: `repeat(${maxColumns}, minmax(0, 1fr))`}}>
                            {Array.from({ length: maxColumns }, (_, colIndex) => {
                                const groupTotalValues = Object.values(groupTotals);
                                const total = groupTotalValues[colIndex] || 0;
                                return (
                                    <div
                                        key={colIndex}
                                        className={`p-2 text-center ${colIndex < maxColumns - 1 ? 'border-r' : ''} border-black text-sm font-bold`}
                                    >
                                        {total > 0 ? total.toFixed(2) : ""}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-b border-black">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-xs">
                                    <div>
                                        Total Taka :{" "}
                                        <strong>{challan.items.length}</strong>
                                    </div>
                                    {/* <div>Total Taka : <strong>{challan.total_lots}</strong></div> */}
                                    <div>
                                        Total Meters :{" "}
                                        <strong>
                                            {parseFloat(
                                                challan.total_meter
                                            ).toFixed(2)}
                                        </strong>
                                    </div>
                                </div>
                                <div className="text-right text-xs">
                                    <div className="font-bold">
                                        FOR{" "}
                                        {(
                                            businessDetails?.name ||
                                            "TexPortApp"
                                        ).toUpperCase()}
                                    </div>
                                    <div className="mt-12">
                                        <div className="border-t border-black pt-1">
                                            Signature of the goods receiver
                                        </div>
                                        <div className="text-xs">
                                            Proprietor/Authorized
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-2 text-xs font-bold">
                            NO DYEING GUARANTEE
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
