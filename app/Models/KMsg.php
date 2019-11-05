<?php
/**
 * Created by PhpStorm.
 * User: khoinx
 * Date: 4/11/18
 * Time: 7:08 PM
 */

namespace App\Models;


class KMsg
{
    const RESULT_SUCCESS = 1;
    const RESULT_ERROR = 0;
    const RESULT_TOKEN_EXPITE = 99;

    public $result = 0;// 1 => success; 0 => Error
    public $current_time = 0;
    public $message = '';
    public $message1 = '';
    public $data = [];

    /**
     * Get message errors
     * @param $errors
     * @return string
     */
    public function getMessageErros($errors){
        $result = array();
        if(!empty($errors)){
            foreach ($errors->getMessages() as $key=>$value){
                $result[] = $value[0];
            }
        }
        return implode(';',$result);
    }
}
