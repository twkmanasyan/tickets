<?php

namespace App\Listeners;

use App\Events\VerificationMailEvent;
use App\Mail\VerificationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class VerificationMailEventListener
{

    public function handle(VerificationMailEvent $event)
    {
        Mail::to($event->email)->send(new VerificationMail($event->name, $event->user_id));
    }
}
