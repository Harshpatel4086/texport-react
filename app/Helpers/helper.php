<?php
if (!function_exists('createdBy')) {
    function createdBy()
    {
        if(auth()->check()) {
            $user = auth()->user();
            if(!$user->is_staff) {
                return $user->id;
            }else{
                return $user->created_by;
            }
        }
    }
}

if (!function_exists('formatPartyNumber')) {
    function formatPartyNumber($id)
    {
        if($id === null){
            return '--';
        }
        return '#PTY-' . str_pad($id, 6, '0', STR_PAD_LEFT);
    }
}

if (!function_exists('formatDate')) {
    function formatDate($date, $format = 'd/m/Y')
    {
        if (!$date) {
            return '--';
        }
        return date($format, strtotime($date));
    }
}

if (!function_exists('formatMachineNumber')) {
    function formatMachineNumber($number)
    {
        if($number === null){
            return '--';
        }
        return '#MCH-' . str_pad($number, 6, '0', STR_PAD_LEFT);
    }
}

if (!function_exists('formatChallanNumber')) {
    function formatChallanNumber($id)
    {
        if($id === null){
            return '--';
        }
        return '#CHL-' . str_pad($id, 6, '0', STR_PAD_LEFT);
    }
}

if (!function_exists('formatInvoiceNumber')) {
    function formatInvoiceNumber($id)
    {
        if($id === null){
            return '--';
        }
        return '#INV-' . str_pad($id, 6, '0', STR_PAD_LEFT);
    }
}

?>
