<?php
namespace App\Http\Middleware;
use Closure;
use Modules\Core\Models\User;

class Api_access
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(!empty($request->header('AccessToken'))){
            $checkAccess  = User::where('access_token',$request->header('AccessToken'))->first();
            if($checkAccess){
                return $next($request);
            }
            else return 'Access_token in wrong';
        }
        else {
            return 'Access_token in header is required';
        }
    }
}
