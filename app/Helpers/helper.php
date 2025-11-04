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


?>
