<?php

namespace App\Http\Controllers;

use App\Events\VerificationMailEvent;
use App\Mail\VerificationMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Nette\Schema\ValidationException;

class UserController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            "name" => "required",
            "email" => "required|email|unique:users",
            "password" => "required"
        ]);

        if(!$validator->fails()) {
            $data = $request->only(['name', 'email', 'password']);
            $data['password'] = Hash::make($request['password']);
            $user = User::create($data);
            $token = $user->createToken($user->email . '_Token')->plainTextToken;

            event(new VerificationMailEvent($user->name, $user->email,base64_encode($user->id)));
            return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' => $token,
                'message' => 'Registered successfully'
            ]);
        } else {
            return response()->json([
                'validation_errors' => $validator->messages()
            ]);
        }
    }

    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if(!$validator->fails()) {
            $user = User::where('email', $request['email'])->first();

            if(!$user || !Hash::check($request->password, $user->password)) {

                return response()->json([
                    'status' => 401,
                    'message' => 'Incorrect email or password!'
                ]);
//                throw ValidationException::withMessages([
//                    'email' => 'Incorrect email or password'
//                ]);
            } else {
                $token = $user->createToken($user->email . '_Token')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'user' => $user,
                    'token' => $token,
                    'message' => 'Welcome'
                ]);
            }
        } else {
            return response()->json([
                'validation_errors' => $validator->messages()
            ]);

        }
    }

    public function verify($user_id) {
        $id = base64_decode($user_id);
        $user = User::find($id);
        $user->update([
            "email_verified_at" => now(),
            "is_verified" => 1
        ]);
        return redirect("http://localhost:3000?verified=1");
    }

    public function reset_password(Request $request) {
        $validator = Validator::make($request->all(), [
            'old_password' => 'required',
            'new_password' => 'required',
            'user_id' => 'required'
        ]);

        if(!$validator->fails()) {
            $old_password = $request['old_password'];
            $new_password = $request['new_password'];
            $user_id = $request['user_id'];
            $user = User::where('id', $user_id)->first();
            if(!$user && !Hash::check($user->password, $old_password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'User not founded!'
                ]);
            } else {
                $user->update([
                    "password" => Hash::make($new_password)
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'Password successfully updated!'
                ]);
            }
        } else {
            return response()->json([
                'validation_errors' => $validator->messages()
            ]);
        }
    }

    public function logout() {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged out success'
        ]);
    }
}
