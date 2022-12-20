<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TicketController extends Controller
{
    public function __construct() {
//        $this->middleware('auth:sanctum');
    }

    public function index() {
        return response()->json([
            'status' => 200,
            'tickets' => Ticket::all()
        ]);
    }

    public function store(Request $request) {
        $ticket = Ticket::create($request->only(['title', 'body', 'user_id']));
        if($ticket) {
            return response()->json([
                'status' => 200,
                'message' => "Ticket {$ticket->name} successfully created"
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'message' => "Ticket {$ticket->name} not created"
            ]);
        }
    }

    public function show($id) {
        $ticket = Ticket::find($id);
        if($ticket) {
            return response()->json([
                'status' => 200,
                'ticket' => $ticket
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'message' => "Ticket not found"
            ]);
        }
    }

    public function edit($id) {
        $ticket = Ticket::find($id);
        if($ticket) {
            return response()->json([
                'status' => 200,
                'ticket' => $ticket
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'message' => "Ticket not found"
            ]);
        }
    }

    public function update(Request $request) {
        $ticket = Ticket::find($request['id']);
        $update = $ticket->update($request->only(['title', 'body']));
        if($update) {
            return response()->json([
                'status' => 200,
                'message' => "Ticket {$ticket->title} successfully update"
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'message' => "Ticket not found"
            ]);
        }
    }

    public function delete($id) {
        $ticket = Ticket::find($id)->delete();
        if($ticket) {
            return response()->json([
                'status' => 200,
                'ticket' => "Ticket {$ticket->title} successfully deleted"
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'message' => "Ticket not found"
            ]);
        }
    }

    public function users_for_share($id) {
        return response()->json([
            'status' => 200,
            'users' => User::where("id", "<>", $id)->get()
        ]);
    }

    public function share(Request $request) {
        $users_ides = $request->ides;
        $from_user_id = $request->user_id;
        $ticket_id = $request->ticket_id;
        for($i = 0; $i < count($users_ides); $i++) {
            DB::table("shared_tickets")->insert([
                "shared_from_id" => $from_user_id,
                "shared_to_id" => $users_ides[$i],
                "ticket_id" => $ticket_id,
                "created_at" => now()
            ]);
        }
    }

    public function my_shared($id) {
        $tickets = DB::table("shared_tickets")
            ->join("users", "shared_tickets.shared_to_id", "=", "users.id")
            ->join("tickets", "shared_tickets.ticket_id", "=", "tickets.id")
            ->where("shared_to_id", "=", $id)
            ->select([
                'users.name AS username',
                'tickets.title AS ticketTitle',
            ])
            ->get()
        ;
        return response()->json([
            'status' => 200,
            'tickets' => $tickets
        ]);
    }

}
