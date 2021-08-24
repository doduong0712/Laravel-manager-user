<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\gruops;

class UserController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {    }

    public function index()
    {
        $users = User::all();
        $arr = [];
         foreach($users as $user){
             array_push($arr,$user);
             foreach($user->gruops as $value){
                //array_push($arr,$value);
            }
         }
         return $arr;
    }

    function getUser($id) {
        $users= User::find($id);
        foreach($users->gruops as $value){
         //   
        }
        return $users;
    }
    
    public function updateUser(Request $request, $id){
         $request->validate([
            'name' =>'required|min:3|max:100',
        ]);
        $data = User::find($id);
        $data->name=$request->name;
        $data->email=$request->email;
        $data->save();
        $user = User::find($id);
        $group = $request->group;
        $user->gruops()->attach($group);
        return response()->json(['data' => 'User update!']);
    }

    /* function updateGroup(Request $request,$id){
        $user = User::find($id);
        $group = $request->group;
        $user->gruops()->attach($group);
        return response()->json(['data' => 'Group update!']);
    } */

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['data' => 'User deleted!']);
    }

    

}
