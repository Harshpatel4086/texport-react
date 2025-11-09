<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Verify Email - {{ config('app.name') }}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: #3b82f6; color: white; padding: 30px; text-align: center; }
        .content { padding: 40px 30px; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset('assets/logo/logo_dark.png') }}" alt="TexPortApp Logo" style="height: 50px; margin-top: 10px;">
        </div>

        <div class="content">
            <h2>Hello, {{ isset($user->name) ? $user->name : 'User' }}</h2>
            {{-- <p>Welcome to TexPortApp — your digital platform for managing textile exports efficiently!</p>
            <p>Please verify your email address to activate your account and start using TexPortApp.</p> --}}

            <p>Welcome to <strong>TexPortApp</strong> — your digital platform for managing textile exports efficiently!</p>
            <p>Please click the button below to verify your email and activate your account:</p>

            <a href="{{ isset($actionUrl) ? $actionUrl : '#' }}" class="button">Verify Email</a>

            <p>If you did not create an account, no further action is required.</p>

            <p>If you're having trouble clicking the "Verify Email Address" button, copy and paste the URL below into your web browser:</p>
            <p style="word-break: break-all; color: #666;"><a href="{{ isset($actionUrl) ? $actionUrl : '#' }}">{{ isset($actionUrl) ? $actionUrl : '#' }}</a></p>
        </div>

        <div class="footer">
            <p>&copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p><br>
            <a href="https://www.textile.texportapp.in">www.textile.texportapp.in</a>
        </div>
    </div>
</body>
</html>
