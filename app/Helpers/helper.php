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

?>
