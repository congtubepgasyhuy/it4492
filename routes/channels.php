<?php

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

\Illuminate\Support\Facades\Broadcast::channel('lchat', function ($user) {
    return \Illuminate\Support\Facades\Auth::check();
});
