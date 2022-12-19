<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class VerificationMailEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $name = '';
    public $email = '';
    public $user_id = '';

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($name, $email, $user_id) {
        $this->name = $name;
        $this->email = $email;
        $this->user_id = $user_id;
    }
}
