<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SessionUser;
use App\User;
use Illuminate\Support\Str;
use Auth;

class AuthController extends Controller
{

     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' =>'required',
            'password' =>'required|min:6|max:100',
        ]);
        //Xác thực user có tk chưa
        $credentials = $request->only('email','password');

        if (Auth::attempt($credentials) || session()->has('user') ){ 
            
            $checkTokenExit = SessionUser::where('user_id', auth()->id())->first();

            if(empty($checkTokenExit)){
                 // Authentication passed...
                $userSession=SessionUser::create([
                'token'=>Str::random(40),
                'refresh_token'=>Str::random(40),
                'token_expried'=>date('Y-m-d H:i:s', strtotime('+30 day')),
                'refresh_token_expried'=>date('Y-m-d H:i:s', strtotime('+360 day')),
                'user_id'=>auth()->id(),
            ]);
            }else{
                $userSession = $checkTokenExit;
            }

            $request->session()->put('user', Auth::user());
            return Auth::user(); 
        } else {
            return response()->json(['error' => 'Login failed'], 401);
        }
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */


    public function register(Request $request)
    {   
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'password' => 'required|min:6|max:100',
        ]);
        $user = User::create([
            'name'=> $request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password),
        ]);
        $user->save();
        return response()->json(['code'=> 201 , 'data'=>$user],201);
    }
     /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        Auth::logout();
        //forget,flush
        session()->pull('user');
        return response()->json(['data' => 'Logout success!']);
    }
}
