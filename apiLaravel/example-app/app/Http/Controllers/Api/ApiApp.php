<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Support\Facades\Hash;

use App\Models\User as UserDb;
use App\Models\Image;
use App\Models\Interest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ApiApp extends BaseController
{

    public function registerInterests(Request $request) {
        try 
        {
            $res = array();
            $userID = $request->input('userID');
            $arrayStr = $request->input('arrayStr');

            $array = explode(',', $arrayStr);
            DB::table('interests_users')->where('id_user',$userID)
            ->delete();

            foreach ($array as $value) {
                $obj = [
                    'id_user' => $userID,
                    'id_interest'=>$value
                ];
 

                DB::table('interests_users')->insertGetId($obj);
            }

            $res['code'] = true;
            $res['message'] = 'Inserimento avvenuto con successo!';;
            $res['data'] = null;

            echo json_encode($res);

        } catch (\Exception $e) {
            $res['code'] = false;
            $res['message'] = $e->getMessage();
            $res['data'] = null;

            echo json_encode($res);

        }
    }


    public function searchByInterest(Request $request) {
        try {
            $user_interests = Interest::
                            select(
                                'interests.id'
                            )
                            ->join('interests_users', 'interests_users.id_interest', '=', 'interests.id')
                            ->where('interests_users.id_user', $request->input('userID'))
                            ->get();

            $arrayId = [];
            foreach ($user_interests as $value) {
                array_push($arrayId,$value->id);
                }

            $users_interests = UserDb::select(
                                        'users.id',
                                        'users.email',
                                        'users.name',
                                        'users.nickname',
                                        'users.phone',
                                       
                                    )
                                    ->leftjoin('interests_users', 'interests_users.id_user', '=', 'users.id')
                                    ->where('interests_users.id_user', '!=',  $request->input('userID'))
                                    ->whereIn('interests_users.id_interest', $arrayId)
                                    ->get();

            return $users_interests;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function listInterests(Request $request, $userID) {
        try {
            $interests = Interest::select()
            ->get();


            $myInterests = Interest::select(
                'interests.*',
                'interests_users.id as relation',
                'interests_users.id_user'
               
            )
            ->join('interests_users', 'interests_users.id_interest', '=', 'interests.id')
            ->where('interests_users.id_user',  $userID)
            //->orwhereNull('interests_users.id_user')
            ->get()->toArray();

            

            foreach ($interests as $value) {       
                $value->checked = false;
                if($this->existElement($myInterests, $value->id) == true)
                    $value->checked = true;
            }


            return $interests;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }


    
    private function existElement($array, $id) {
        foreach ($array as $value) {       
            if($value['id'] == $id)
                return true;
        }
        return false;
    }

    public function getProfilo(Request $request, $id_user) {
        try {
            $user = UserDb::findOrFail($id_user);
            return $user;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function login(Request $request) {
        $email = $request->input('email');
        $password = $request->input('password');
        $user = UserDb::where('email',$email)->first();
    ;

        if($user != null){
    

            if (Hash::check($password, $user->password)) {
                $code = true;
                $message = 'Login avvenuto con successo!';
                $data = $user;
                

            }
            else{
                $code = false;
                $message = 'Login non riuscito!';
                $data = null;
        
            }
        }
        else{
            $code = false;
            $message = 'Login non riuscito!';
            $data = null;
        }


      

        $res = array();

        $res['code'] = $code;
        $res['message'] = $message;
        $res['data'] = $data;
        $res['email'] = $email;

        echo json_encode($res);
    }
    
    public function login2(Request $request) {
            $email = $request->input('email');
            $password = $request->input('password');
            $user = UserDb::where('email',$email)->first();
    
            if($user != null){
    
                if(!Hash::check($password, $user->password))
                // if(!$user || Hash::check($password, $user->password))
                {
                    echo "Not Matched";
                }
                else
                {
                    //$user = DB::table('users')->where('email',$email)->first();
                   echo $user->email;
                }
            }
        }



    public function register(Request $request) {
        $name = $request->input('name');
        $nickname = $request->input('nickname');
        $phone = $request->input('phone');
        $email = $request->input('email');
        $foto = $request->input('foto');
        $lingua = $request->input('language');
        $citta = $request->input('citta');
        $provincia = $request->input('provincia');
        $religion = $request->input('religion');
        $gender = $request->input('gender');
        
        $password = Hash::make($request->input('password'));

        $user = [
            'name' => $name,
            'nickname'=>$nickname,
            'phone' => $phone,
            'email' => $email,
            'password' => $password,
            'foto' => $foto,
            'language' =>$lingua,
            'citta' => $citta,
            'provincia' => $provincia,
            'gender' => $gender,
            'religion' => $religion
        ];

        $user = UserDb::create($user);


        $code = false;
        $message = 'Errore.Inserimento non riuscito!';
        $data = null;
        if($user != null){
            $code = true;
            $message = 'Inserimento avvenuto con successo!';
            $data = $user;
        }

        $res = array();

        $res['code'] = $code;
        $res['message'] = $message;
        $res['data'] = $data;

        echo json_encode($res);
    }


    public function update(Request $request) {
        try{
                $res = array();
                $id = $request->input('id');
                
                $name = $request->input('name');
                $nickname = $request->input('nickname');
                $phone = $request->input('phone');
                $email = $request->input('email');


                $user = [
                    'name' => $name,
                    'nickname'=>$nickname,
                    'phone' => $phone,
                    'email' => $email
                ];

                UserDb::find($id)->update($user);

                $res['code'] = true;
                $res['message'] = 'Modifica avvenuta con successo!';
                $res['data'] = null;
            
                echo json_encode($res);
        } catch (\Exception $e) {
            $res['code'] = false;
            $res['message'] = $e->getMessage();
            $res['data'] = null;
        
            echo json_encode($res);        
        }
    }
}
