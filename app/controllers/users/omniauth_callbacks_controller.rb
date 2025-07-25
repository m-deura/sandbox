class Users::OmniauthCallbacksController < ApplicationController
  def google_oauth2
      # You need to implement the method below in your model (e.g. app/models/user.rb)
      @user = User.from_omniauth(request.env["omniauth.auth"])

      if @user.persisted?
        flash[:notice] = I18n.t "devise.omniauth_callbacks.success", kind: "Google"
        sign_in_and_redirect @user, event: :authentication
      else
        # Useful for debugging login failures. Uncomment for development.
        # session['devise.google_data'] = request.env['omniauth.auth'].except('extra') # Removing extra as it can overflow some session stores
        redirect_to new_user_registration_url, alert: @user.errors.full_messages.join("\n")
      end
  end

    # エラー「The action 'failure' could not be found for Users::OmniauthCallbacksController」への対応
    def failure
      redirect_to root_path, alert: "ログインに失敗しました"
    end
end
