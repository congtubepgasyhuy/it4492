<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Modules\Core\Lib\PermissionHelper;
use Nwidart\Modules\Facades\Module;

class VerifyRoleRequests
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null) {
        $actions = request()->route()->getAction();
        $controller = explode("@",$actions['controller']);
        $controller = $controller[0];
        //dd($guard, $controller);
        if (Auth::user()->hasPermission($controller, $guard)) {
            //dd(1);
            return $next($request);
        } else {
            return redirect('/admin')->withErrors(['Bạn không có quyền thực hiện chức năng này']);
        }
    }
}
