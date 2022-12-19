<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerificationMail extends Mailable
{
    use Queueable, SerializesModels;
    public $name = '';
    public $user_id = '';
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($name, $user_id)
    {
        $this->name = $name;
        $this->user_id = $user_id;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.verification');
    }
}
