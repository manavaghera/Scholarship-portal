<x-layout>
    <div class="auth">
        <div class="container">
            <div class="heading">
                <h2>Verify OTP</h2>
                <h5 style="color: gray">We have sent an OTP to your email address</h5>
            </div>
            <div class="formcont">
                <form method="POST" action="/admin/verify-login-otp">
                    @csrf
                    <div class="part">
                        
                        <input type="text" id="otp" name="otp" required placeholder="OTP">
                    </div>
                    
                    <div class="part">
                        <button type="submit" id="create-campaign-button">Submit</button>
                    </div>
                    <div class="notlogin">
                        <span>Didn't Receive a code<a href="/register" alt=#> Resend</a></span>
                    </div>

                </form>
            </div>
        </div>
    </div>
</x-layout>